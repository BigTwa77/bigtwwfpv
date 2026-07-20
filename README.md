# Shield Inspect AI

**NACE Level 2 Coating Inspection App with AI Photo Reading**

## Overview

Shield Inspect AI is a mobile-first React app designed for NACE Level 2 coating inspectors. It leverages **Mistral AI** (running locally via Ollama) to automatically read test instrument photos and generate compliant inspection reports.

## Features

- 📱 **Mobile-First UI** — Optimized for job site use
- 📸 **Photo Capture** — Upload test instrument photos (DFT gauges, adhesion testers, salt spray, etc.)
- 🤖 **AI Photo Reading** — Mistral analyzes photos and extracts readings automatically
- 📋 **Auto Report Generation** — Converts photo data into NACE-compliant inspection reports
- 🏢 **Project Management** — Track inspections by project and site
- 📊 **Inspector Dashboard** — View stats, previous inspections, recent activity
- 🎖️ **Certifications Tracking** — Manage inspector credentials and equipment calibration

## Tech Stack

- **Frontend:** React 18 + Tailwind CSS + Vite
- **AI Backend:** Mistral (via Ollama - runs locally)
- **UI Components:** Lucide React icons
- **State Management:** React hooks

## Requirements

### System Requirements

- Node.js 16+
- Ollama (with Mistral model)
- 4GB+ RAM
- Modern web browser

### Installing Ollama + Mistral

1. Download Ollama: https://ollama.ai
2. Install and run:
   ```bash
   ollama run mistral
   ```
3. Keep the Ollama terminal window open while using the app

## Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/BigTwa77/bigtwwfpv.git
   cd bigtwwfpv
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the dev server:
   ```bash
   npm run dev
   ```

4. Open your browser: http://localhost:5173

## How to Use

### 1. Start New Inspection
- Click "New Inspection" from the dashboard
- Enter project name, site name, and confirm inspector
- Upload photos of test instruments

### 2. AI Photo Analysis
- Click "Analyze Photos"
- Mistral reads each image and extracts:
  - Instrument type
  - Reading value & unit
  - Pass/Fail status
  - Confidence level
- Results display under each photo

### 3. Generate Report
- Click "Complete Inspection"
- App generates report with all extracted data
- Report includes summary stats and detailed readings

### 4. View Certifications
- Access from dashboard "Manage" section
- View inspector certs and equipment calibration status
- Track expiration dates

## Project Structure

```
src/
├── components/
│   ├── shield-inspect-dashboard.jsx      # Main dashboard
│   ├── shield-inspect-certifications.jsx # Inspector profile & certs
│   └── PhotoCapture.jsx                  # Photo upload & AI analysis
├── services/
│   └── ocrService.js                     # Mistral integration
├── App.jsx                               # Main router
└── main.jsx                              # React entry point
```

## API Integration

### Ollama Service

The app connects to Ollama's API at `http://localhost:11434/api/generate`

**Photo Reading Prompt:**
```
You are a NACE Level 2 coating inspection expert. 
Analyze this test instrument photo and extract:
1. Instrument Type
2. Reading Value
3. Unit of Measurement
4. Pass/Fail Status
5. Confidence Level
6. Notes

Return JSON format with these fields.
```

## Report Format

Generated reports include:

```json
{
  "reportId": "INS-1234567890",
  "projectName": "Tank T-204 Recoating",
  "siteName": "Tom Price Processing Site",
  "inspector": "Antz",
  "date": "21/07/2026",
  "overallStatus": "PASS",
  "summary": {
    "total": 12,
    "passed": 11,
    "failed": 0,
    "warnings": 1,
    "passRate": "91.7%"
  },
  "readings": [
    {
      "filename": "IMG_001.jpg",
      "instrumentType": "DFT Gauge",
      "reading": "285",
      "unit": "µm",
      "status": "PASS",
      "confidence": "HIGH"
    }
  ]
}
```

## Development

### Build for production:
```bash
npm run build
```

### Preview build:
```bash
npm run preview
```

## Troubleshooting

### "Cannot connect to Ollama"
- Ensure Ollama is running: `ollama run mistral`
- Check if service is on `http://localhost:11434`
- Verify port 11434 is not blocked by firewall

### Photos not being analyzed
- Check browser console for errors
- Ensure images are clear and show instrument displays
- Try with a different image

### Slow performance
- Mistral analysis takes 10-30 seconds per image
- Ensure your computer has sufficient RAM
- Close other applications

## Future Features

- 🗄️ Cloud sync for reports
- 📤 Email report generation
- 🔄 Batch processing improvements
- 🗺️ Offline mode enhancements
- 📱 Native mobile app (React Native)

## License

Proprietary - BigTwa77

## Support

For issues or questions, contact: antz@bigtwwfpv.com

---

**Built for NACE Level 2 Coating Inspectors by Antz**
