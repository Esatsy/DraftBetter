import { useDraftStore } from '../stores/draftStore'

export function ConnectionStatus() {
  const { connectionStatus, phase, isDemoMode, disableDemoMode } = useDraftStore()

  // Demo mode display
  if (isDemoMode) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-neon-purple/20 border border-neon-purple/30">
          <span className="text-xs font-medium text-neon-purple">DEMO MODU</span>
        </div>
        <button
          onClick={disableDemoMode}
          className="text-xs text-white/50 hover:text-neon-red transition-colors"
        >
          Çıkış
        </button>
      </div>
    )
  }

  // Connected and in champion select - show phase
  if (connectionStatus === 'connected' && phase !== 'none') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-medium text-green-400">Bağlı</span>
        <span className="text-white/20">|</span>
        <div className={`
          px-2 py-0.5 rounded text-xs font-medium
          ${phase === 'banning' ? 'bg-red-500/20 text-red-400' : 
            phase === 'picking' ? 'bg-cyan-500/20 text-cyan-400' : 
            'bg-slate-500/20 text-slate-400'
          }
        `}>
          {phase === 'banning' && '🚫 Ban'}
          {phase === 'picking' && '✨ Pick'}
          {phase === 'planning' && '📋 Plan'}
        </div>
      </div>
    )
  }

  // Connected but waiting for champ select
  if (connectionStatus === 'connected') {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span className="text-xs text-green-400">LoL Bağlı</span>
      </div>
    )
  }

  // Not connected - show minimal indicator
  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-700/50 border border-slate-600/30">
      <div className="w-2 h-2 rounded-full bg-slate-500" />
      <span className="text-xs text-slate-400">LoL Bekleniyor</span>
    </div>
  )
}
