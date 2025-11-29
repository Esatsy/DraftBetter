# DraftBetter - LoL Akıllı Seçim Asistanı

<div align="center">

![DraftBetter Logo](https://img.shields.io/badge/DraftBetter-LoL%20Draft%20Assistant-00ff88?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNCAyNCI+PHBhdGggZmlsbD0iIzAwZmY4OCIgZD0iTTEyIDJMMiA3djEwbDEwIDUgMTAtNVY3eiIvPjwvc3ZnPg==)

**League of Legends için Akıllı Şampiyon Seçim Asistanı**

Blitz.gg ve Porofessor'dan farklı olarak, sadece "Win Rate" değil, 
takım kompozisyonu, sinerjiler ve güç eğrileri analiz eden derinlikli bir öneri motoru.

</div>

---

## ✨ Özellikler

- 🔗 **Otomatik LCU Bağlantısı** - League istemcisine otomatik bağlanır
- 🧠 **Akıllı Öneri Motoru** - Çok faktörlü puanlama sistemi
- 📊 **Kompozisyon Analizi** - Takımdaki eksik arketipleri tespit eder
- 🤝 **Sinerji Bonusu** - Takım arkadaşlarıyla uyumu değerlendirir
- ⚔️ **Counter Analizi** - Rakip takıma karşı üstünlükleri hesaplar
- 📈 **Güç Eğrisi** - Takımın erken/geç oyun dengesi
- 🏆 **Pro Arena Verisi** - Profesyonel tercih oranları

---

## 🛠️ Teknoloji Yığını

| Teknoloji | Kullanım |
|-----------|----------|
| Electron | Masaüstü uygulaması |
| React 18 | UI framework |
| TypeScript | Tip güvenliği |
| Tailwind CSS | Stil sistemi |
| Zustand | State yönetimi |
| league-connect | LCU bağlantısı |
| electron-vite | Build tooling |

---

## 🚀 Kurulum

### Gereksinimler

- Node.js 18+
- npm 9+
- League of Legends istemcisi (test için)

### Adımlar

```bash
# 1. Bağımlılıkları yükle
npm install

# 2. Geliştirme modunda çalıştır
npm run dev

# 3. Production build (opsiyonel)
npm run build

# 4. Platform için paketleme (opsiyonel)
npm run build:win   # Windows
npm run build:mac   # macOS
npm run build:linux # Linux
```

---

## 📁 Proje Yapısı

```
DraftBetter/
├── electron/
│   ├── main/
│   │   ├── index.ts              # Electron ana süreç
│   │   └── services/
│   │       └── LCUService.ts     # LCU bağlantı servisi
│   └── preload/
│       └── index.ts              # IPC köprüsü
├── src/
│   ├── App.tsx                   # Ana uygulama
│   ├── main.tsx                  # React giriş noktası
│   ├── components/
│   │   ├── Dashboard.tsx         # Ana panel
│   │   ├── ChampionCard.tsx      # Öneri kartı
│   │   ├── ReasoningPanel.tsx    # Açıklama paneli
│   │   ├── TeamPanel.tsx         # Takım paneli
│   │   ├── ConnectionStatus.tsx  # Bağlantı durumu
│   │   └── TitleBar.tsx          # Başlık çubuğu
│   ├── engine/
│   │   ├── RecommendationEngine.ts  # Öneri motoru
│   │   └── ScoringRules.ts          # Puanlama kuralları
│   ├── data/
│   │   └── ChampionKnowledgeBase.ts # Şampiyon verileri
│   ├── stores/
│   │   └── draftStore.ts         # Zustand store
│   ├── types/
│   │   └── index.ts              # TypeScript tipleri
│   └── styles/
│       └── index.css             # Global stiller
├── package.json
├── electron.vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🧠 Öneri Motoru Algoritması

Öneri motoru şu faktörleri değerlendirir:

### 1. Kompozisyon Analizi (25 puan max)
- Takımda Engage eksikse → Engage şampiyonlarına bonus
- Takımda Frontline eksikse → Tank şampiyonlarına bonus
- Hasar dengesi (tüm takım AD ise AP öner)

### 2. Sinerji Bonusu (25 puan max)
- Takım arkadaşlarıyla combo potansiyeli
- Örnek: Vi + Ahri = CC zinciri uyumu

### 3. Counter Puanı (30 puan max)
- Rakip şampiyonlara karşı güçlü mü?
- Rakip takım full AD ise Malphite yüksek puan alır

### 4. Güç Eğrisi (15 puan max)
- Takımın early/late game dengesi
- Teamfight vs Splitpush uyumu

### 5. Pro Arena Verisi (10 puan max)
- Profesyonel arenada win rate
- Meta popülerliği

---

## 🎨 UI Tema

- **Renk Paleti**: Koyu mor/mavi tonları (#0a0a0f, #1a1a2e)
- **Aksan Renkleri**: Neon yeşil (#00ff88), mor (#b24bff)
- **Font**: Outfit (başlıklar), Inter (gövde), JetBrains Mono (kod)
- **Efektler**: Glassmorphism, neon glow, grid pattern arka plan

---

## 📝 Yapılacaklar

- [ ] Tam şampiyon veri seti ekleme (160+ şampiyon)
- [ ] Gerçek zamanlı LCU veri entegrasyonu test
- [ ] Ban önerisi sistemi
- [ ] Rol bazlı filtreleme
- [ ] Kullanıcı ayarları paneli
- [ ] Şampiyon arama özelliği
- [ ] Match history analizi

---

## 🤝 Katkıda Bulunma

1. Fork'layın
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit'leyin (`git commit -m 'Add amazing feature'`)
4. Push'layın (`git push origin feature/amazing-feature`)
5. Pull Request açın

---

## 📄 Lisans

MIT License - Detaylar için [LICENSE](LICENSE) dosyasına bakın.

---

<div align="center">

**DraftBetter ile Daha Akıllı Seçimler Yapın! 🎮**

</div>
