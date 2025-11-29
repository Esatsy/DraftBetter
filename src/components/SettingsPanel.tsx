import { useState, useEffect } from 'react'
import { riotApi } from '../services/RiotApiService'

type Region = 'TR' | 'EUW' | 'EUNE' | 'NA' | 'KR'

interface SettingsPanelProps {
  isOpen: boolean
  onClose: () => void
}

export function SettingsPanel({ isOpen, onClose }: SettingsPanelProps) {
  const [apiKey, setApiKey] = useState('')
  const [region, setRegion] = useState<Region>('TR')
  const [isSaved, setIsSaved] = useState(false)

  useEffect(() => {
    // LocalStorage'dan ayarları yükle
    const savedApiKey = localStorage.getItem('riot_api_key') || ''
    const savedRegion = (localStorage.getItem('riot_region') as Region) || 'TR'
    
    setApiKey(savedApiKey)
    setRegion(savedRegion)
    
    if (savedApiKey) {
      riotApi.updateApiKey(savedApiKey)
    }
    riotApi.configure({ region: savedRegion })
  }, [isOpen]) // isOpen değiştiğinde yeniden yükle

  const handleSave = () => {
    if (apiKey) {
      localStorage.setItem('riot_api_key', apiKey)
      riotApi.updateApiKey(apiKey)
    }
    localStorage.setItem('riot_region', region)
    riotApi.configure({ region })
    
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 2000)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative glass-card w-full max-w-md mx-4 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-display font-bold text-white">
            ⚙️ Ayarlar
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
          >
            <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="space-y-5">
          {/* API Key */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              🔑 Riot API Key
            </label>
            <input
              type="text"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="RGAPI-xxxxxxxx-xxxx-xxxx..."
              className="w-full px-4 py-2 rounded-lg bg-draft-surface border border-draft-border text-white text-sm placeholder-white/30 focus:outline-none focus:border-neon-green/50 font-mono"
            />
            <p className="text-xs text-white/40 mt-1.5">
              ⚠️ Development key 24 saatte sona erer.{' '}
              <a 
                href="https://developer.riotgames.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-neon-blue hover:underline"
              >
                Yeni key al →
              </a>
            </p>
          </div>

          {/* Region */}
          <div>
            <label className="block text-sm font-medium text-white/70 mb-2">
              🌍 Bölge
            </label>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value as Region)}
              className="w-full px-4 py-2 rounded-lg bg-draft-surface border border-draft-border text-white focus:outline-none focus:border-neon-green/50"
            >
              <option value="TR">Türkiye (TR)</option>
              <option value="EUW">Batı Avrupa (EUW)</option>
              <option value="EUNE">Kuzey/Doğu Avrupa (EUNE)</option>
              <option value="NA">Kuzey Amerika (NA)</option>
              <option value="KR">Kore (KR)</option>
            </select>
          </div>

          {/* Status */}
          <div className="p-3 rounded-lg bg-draft-surface/50 border border-draft-border">
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${apiKey ? 'bg-neon-green animate-pulse' : 'bg-neon-orange'}`} />
              <span className="text-sm text-white/70">
                {apiKey ? 'API Key aktif' : 'API Key girilmedi (varsayılan kullanılıyor)'}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-draft-border">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-draft-border/50 text-white/70 hover:bg-draft-border transition-colors"
          >
            İptal
          </button>
          <button
            onClick={handleSave}
            className={`btn-glow ${isSaved ? 'bg-neon-green/30' : ''}`}
          >
            {isSaved ? '✓ Kaydedildi!' : 'Kaydet'}
          </button>
        </div>
      </div>
    </div>
  )
}
