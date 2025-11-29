/**
 * OYUN İÇİ OVERLAY - Live Data + Manual Fallback
 * 
 * Riot Live Client Data API kullanarak gerçek zamanlı oyun verisi çeker.
 * API bağlantısı yoksa manuel moda geçer.
 */

import { useState, useEffect, useCallback } from 'react'
import { riotApi } from '../services/RiotApiService'
import { 
  liveGameService, 
  LiveGameState, 
  formatGameTime, 
  calculateKDA, 
  calculateCSPerMin 
} from '../services/LiveGameService'

// Jungle camp spawn data (seconds)
const JUNGLE_CAMPS = {
  baron: { name: 'Baron', icon: '👑', respawn: 360, firstSpawn: 1200 },
  dragon: { name: 'Dragon', icon: '🐉', respawn: 300, firstSpawn: 300 },
  herald: { name: 'Herald', icon: '👁️', respawn: 360, firstSpawn: 480 },
  blue: { name: 'Blue', icon: '🔵', respawn: 300, firstSpawn: 90 },
  red: { name: 'Red', icon: '🔴', respawn: 300, firstSpawn: 90 },
  gromp: { name: 'Gromp', icon: '🐸', respawn: 135, firstSpawn: 102 },
  wolves: { name: 'Wolves', icon: '🐺', respawn: 135, firstSpawn: 102 },
  raptors: { name: 'Raptors', icon: '🐦', respawn: 135, firstSpawn: 102 },
  krugs: { name: 'Krugs', icon: '🪨', respawn: 135, firstSpawn: 102 },
  scuttle: { name: 'Scuttle', icon: '🦀', respawn: 150, firstSpawn: 210 },
} as const

type CampId = keyof typeof JUNGLE_CAMPS

interface Timer {
  id: CampId
  spawnTime: number
}

type ViewMode = 'full' | 'compact' | 'minimal'

