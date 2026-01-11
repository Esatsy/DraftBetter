# TacticsMaster

<div align="center">

<img src="https://img.shields.io/badge/TacticsMaster-TFT%20AI%20Companion-06b6d4?style=for-the-badge&labelColor=0a0a0f&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0iIzA2YjZkNCI+PHBhdGggZD0iTTEyIDJMNCA3djEwbDggNSA4LTVWNnoiLz48L3N2Zz4=" alt="TacticsMaster"/>

### 🎮 AI-Powered Teamfight Tactics Companion

**Climb the ranked ladder with machine learning insights**

[![Release](https://img.shields.io/badge/Release-Coming%20Soon-06b6d4?style=flat-square)](https://github.com/Esatsy/TacticsMaster/releases)
[![License](https://img.shields.io/badge/License-MIT-zinc?style=flat-square)](LICENSE)
[![TFT](https://img.shields.io/badge/Game-Teamfight%20Tactics-violet?style=flat-square)](https://teamfighttactics.leagueoflegends.com/)

[🌐 Website](https://esatsy.github.io/TacticsMaster) · [📥 Download](#-installation) · [📖 Documentation](#-features)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 👑 Meta Compositions
Real-time tier lists updated with every patch. Know which comps are dominating high-elo lobbies before anyone else.

### ✨ Augment Advisor
Stage-specific augment recommendations based on your current board state. Never miss the perfect augment again.

### ⚔️ Item Optimizer
Best-in-slot item recommendations for every carry. Know exactly what to slam and when.

</td>
<td width="50%">

### 🤖 AI Predictions
Machine learning model trained on current patch high-elo matches. Get win probability predictions for any composition.

### 📊 Personal Stats
Track your performance, favorite comps, and augment win rates. Identify your strengths and areas to improve.

### 🔄 Live Sync
Automatically syncs with the TFT client. Get recommendations as you play without alt-tabbing.

</td>
</tr>
</table>

---

## 🧠 AI Engine

TacticsMaster uses a custom-trained machine learning model:

```
┌─────────────────────────────────────────────────────────────────┐
│                    MetaAwarePredictor Model                     │
├─────────────────────────────────────────────────────────────────┤
│  📊 Training Data    │  Current-patch high-elo matches only    │
│  🎯 Architecture     │  MLP with Dropout + Champion Embeddings │
│  ⚡ Device Support   │  CUDA / MPS (Apple) / ROCm / CPU        │
│  🔄 Updates          │  Auto-retrain on new patches            │
└─────────────────────────────────────────────────────────────────┘
```

### Data Pipeline

1. **Harvester** - High-performance async crawler fetches matches from Riot API
2. **Storage** - SQLite with WAL mode for efficient batch operations
3. **Training** - PyTorch model trained on placement predictions
4. **Inference** - Real-time predictions integrated into the app

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Desktop App** | Electron + React 18 + TypeScript |
| **State** | Zustand |
| **Styling** | Tailwind CSS + Custom Animations |
| **Game Integration** | Riot LCU API |
| **AI/ML** | Python + PyTorch + aiohttp |
| **Database** | SQLite (WAL mode) |
| **Build** | electron-vite |

---

## 📥 Installation

### Prerequisites

- Node.js 18+
- Python 3.10+ (for AI engine)
- TFT Client (for live sync)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/Esatsy/TacticsMaster.git
cd TacticsMaster

# Install dependencies
npm install

# Run in development mode
npm run dev
```

### AI Engine Setup

```bash
# Install Python dependencies
cd src/ai_engine
pip install -r requirements.txt

# Set your Riot API key
export RIOT_API_KEY=your_key_here

# Start data collection
python -m src.ai_engine.main --mode crawl --region euw1

# Train the model
python -m src.ai_engine.main --mode train
```

---

## 📁 Project Structure

```
TacticsMaster/
├── electron/
│   ├── main/
│   │   ├── index.ts              # Electron main process
│   │   └── services/
│   │       └── LCUService.ts     # TFT client integration
│   └── preload/
│       └── index.ts              # IPC bridge
├── src/
│   ├── App.tsx                   # Main application
│   ├── components/
│   │   ├── TFTDashboard.tsx      # Main TFT dashboard
│   │   ├── Navigation.tsx        # Sidebar navigation
│   │   └── ui/                   # Reusable UI components
│   ├── services/
│   │   ├── TFTApiService.ts      # TFT API integration
│   │   └── RiotApiService.ts     # Riot API wrapper
│   ├── stores/
│   │   └── tftStore.ts           # Zustand state
│   ├── types/
│   │   └── tft.ts                # TFT type definitions
│   └── styles/
│       └── index.css             # Global styles
├── src/ai_engine/                # Python AI module
│   ├── crawler.py                # Match data harvester
│   ├── database.py               # SQLite storage
│   ├── model.py                  # PyTorch model
│   ├── train.py                  # Training pipeline
│   └── predictor.py              # Inference API
├── docs/                         # GitHub Pages site
└── archive/                      # Archived LoL code
```

---

## 🎨 Design

<table>
<tr>
<td>

**Color Palette**
- Background: `#0a0a0f`
- Surface: `#121214`
- Primary: `#06b6d4` (Cyan)
- Victory: `#22c55e`
- Defeat: `#ef4444`

</td>
<td>

**Effects**
- Glassmorphism panels
- Shimmer button animations
- Animated grid background
- UnicornStudio integration
- Smooth view transitions

</td>
</tr>
</table>

---

## 📜 Legal

TacticsMaster isn't endorsed by Riot Games and doesn't reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties.

**Riot Games**, **Teamfight Tactics**, and all associated properties are trademarks or registered trademarks of Riot Games, Inc.

---

## 📄 License

MIT License - see [LICENSE](LICENSE) for details.

---

<div align="center">

**Built with ❤️ for the TFT community**

[⬆ Back to top](#tacticsmaster)

</div>
