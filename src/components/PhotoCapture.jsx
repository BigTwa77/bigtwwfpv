import React, { useState, useRef } from 'react'
import {
  Camera,
  X,
  Upload,
  ChevronLeft,
  Loader,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
} from 'lucide-react'
import ocrService from '../services/ocrService'

export default function PhotoCapture({ onCancel, onComplete }) {
  const [photos, setPhotos] = useState([])
  const [processing, setProcessing] = useState(false)
  const [processedReadings, setProcessedReadings] = useState([])
  const fileInputRef = useRef(null)
  const [projectName, setProjectName] = useState('')
  const [siteName, setSiteName] = useState('')
  const [inspectorName, setInspectorName] = useState('Antz')

  const handlePhotoSelect = (event) => {
    const files = Array.from(event.target.files)
    const newPhotos = files.map(file => ({
      id: Math.random(),
      file,
      preview: URL.createObjectURL(file),
      status: 'pending', // pending | processing | done | error
      result: null,
    }))
    setPhotos([...photos, ...newPhotos])
  }

  const handleRemovePhoto = (id) => {
    setPhotos(photos.filter(p => p.id !== id))
  }

  const handleProcessPhotos = async () => {
    if (photos.length === 0) return

    setProcessing(true)
    const results = []

    for (let i = 0; i < photos.length; i++) {
      const photo = photos[i]
      setPhotos(prev =>
        prev.map(p =>
          p.id === photo.id ? { ...p, status: 'processing' } : p
        )
      )

      const result = await ocrService.readTestInstrument(photo.file)
      results.push(result)

      setPhotos(prev =>
        prev.map(p =>
          p.id === photo.id
            ? {
              ...p,
              status: result.success ? 'done' : 'error',
              result: result.data,
            }
            : p
        )
      )

      // Small delay between requests
      await new Promise(resolve => setTimeout(resolve, 1000))
    }

    setProcessedReadings(results)
    setProcessing(false)
  }

  const handleCompleteInspection = () => {
    const report = ocrService.generateReport({
      projectName: projectName || 'Unnamed Project',
      siteName: siteName || 'Tom Price Processing Site',
      inspector: inspectorName,
      date: new Date().toLocaleDateString(),
      readings: photos.map((p, i) => ({
        photoId: i,
        filename: p.file.name,
        ...p.result,
      })),
    })

    onComplete(report)
  }

  const doneCount = photos.filter(p => p.status === 'done').length
  const errorCount = photos.filter(p => p.status === 'error').length

  return (
    <div className="min-h-screen w-full flex items-start justify-center bg-[#0E1011] py-6 px-3">
      <div className="w-full max-w-[420px] bg-[#17191B] text-[#ECE9E3] font-sans rounded-[28px] overflow-hidden border border-[#2E3336] shadow-2xl flex flex-col max-h-[90vh]">
        <div className="h-1.5 w-full bg-[#0E1011]" />

        {/* HEADER */}
        <header className="bg-[#1D2022] border-b border-[#2E3336] px-4 pt-4 pb-3 flex items-center gap-3">
          <button
            onClick={onCancel}
            className="w-8 h-8 flex items-center justify-center bg-[#24282B] border border-[#3A4045]"
          >
            <ChevronLeft size={16} />
          </button>
          <div>
            <p className="text-[13px] font-extrabold uppercase tracking-[0.1em] leading-none">
              New Inspection
            </p>
            <p className="text-[9.5px] text-[#8B939A] mt-1 uppercase tracking-wide">
              Upload & Analyze Photos
            </p>
          </div>
        </header>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
          {/* PROJECT INFO */}
          <div className="space-y-3">
            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B939A] mb-1 block">
                Project Name
              </span>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="e.g., Tank T-204 Recoating"
                className="w-full bg-[#24282B] border border-[#3A4045] px-3 py-2 text-[12px] text-[#ECE9E3] placeholder-[#5C6368] rounded"
              />
            </label>

            <label className="block">
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B939A] mb-1 block">
                Site Name
              </span>
              <input
                type="text"
                value={siteName}
                onChange={(e) => setSiteName(e.target.value)}
                placeholder="e.g., Tom Price Processing Site"
                className="w-full bg-[#24282B] border border-[#3A4045] px-3 py-2 text-[12px] text-[#ECE9E3] placeholder-[#5C6368] rounded"
              />
            </label>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B939A] mb-1 block">
                Inspector
              </span>
              <div className="bg-[#24282B] border border-[#3A4045] px-3 py-2 text-[12px] text-[#ECE9E3]">
                {inspectorName}
              </div>
            </div>
          </div>

          {/* UPLOAD AREA */}
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B939A] mb-2">
              Test Instrument Photos
            </p>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 bg-[#24282B] border-2 border-dashed border-[#3A4045] py-6 hover:border-[#FF6A13] transition-colors"
            >
              <Camera size={20} className="text-[#FF6A13]" />
              <div className="text-left">
                <p className="text-[12px] font-semibold text-[#ECE9E3]">
                  Click to upload
                </p>
                <p className="text-[10px] text-[#8B939A]">
                  or drag and drop
                </p>
              </div>
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoSelect}
              className="hidden"
            />
            <p className="text-[9px] text-[#8B939A] mt-2">
              Support for gauge readings, adhesion testers, salt spray results, etc.
            </p>
          </div>

          {/* PHOTOS LIST */}
          {photos.length > 0 && (
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B939A]">
                {photos.length} Photo{photos.length !== 1 ? 's' : ''} Selected
              </p>
              <div className="space-y-2 max-h-[300px] overflow-y-auto">
                {photos.map(photo => (
                  <div
                    key={photo.id}
                    className="bg-[#24282B] border border-[#3A4045] p-2 flex items-center gap-2"
                  >
                    <img
                      src={photo.preview}
                      alt="preview"
                      className="w-12 h-12 object-cover bg-[#1D2022]"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-semibold truncate">
                        {photo.file.name}
                      </p>
                      <p className="text-[9px] text-[#8B939A]">
                        {(photo.file.size / 1024).toFixed(0)} KB
                      </p>
                      {photo.status === 'processing' && (
                        <p className="text-[9px] text-[#FF6A13] flex items-center gap-1 mt-0.5">
                          <Loader size={10} className="animate-spin" />
                          Processing...
                        </p>
                      )}
                      {photo.status === 'done' && photo.result && (
                        <p className="text-[9px] text-[#3FAE6B] flex items-center gap-1 mt-0.5">
                          <CheckCircle2 size={10} />
                          {photo.result.instrumentType}: {photo.result.reading} {photo.result.unit}
                        </p>
                      )}
                      {photo.status === 'error' && (
                        <p className="text-[9px] text-[#E5484D] flex items-center gap-1 mt-0.5">
                          <AlertCircle size={10} />
                          Failed to read
                        </p>
                      )}
                    </div>
                    {!processing && photo.status !== 'processing' && (
                      <button
                        onClick={() => handleRemovePhoto(photo.id)}
                        className="flex-shrink-0 p-1"
                      >
                        <X size={14} className="text-[#8B939A]" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STATUS SUMMARY */}
          {photos.length > 0 && processedReadings.length > 0 && (
            <div className="bg-[#24282B] border border-[#3A4045] p-3">
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#8B939A] mb-2">
                Processing Summary
              </p>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#8B939A]">Processed:</span>
                  <span className="text-[#ECE9E3]">{doneCount + errorCount} / {photos.length}</span>
                </div>
                {errorCount > 0 && (
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-[#E5484D]">Errors:</span>
                    <span className="text-[#E5484D]">{errorCount}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>

        {/* FOOTER BUTTONS */}
        <div className="bg-[#1D2022] border-t border-[#2E3336] px-4 py-3 space-y-2">
          {photos.length > 0 && processedReadings.length === 0 && (
            <button
              onClick={handleProcessPhotos}
              disabled={processing}
              className="w-full bg-[#FF6A13] text-[#1A1C1D] py-3 font-bold uppercase tracking-wider text-[12px] disabled:opacity-50"
            >
              {processing ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader size={14} className="animate-spin" />
                  Analyzing...
                </span>
              ) : (
                'Analyze Photos'
              )}
            </button>
          )}

          {processedReadings.length > 0 && (
            <button
              onClick={handleCompleteInspection}
              className="w-full bg-[#3FAE6B] text-[#1A1C1D] py-3 font-bold uppercase tracking-wider text-[12px]"
            >
              Complete Inspection
            </button>
          )}

          {processedReadings.length > 0 && (
            <button
              onClick={() => {
                setPhotos([])
                setProcessedReadings([])
              }}
              className="w-full bg-[#24282B] text-[#ECE9E3] py-2 font-semibold uppercase tracking-wider text-[12px] border border-[#3A4045] flex items-center justify-center gap-2"
            >
              <RotateCcw size={14} />
              Start Over
            </button>
          )}

          <button
            onClick={onCancel}
            className="w-full bg-transparent text-[#8B939A] py-2 font-semibold uppercase tracking-wider text-[12px]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