export function InGameOverlay() {
  // Live game state
  const [liveState, setLiveState] = useState<LiveGameState | null>(null)
  const isLiveConnected = liveState?.isConnected ?? false

  // Manual fallback state
  const [manualGameTime, setManualGameTime] = useState(0)
  const [isManualRunning, setIsManualRunning] = useState(false)
  const [manualCS, setManualCS] = useState(0)
  
  // Timers (used for both modes)
  const [activeTimers, setActiveTimers] = useState<Timer[]>([])
  
  // UI state
  const [viewMode, setViewMode] = useState<ViewMode>('full')
  const [opacity, setOpacity] = useState(0.9)

  // Draft store was removed - using live data directly

  // Subscribe to live game data
  useEffect(() => {
    liveGameService.startPolling()
    
    const unsubscribe = liveGameService.subscribe((state) => {
      setLiveState(state)
    })

    return () => {
      unsubscribe()
      liveGameService.stopPolling()
    }
  }, [])

  // Manual timer (fallback when not connected to live game)
  useEffect(() => {
    if (isLiveConnected || !isManualRunning) return
    
    const interval = setInterval(() => {
      setManualGameTime(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isLiveConnected, isManualRunning])

  // Current game time (live or manual)
  const gameTime = isLiveConnected ? (liveState?.gameTime ?? 0) : manualGameTime

  // Current CS (live or manual)
  const currentCS = isLiveConnected 
    ? (liveState?.allPlayers.find(p => p.summonerName === liveState.activePlayer?.summonerName)?.scores.creepScore ?? 0)
    : manualCS

  // Current player data
  const activePlayer = liveState?.activePlayer
  const myPlayer = liveState?.allPlayers.find(p => p.summonerName === activePlayer?.summonerName)

  // Timer functions
  const startTimer = useCallback((campId: CampId) => {
    const camp = JUNGLE_CAMPS[campId]
    const spawnTime = gameTime + camp.respawn
    
    setActiveTimers(prev => {
      const filtered = prev.filter(t => t.id !== campId)
      return [...filtered, { id: campId, spawnTime }]
    })
  }, [gameTime])

  const clearTimer = useCallback((campId: CampId) => {
    setActiveTimers(prev => prev.filter(t => t.id !== campId))
  }, [])

  const getRemaining = (campId: CampId): number | null => {
    const timer = activeTimers.find(t => t.id === campId)
    if (!timer) return null
    const remaining = timer.spawnTime - gameTime
    return remaining > 0 ? remaining : null
  }

  // Auto-remove expired timers
  useEffect(() => {
    setActiveTimers(prev => prev.filter(t => t.spawnTime > gameTime))
  }, [gameTime])

  // CS metrics
  const csPerMin = calculateCSPerMin(currentCS, gameTime)
  const perfectCS = Math.floor((gameTime / 60) * 10)
  const csDiff = currentCS - perfectCS

  // KDA
  const kda = myPlayer 
    ? calculateKDA(myPlayer.scores.kills, myPlayer.scores.deaths, myPlayer.scores.assists)
    : '0.00'

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement) return
      
      switch (e.key.toLowerCase()) {
        case 'd': startTimer('dragon'); break
        case 'b': startTimer('baron'); break
        case 'h': startTimer('herald'); break
        case '+':
        case '=': if (!isLiveConnected) setManualCS(prev => prev + 1); break
        case '-': if (!isLiveConnected) setManualCS(prev => Math.max(0, prev - 1)); break
        case '6': if (!isLiveConnected) setManualCS(prev => prev + 6); break
        case '4': if (!isLiveConnected) setManualCS(prev => prev + 4); break
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [startTimer, isLiveConnected])

  // ==========================================
  // MINIMAL MODE
  // ==========================================
  if (viewMode === 'minimal') {
    return (
      <div className="p-1 font-mono text-sm" style={{ opacity }}>
        <div className="flex flex-col gap-1">
          <button
            onClick={() => setViewMode('compact')}
            className="w-7 h-7 bg-black/80 backdrop-blur-sm rounded flex items-center justify-center hover:bg-black/90 transition-colors border border-white/20"
          >
            <span className="text-white/80 text-xs">▼</span>
          </button>
          
          {/* Connection status */}
          <div className={`px-2 py-1 rounded text-xs ${isLiveConnected ? 'bg-green-500/30 text-green-400' : 'bg-yellow-500/30 text-yellow-400'}`}>
            {isLiveConnected ? '🔴 LIVE' : '⏸️ Manual'}
          </div>
          
          {/* Active timers */}
          {activeTimers.map(timer => {
            const camp = JUNGLE_CAMPS[timer.id]
            const remaining = getRemaining(timer.id)
            if (!remaining) return null
            
            const isWarning = remaining < 60
            const isCritical = remaining < 30
            
            return (
              <div
                key={timer.id}
                onClick={() => clearTimer(timer.id)}
                className={`
                  px-2 py-1 rounded cursor-pointer flex items-center gap-2
                  ${isCritical ? 'bg-red-500/80 animate-pulse' : isWarning ? 'bg-orange-500/70' : 'bg-black/80'}
                  backdrop-blur-sm border border-white/20
                `}
              >
                <span>{camp.icon}</span>
                <span className="text-white font-bold">{formatGameTime(remaining)}</span>
              </div>
            )
          })}
          
          {/* CS & KDA */}
          <div className="px-2 py-1 bg-black/80 backdrop-blur-sm rounded border border-white/20">
            <div className="text-cyan-400 font-bold">{currentCS} <span className="text-white/40 text-xs">CS</span></div>
            {isLiveConnected && myPlayer && (
              <div className="text-xs text-white/60">
                {myPlayer.scores.kills}/{myPlayer.scores.deaths}/{myPlayer.scores.assists}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // ==========================================
  // COMPACT MODE
  // ==========================================
  if (viewMode === 'compact') {
    return (
      <div className="p-1 font-body" style={{ opacity }}>
        <div className="bg-black/85 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden w-48">
          {/* Header */}
          <div className="flex items-center justify-between px-2 py-1.5 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
              <span className="text-cyan-400 font-mono text-sm font-bold">{formatGameTime(gameTime)}</span>
            </div>
            <div className="flex gap-1">
              <button onClick={() => setViewMode('minimal')} className="text-white/50 hover:text-white text-xs">▲</button>
              <button onClick={() => setViewMode('full')} className="text-white/50 hover:text-white text-xs">▼</button>
            </div>
          </div>
          
          {/* Quick Timers */}
          <div className="p-1.5 grid grid-cols-4 gap-1">
            {(['dragon', 'baron', 'herald', 'scuttle'] as CampId[]).map(id => {
              const camp = JUNGLE_CAMPS[id]
              const remaining = getRemaining(id)
              const isActive = remaining !== null
              const isWarning = remaining !== null && remaining < 60
              const isCritical = remaining !== null && remaining < 30
              
              return (
                <button
                  key={id}
                  onClick={() => isActive ? clearTimer(id) : startTimer(id)}
                  className={`
                    p-1 rounded text-center transition-all
                    ${isCritical ? 'bg-red-500/60 animate-pulse' : 
                      isWarning ? 'bg-orange-500/50' : 
                      isActive ? 'bg-cyan-500/40' : 'bg-white/5 hover:bg-white/10'}
                  `}
                >
                  <span className="text-base">{camp.icon}</span>
                  {isActive && (
                    <div className={`text-[10px] font-mono font-bold ${
                      isCritical ? 'text-red-300' : isWarning ? 'text-orange-300' : 'text-cyan-300'
                    }`}>
                      {formatGameTime(remaining!)}
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Stats */}
          <div className="px-2 py-1.5 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-white font-bold">{currentCS}</span>
              <span className="text-white/40 text-xs ml-1">CS</span>
              <span className={`text-xs ml-2 ${csDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                ({csDiff >= 0 ? '+' : ''}{csDiff})
              </span>
            </div>
            {isLiveConnected && myPlayer && (
              <div className="text-xs text-white/70">
                <span className="text-green-400">{myPlayer.scores.kills}</span>/
                <span className="text-red-400">{myPlayer.scores.deaths}</span>/
                <span className="text-blue-400">{myPlayer.scores.assists}</span>
              </div>
            )}
          </div>

          {/* Manual controls (when not live) */}
          {!isLiveConnected && (
            <div className="px-2 py-1 border-t border-white/10 flex items-center justify-between">
              <button 
                onClick={() => setIsManualRunning(!isManualRunning)}
                className={`text-xs px-2 py-0.5 rounded ${isManualRunning ? 'bg-red-500/30 text-red-400' : 'bg-green-500/30 text-green-400'}`}
              >
                {isManualRunning ? '⏸' : '▶'}
              </button>
              <div className="flex gap-1">
                <button onClick={() => setManualCS(prev => prev + 1)} className="text-green-400 text-xs">+1</button>
                <button onClick={() => setManualCS(prev => prev + 6)} className="text-cyan-400 text-xs">+6</button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  // ==========================================
  // FULL MODE
  // ==========================================
  return (
    <div className="p-1 font-body" style={{ opacity }}>
      <div className="bg-black/90 backdrop-blur-md rounded-lg border border-white/20 overflow-hidden shadow-xl w-60">
        {/* Header */}
        <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${isLiveConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`} />
            <span className="text-[10px] text-white/50 uppercase">{isLiveConnected ? 'Live' : 'Manual'}</span>
            <span className="text-cyan-400 font-mono font-bold">{formatGameTime(gameTime)}</span>
            {!isLiveConnected && (
              <button
                onClick={() => setIsManualRunning(!isManualRunning)}
                className={`w-5 h-5 rounded flex items-center justify-center text-xs ${
                  isManualRunning ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400'
                }`}
              >
                {isManualRunning ? '▶' : '⏸'}
              </button>
            )}
          </div>
          <div className="flex items-center gap-1">
            <input
              type="range"
              min="0.4"
              max="1"
              step="0.05"
              value={opacity}
              onChange={(e) => setOpacity(parseFloat(e.target.value))}
              className="w-10 h-1 accent-cyan-500"
              title="Opaklık"
            />
            <button onClick={() => setViewMode('compact')} className="text-white/50 hover:text-white text-sm ml-1">▲</button>
          </div>
        </div>

        {/* Live Player Stats */}
        {isLiveConnected && myPlayer && (
          <div className="px-3 py-2 bg-white/5 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={riotApi.getChampionSquareUrl(myPlayer.championName)}
                  alt={myPlayer.championName}
                  className="w-8 h-8 rounded border border-cyan-500/50"
                  onError={(e) => { e.currentTarget.style.display = 'none' }}
                />
                <div>
                  <div className="text-sm font-bold text-white">{myPlayer.championName}</div>
                  <div className="text-[10px] text-white/50">Lvl {myPlayer.level}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold">
                  <span className="text-green-400">{myPlayer.scores.kills}</span>
                  <span className="text-white/30">/</span>
                  <span className="text-red-400">{myPlayer.scores.deaths}</span>
                  <span className="text-white/30">/</span>
                  <span className="text-blue-400">{myPlayer.scores.assists}</span>
                </div>
                <div className="text-[10px] text-white/50">{kda} KDA</div>
              </div>
            </div>
            
            {/* Gold */}
            {activePlayer && (
              <div className="flex items-center justify-between mt-1 text-xs">
                <span className="text-yellow-400">💰 {activePlayer.currentGold.toLocaleString()}</span>
                <span className="text-white/40">{myPlayer.items.length} items</span>
              </div>
            )}
          </div>
        )}

        {/* CS Tracker */}
        <div className="px-3 py-2 border-b border-white/10">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {!isLiveConnected && (
                <>
                  <button 
                    onClick={() => setManualCS(prev => Math.max(0, prev - 1))} 
                    className="w-5 h-5 bg-red-500/30 text-red-400 rounded flex items-center justify-center hover:bg-red-500/50 text-sm"
                  >−</button>
                </>
              )}
              <div>
                <span className="text-2xl font-bold text-white">{currentCS}</span>
                <span className="text-xs text-white/40 ml-1">CS</span>
              </div>
              {!isLiveConnected && (
                <button 
                  onClick={() => setManualCS(prev => prev + 1)} 
                  className="w-5 h-5 bg-green-500/30 text-green-400 rounded flex items-center justify-center hover:bg-green-500/50 text-sm"
                >+</button>
              )}
            </div>
            
            <div className="text-right">
              <div className={`text-sm font-bold ${csDiff >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {csDiff >= 0 ? '+' : ''}{csDiff}
              </div>
              <div className="text-[10px] text-white/40">{csPerMin}/min</div>
            </div>
          </div>
          
          {/* Quick add (manual mode only) */}
          {!isLiveConnected && (
            <div className="flex gap-1 mt-1">
              <button onClick={() => setManualCS(prev => prev + 6)} className="flex-1 py-0.5 text-[10px] bg-white/10 hover:bg-white/20 rounded text-white/70">+6 wave</button>
              <button onClick={() => setManualCS(prev => prev + 4)} className="flex-1 py-0.5 text-[10px] bg-white/10 hover:bg-white/20 rounded text-white/70">+4 camp</button>
              <button onClick={() => setManualCS(0)} className="px-2 py-0.5 text-[10px] bg-red-500/20 hover:bg-red-500/30 rounded text-red-400">↺</button>
            </div>
          )}
        </div>

        {/* Major Objectives */}
        <div className="p-2">
          <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Objectives</span>
            {isLiveConnected && liveState && (
              <span className="text-cyan-400">
                🐉{liveState.objectives.dragonKills} 👑{liveState.objectives.baronKills}
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-1">
            {(['dragon', 'baron', 'herald'] as CampId[]).map(id => {
              const camp = JUNGLE_CAMPS[id]
              const remaining = getRemaining(id)
              const isActive = remaining !== null
              const isWarning = remaining !== null && remaining < 60
              const isCritical = remaining !== null && remaining < 30
              
              return (
                <button
                  key={id}
                  onClick={() => isActive ? clearTimer(id) : startTimer(id)}
                  className={`
                    p-2 rounded-lg text-center transition-all
                    ${isCritical ? 'bg-red-500/60 border border-red-400/60 animate-pulse' : 
                      isWarning ? 'bg-orange-500/50 border border-orange-400/50' : 
                      isActive ? 'bg-cyan-500/40 border border-cyan-400/40' : 
                      'bg-white/5 hover:bg-white/10 border border-white/10'}
                  `}
                >
                  <span className="text-lg">{camp.icon}</span>
                  {isActive ? (
                    <div className={`text-xs font-mono font-bold mt-0.5 ${
                      isCritical ? 'text-red-300' : isWarning ? 'text-orange-300' : 'text-cyan-300'
                    }`}>
                      {formatGameTime(remaining!)}
                    </div>
                  ) : (
                    <div className="text-[9px] text-white/30 mt-0.5">{camp.name}</div>
                  )}
                </button>
              )
            })}
          </div>
        </div>

        {/* Jungle Camps */}
        <div className="px-2 pb-2">
          <div className="grid grid-cols-5 gap-1">
            {(['blue', 'red', 'gromp', 'wolves', 'raptors'] as CampId[]).map(id => {
              const camp = JUNGLE_CAMPS[id]
              const remaining = getRemaining(id)
              const isActive = remaining !== null
              
              return (
                <button
                  key={id}
                  onClick={() => isActive ? clearTimer(id) : startTimer(id)}
                  className={`p-1 rounded text-center transition-all ${isActive ? 'bg-cyan-500/40' : 'bg-white/5 hover:bg-white/10'}`}
                  title={camp.name}
                >
                  <span className="text-sm">{camp.icon}</span>
                  {isActive && <div className="text-[9px] font-mono text-cyan-300">{formatGameTime(remaining!)}</div>}
                </button>
              )
            })}
          </div>
        </div>

        {/* Recent Events (Live only) */}
        {isLiveConnected && liveState && liveState.recentEvents.length > 0 && (
          <div className="px-2 pb-2 border-t border-white/10 pt-2">
            <div className="text-[10px] text-white/40 uppercase tracking-wider mb-1">Recent</div>
            <div className="space-y-1 max-h-16 overflow-y-auto">
              {liveState.recentEvents.slice(-3).map(event => (
                <div key={event.EventID} className="text-[10px] text-white/60 truncate">
                  {formatEventMessage(event)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Keyboard hints */}
        <div className="px-2 py-1 bg-black/50 border-t border-white/10">
          <div className="text-[8px] text-white/30 text-center">
            D=Dragon B=Baron H=Herald {!isLiveConnected && '| +=CS 6=Wave'}
          </div>
        </div>
      </div>
    </div>
  )
}

// Event message formatter
function formatEventMessage(event: any): string {
  switch (event.EventName) {
    case 'ChampionKill':
      return `💀 ${event.KillerName} killed ${event.VictimName}`
    case 'DragonKill':
      return `🐉 ${event.KillerName} slayed ${event.DragonType || 'Dragon'}`
    case 'BaronKill':
      return `👑 ${event.KillerName} slayed Baron`
    case 'HeraldKill':
      return `👁️ ${event.KillerName} slayed Herald`
    case 'TurretKilled':
      return `🏰 Turret destroyed`
    case 'InhibKilled':
      return `💎 Inhibitor destroyed`
    default:
      return event.EventName
  }
}
