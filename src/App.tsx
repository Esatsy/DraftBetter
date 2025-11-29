import { useEffect, useState } from 'react'
import { Dashboard } from './components/Dashboard'
import { TitleBar } from './components/TitleBar'
import { Navigation, Page } from './components/Navigation'
import { HomePage } from './pages/HomePage'
import { ChampionsPage } from './pages/ChampionsPage'
import { TierListPage } from './pages/TierListPage'
import { SynergiesPage } from './pages/SynergiesPage'
import { SimulationPage } from './pages/SimulationPage'
import { InGameOverlay } from './components/InGameOverlay'
import { useDraftStore } from './stores/draftStore'

function App() {
  const isOverlayWindow = window.location.hash === '#/overlay'

  if (isOverlayWindow) {
    document.documentElement.classList.add('overlay-window')
    document.body.classList.add('overlay-window')
    return <InGameOverlay />
  }

  const { setConnectionStatus, setChampSelectData, resetChampSelect, phase, connectionStatus } = useDraftStore()
  const [currentPage, setCurrentPage] = useState<Page>('draft')

  const isInChampSelect = connectionStatus === 'connected' && phase !== 'none'
  
  useEffect(() => {
    if (isInChampSelect && currentPage !== 'draft') {
      setCurrentPage('draft')
    }
  }, [isInChampSelect])

  useEffect(() => {
    const unsubscribeConnection = window.api.lcu.onConnectionChange((status) => {
      setConnectionStatus(status as 'disconnected' | 'connecting' | 'connected')
    })

    const unsubscribeChampSelect = window.api.lcu.onChampSelectUpdate((data) => {
      setChampSelectData(data as ChampSelectData)
    })

    const unsubscribeEnd = window.api.lcu.onChampSelectEnd(() => {
      resetChampSelect()
    })

    window.api.lcu.getStatus().then((status) => {
      setConnectionStatus(status as 'disconnected' | 'connecting' | 'connected')
    })

    return () => {
      unsubscribeConnection()
      unsubscribeChampSelect()
      unsubscribeEnd()
    }
  }, [setConnectionStatus, setChampSelectData, resetChampSelect])

  const isConnected = connectionStatus === 'connected'

  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage isConnected={isConnected} />
      case 'draft': return <Dashboard />
      case 'champions': return <ChampionsPage />
      case 'tierlist': return <TierListPage />
      case 'synergies': return <SynergiesPage />
      case 'simulation': return <SimulationPage />
      case 'settings': return <SettingsPage />
      default: return <HomePage isConnected={isConnected} />
    }
  }

  // Initialize UnicornStudio background
  useEffect(() => {
    if (!(window as any).UnicornStudio) {
      (window as any).UnicornStudio = { isInitialized: false }
      const script = document.createElement('script')
      script.src = 'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js'
      script.onload = () => {
        if (!(window as any).UnicornStudio.isInitialized) {
          (window as any).UnicornStudio.init()
          ;(window as any).UnicornStudio.isInitialized = true
        }
      }
      document.head.appendChild(script)
    }
  }, [])

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* UnicornStudio Animated Background */}
      <div 
        className="fixed -z-10 w-full h-screen top-0 saturate-50 hue-rotate-180"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 0%, black 72%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 0%, black 72%, transparent)'
        }}
      >
        <div className="absolute top-0 w-full h-full -z-10">
          <div 
            data-us-project="vTTCp5g4cVl9nwjlT56Z" 
            className="absolute w-full h-full left-0 top-0 -z-10"
          />
        </div>
      </div>

      <TitleBar />
      
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar Navigation */}
        <Navigation 
          currentPage={currentPage} 
          onPageChange={setCurrentPage}
          isInChampSelect={isInChampSelect}
        />
        
        {/* Main Content */}
        <main className="flex-1 flex flex-col relative overflow-hidden">
          {/* Secondary Background Elements (subtle glows) */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1/2 bg-primary/5 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-1/3 h-1/3 bg-blue-600/5 blur-[100px] rounded-full" />
            <div 
              className="absolute inset-0 opacity-[0.03]" 
              style={{ 
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', 
                backgroundSize: '40px 40px' 
              }} 
            />
          </div>
          
          {/* Page Content */}
          <div className="relative z-10 flex-1 overflow-hidden">
            {renderPage()}
          </div>
        </main>
      </div>
    </div>
  )
}

// Settings Page
function SettingsPage() {
  const { isDemoMode, enableDemoMode, disableDemoMode } = useDraftStore()
  const [apiKey, setApiKey] = useState('')

  return (
    <div className="h-full overflow-y-auto p-8 animate-fade-in">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-display font-medium text-white mb-2">Settings</h1>
        <p className="text-zinc-500 mb-8">Configure your DraftBetter experience.</p>

        <div className="space-y-6">
          {/* Demo Mode */}
          <div className="glass-panel p-6 rounded-xl border border-white/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-medium mb-1">Demo Mode</h3>
                <p className="text-sm text-zinc-500">
                  Test the UI without connecting to the League client.
                </p>
              </div>
              <button
                onClick={isDemoMode ? disableDemoMode : enableDemoMode}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  isDemoMode 
                    ? 'bg-defeat/20 text-defeat border border-defeat/20 hover:bg-defeat/30' 
                    : 'bg-primary/20 text-primary border border-primary/20 hover:bg-primary/30'
                }`}
              >
                {isDemoMode ? 'Disable' : 'Enable'}
              </button>
            </div>
          </div>

          {/* API Key */}
          <div className="glass-panel p-6 rounded-xl border border-white/5">
            <h3 className="text-white font-medium mb-1">Riot API Key</h3>
            <p className="text-sm text-zinc-500 mb-4">
              Enter your personal API key for extended features.
            </p>
            <div className="flex gap-3">
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="RGAPI-..."
                className="flex-1 bg-surface border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50"
              />
              <button
                onClick={() => {
                  localStorage.setItem('riotApiKey', apiKey)
                  alert('Saved!')
                }}
                className="px-4 py-2 bg-primary text-white rounded-lg font-medium text-sm hover:bg-primary/80 transition-colors"
              >
                Save
              </button>
            </div>
          </div>

          {/* About */}
          <div className="glass-panel p-6 rounded-xl border border-primary/20">
            <h3 className="text-primary font-medium mb-2">About DraftBetter</h3>
            <div className="text-sm text-zinc-400 space-y-1">
              <p>Version: 2.4.0</p>
              <p>Patch: 14.23</p>
              <p className="text-zinc-500 mt-3">
                AI-powered draft assistant for League of Legends. Synergy analysis, counter picks, and real-time recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import { ChampSelectData } from './types'

export default App
