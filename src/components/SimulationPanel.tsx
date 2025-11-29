/**
 * SIMULATION PANEL
 * 
 * Şampiyon seçimi simülasyonu - tüm aşamaları test et:
 * - Planning: Takım oluşturma
 * - Banning: Ban önerileri
 * - Picking: Pick önerileri
 * - Finalization: Build önerileri
 */

import React, { useState, useEffect } from 'react'
import { useDraftStore } from '../stores/draftStore'
import { CHAMPION_KNOWLEDGE_BASE, getChampionById } from '../data/ChampionKnowledgeBase'
import { riotApi } from '../services/RiotApiService'
import { cn } from '../lib/utils'
import { Role, DraftPhase, PickedChampion } from '../types'

const ROLES: Role[] = ['Top', 'Jungle', 'Mid', 'ADC', 'Support']

// Popüler şampiyonlar (simülasyon için)
const POPULAR_CHAMPIONS = {
  Top: [266, 122, 86, 58, 92, 240, 39, 24, 150, 516], // Aatrox, Darius, Garen, Renekton, Riven, Kled, Irelia, Jax, Gnar, Ornn
  Jungle: [64, 141, 121, 104, 254, 113, 154, 79, 60, 107], // Lee Sin, Kayn, Kha'Zix, Graves, Vi, Sejuani, Zac, Gragas, Elise, Rengar
  Mid: [238, 157, 103, 134, 7, 55, 91, 245, 61, 99], // Zed, Yasuo, Ahri, Syndra, LeBlanc, Katarina, Talon, Ekko, Orianna, Lux
  ADC: [67, 222, 51, 236, 81, 145, 119, 21, 18, 29], // Vayne, Jinx, Caitlyn, Lucian, Ezreal, Kai'Sa, Draven, MF, Tristana, Twitch
  Support: [412, 111, 89, 12, 25, 43, 117, 37, 53, 201] // Thresh, Nautilus, Leona, Alistar, Morgana, Karma, Lulu, Sona, Blitzcrank, Braum
}

interface SimulationState {
  phase: DraftPhase
  timer: number
  currentTurn: 'blue' | 'red'
  blueTeam: { role: Role; championId: number; locked: boolean }[]
  redTeam: { role: Role; championId: number; locked: boolean }[]
  blueBans: number[]
  redBans: number[]
  userTeam: 'blue' | 'red'
  userRole: Role
  userPickIntent: number | null
}

const INITIAL_STATE: SimulationState = {
  phase: 'planning',
  timer: 30,
  currentTurn: 'blue',
  blueTeam: ROLES.map(role => ({ role, championId: 0, locked: false })),
  redTeam: ROLES.map(role => ({ role, championId: 0, locked: false })),
  blueBans: [],
  redBans: [],
  userTeam: 'blue',
  userRole: 'Mid',
  userPickIntent: null
}

export function SimulationPanel() {
  const [sim, setSim] = useState<SimulationState>(INITIAL_STATE)
  const [isRunning, setIsRunning] = useState(false)
  const [speed, setSpeed] = useState(1) // 1x, 2x, 4x
  const [searchQuery, setSearchQuery] = useState('')
  const [showChampionPicker, setShowChampionPicker] = useState(false)
  const [pickerTarget, setPickerTarget] = useState<{ team: 'blue' | 'red'; role: Role } | null>(null)

  const store = useDraftStore()

  // Simülasyonu store'a senkronize et
  useEffect(() => {
    const myTeam = sim.userTeam === 'blue' ? sim.blueTeam : sim.redTeam
    const theirTeam = sim.userTeam === 'blue' ? sim.redTeam : sim.blueTeam
    
    const myTeamPicked: PickedChampion[] = myTeam.map((p, i) => ({
      cellId: i,
      championId: p.championId,
      assignedPosition: p.role,
      isLocalPlayer: p.role === sim.userRole
    }))

    const theirTeamPicked: PickedChampion[] = theirTeam.map((p, i) => ({
      cellId: i + 5,
      championId: p.championId,
      assignedPosition: p.role,
      isLocalPlayer: false
    }))

    store.setChampSelectData({
      phase: sim.phase,
      myTeam: myTeamPicked,
      theirTeam: theirTeamPicked,
      userRole: sim.userRole,
      localPlayerCellId: myTeam.findIndex(p => p.role === sim.userRole),
      bans: {
        myTeamBans: sim.userTeam === 'blue' ? sim.blueBans : sim.redBans,
        theirTeamBans: sim.userTeam === 'blue' ? sim.redBans : sim.blueBans
      },
      userPickIntent: sim.userPickIntent ? {
        championId: sim.userPickIntent,
        championName: getChampionById(sim.userPickIntent)?.name || '',
        source: 'declared'
      } : null,
      teamPickIntents: []
    })
  }, [sim])

  // Timer countdown
  useEffect(() => {
    if (!isRunning || sim.phase === 'none' || sim.phase === 'finalization') return

    const interval = setInterval(() => {
      setSim(prev => {
        if (prev.timer <= 0) {
          // Zaman doldu, sonraki aşamaya geç
          return handlePhaseTransition(prev)
        }
        return { ...prev, timer: prev.timer - 1 }
      })
    }, 1000 / speed)

    return () => clearInterval(interval)
  }, [isRunning, speed, sim.phase])

  // Aşama geçişi
  const handlePhaseTransition = (state: SimulationState): SimulationState => {
    switch (state.phase) {
      case 'planning':
        return { ...state, phase: 'banning', timer: 30 }
      case 'banning':
        if (state.blueBans.length < 5 || state.redBans.length < 5) {
          // Otomatik ban ekle
          const newBlueBans = [...state.blueBans]
          const newRedBans = [...state.redBans]
          while (newBlueBans.length < 5) {
            const randomChamp = getRandomChampion([...newBlueBans, ...newRedBans])
            newBlueBans.push(randomChamp)
          }
          while (newRedBans.length < 5) {
            const randomChamp = getRandomChampion([...newBlueBans, ...newRedBans])
            newRedBans.push(randomChamp)
          }
          return { ...state, blueBans: newBlueBans, redBans: newRedBans, phase: 'picking', timer: 30 }
        }
        return { ...state, phase: 'picking', timer: 30 }
      case 'picking':
        // Tüm pickler tamamlandı mı?
        const allPicked = [...state.blueTeam, ...state.redTeam].every(p => p.championId > 0 && p.locked)
        if (allPicked) {
          return { ...state, phase: 'finalization', timer: 30 }
        }
        // Otomatik pick
        return autoPickNext(state)
      default:
        return state
    }
  }

  // Otomatik pick
  const autoPickNext = (state: SimulationState): SimulationState => {
    const team = state.currentTurn === 'blue' ? 'blueTeam' : 'redTeam'
    const teamData = state[team]
    const unpickedIndex = teamData.findIndex(p => !p.locked)
    
    if (unpickedIndex === -1) {
      // Bu takımda hepsi seçildi, diğer takıma geç
      const otherTeam = state.currentTurn === 'blue' ? 'red' : 'blue'
      const otherTeamData = state[`${otherTeam}Team` as 'blueTeam' | 'redTeam']
      const otherUnpicked = otherTeamData.findIndex(p => !p.locked)
      
      if (otherUnpicked === -1) {
        // Herkes seçti
        return { ...state, phase: 'finalization', timer: 30 }
      }
      return { ...state, currentTurn: otherTeam, timer: 30 }
    }

    // Kullanıcının sırası mı?
    const isUserTurn = state.userTeam === state.currentTurn && 
                       teamData[unpickedIndex].role === state.userRole
    
    if (isUserTurn) {
      // Kullanıcı seçmeli
      return { ...state, timer: 30 }
    }

    // Bot pick
    const role = teamData[unpickedIndex].role
    const bannedAndPicked = [...state.blueBans, ...state.redBans, 
      ...state.blueTeam.map(p => p.championId),
      ...state.redTeam.map(p => p.championId)
    ].filter(id => id > 0)
    
    const available = POPULAR_CHAMPIONS[role].filter(id => !bannedAndPicked.includes(id))
    const pick = available[Math.floor(Math.random() * available.length)] || 
                 getRandomChampion(bannedAndPicked)

    const newTeam = [...teamData]
    newTeam[unpickedIndex] = { ...newTeam[unpickedIndex], championId: pick, locked: true }

    return {
      ...state,
      [team]: newTeam,
      currentTurn: state.currentTurn === 'blue' ? 'red' : 'blue',
      timer: 30
    }
  }

  // Rastgele şampiyon
  const getRandomChampion = (exclude: number[]): number => {
    const available = CHAMPION_KNOWLEDGE_BASE.filter(c => !exclude.includes(c.id))
    return available[Math.floor(Math.random() * available.length)]?.id || 1
  }

  // Kullanıcı şampiyon seçimi
  const handleUserPick = (championId: number, lock: boolean = false) => {
    const team = sim.userTeam === 'blue' ? 'blueTeam' : 'redTeam'
    const teamData = sim[team]
    const userIndex = teamData.findIndex(p => p.role === sim.userRole)
    
    if (userIndex === -1) return

    const newTeam = [...teamData]
    newTeam[userIndex] = { 
      ...newTeam[userIndex], 
      championId, 
      locked: lock || newTeam[userIndex].locked 
    }

    setSim(prev => ({
      ...prev,
      [team]: newTeam,
      userPickIntent: lock ? null : championId,
      currentTurn: lock ? (prev.currentTurn === 'blue' ? 'red' : 'blue') : prev.currentTurn
    }))
  }

  // Kullanıcı ban
  const handleUserBan = (championId: number) => {
    const banKey = sim.userTeam === 'blue' ? 'blueBans' : 'redBans'
    setSim(prev => ({
      ...prev,
      [banKey]: [...prev[banKey], championId]
    }))
  }

  // Manuel aşama değiştir
  const setPhase = (phase: DraftPhase) => {
    setSim(prev => ({ ...prev, phase, timer: 30 }))
  }

  // Reset
  const resetSimulation = () => {
    setSim(INITIAL_STATE)
    setIsRunning(false)
  }

  // Filtrelenmiş şampiyonlar
  const filteredChampions = CHAMPION_KNOWLEDGE_BASE.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const bannedAndPicked = [...sim.blueBans, ...sim.redBans,
    ...sim.blueTeam.map(p => p.championId),
    ...sim.redTeam.map(p => p.championId)
  ].filter(id => id > 0)

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="h-14 border-b border-border/50 px-6 flex items-center justify-between shrink-0 bg-surface/50">
        <div className="flex items-center gap-4">
          <h2 className="font-display font-bold text-white flex items-center gap-2">
            <TestIcon />
            Simulation Mode
          </h2>
          <span className={cn(
            "px-2 py-0.5 rounded text-xs font-medium",
            sim.phase === 'banning' ? "bg-defeat/20 text-defeat" :
            sim.phase === 'picking' ? "bg-primary/20 text-primary" :
            sim.phase === 'finalization' ? "bg-emerald-500/20 text-emerald-400" :
            "bg-zinc-700 text-zinc-300"
          )}>
            {sim.phase.toUpperCase()}
          </span>
          <span className="text-zinc-400 text-sm">
            Timer: {sim.timer}s
          </span>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Speed Control */}
          <div className="flex items-center gap-1 bg-surface rounded-lg p-1">
            {[1, 2, 4].map(s => (
              <button
                key={s}
                onClick={() => setSpeed(s)}
                className={cn(
                  "px-2 py-1 rounded text-xs font-medium transition-colors",
                  speed === s ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
                )}
              >
                {s}x
              </button>
            ))}
          </div>

          {/* Play/Pause */}
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
              isRunning 
                ? "bg-amber-500/20 text-amber-400 hover:bg-amber-500/30" 
                : "bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30"
            )}
          >
            {isRunning ? '⏸ Pause' : '▶ Play'}
          </button>

          {/* Reset */}
          <button
            onClick={resetSimulation}
            className="px-4 py-2 rounded-lg text-sm font-medium bg-zinc-700 text-white hover:bg-zinc-600 transition-colors"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left: Control Panel */}
        <div className="w-72 border-r border-border/50 p-4 space-y-4 overflow-y-auto bg-surface/30">
          {/* Phase Selector */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Phase</label>
            <div className="grid grid-cols-2 gap-2">
              {(['planning', 'banning', 'picking', 'finalization'] as DraftPhase[]).map(phase => (
                <button
                  key={phase}
                  onClick={() => setPhase(phase)}
                  className={cn(
                    "px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize",
                    sim.phase === phase 
                      ? "bg-primary text-white" 
                      : "bg-surface text-zinc-400 hover:text-white border border-white/10"
                  )}
                >
                  {phase}
                </button>
              ))}
            </div>
          </div>

          {/* User Settings */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Your Team</label>
            <div className="flex gap-2">
              {(['blue', 'red'] as const).map(team => (
                <button
                  key={team}
                  onClick={() => setSim(prev => ({ ...prev, userTeam: team }))}
                  className={cn(
                    "flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors capitalize",
                    sim.userTeam === team 
                      ? team === 'blue' ? "bg-blue-500 text-white" : "bg-red-500 text-white"
                      : "bg-surface text-zinc-400 hover:text-white border border-white/10"
                  )}
                >
                  {team}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Your Role</label>
            <div className="grid grid-cols-5 gap-1">
              {ROLES.map(role => (
                <button
                  key={role}
                  onClick={() => setSim(prev => ({ ...prev, userRole: role }))}
                  className={cn(
                    "px-2 py-2 rounded text-xs font-medium transition-colors",
                    sim.userRole === role 
                      ? "bg-primary text-white" 
                      : "bg-surface text-zinc-400 hover:text-white border border-white/10"
                  )}
                  title={role}
                >
                  {role.substring(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Quick Actions</label>
            <div className="space-y-2">
              <button
                onClick={() => {
                  // Fill bans
                  const newBlueBans: number[] = []
                  const newRedBans: number[] = []
                  while (newBlueBans.length < 5) {
                    newBlueBans.push(getRandomChampion([...newBlueBans, ...newRedBans]))
                  }
                  while (newRedBans.length < 5) {
                    newRedBans.push(getRandomChampion([...newBlueBans, ...newRedBans]))
                  }
                  setSim(prev => ({ ...prev, blueBans: newBlueBans, redBans: newRedBans }))
                }}
                className="w-full px-3 py-2 rounded-lg text-xs font-medium bg-surface text-zinc-300 hover:bg-white/10 border border-white/10 transition-colors"
              >
                🎲 Fill Random Bans
              </button>
              <button
                onClick={() => {
                  // Fill enemy picks
                  const enemyTeam = sim.userTeam === 'blue' ? 'redTeam' : 'blueTeam'
                  const newTeam = sim[enemyTeam].map(p => {
                    if (p.championId > 0) return p
                    const available = POPULAR_CHAMPIONS[p.role].filter(id => !bannedAndPicked.includes(id))
                    const pick = available[Math.floor(Math.random() * available.length)] || getRandomChampion(bannedAndPicked)
                    return { ...p, championId: pick, locked: true }
                  })
                  setSim(prev => ({ ...prev, [enemyTeam]: newTeam }))
                }}
                className="w-full px-3 py-2 rounded-lg text-xs font-medium bg-surface text-zinc-300 hover:bg-white/10 border border-white/10 transition-colors"
              >
                🎲 Fill Enemy Picks
              </button>
              <button
                onClick={() => {
                  // Fill ally picks (except user)
                  const myTeam = sim.userTeam === 'blue' ? 'blueTeam' : 'redTeam'
                  const newTeam = sim[myTeam].map(p => {
                    if (p.role === sim.userRole) return p
                    if (p.championId > 0) return p
                    const available = POPULAR_CHAMPIONS[p.role].filter(id => !bannedAndPicked.includes(id))
                    const pick = available[Math.floor(Math.random() * available.length)] || getRandomChampion(bannedAndPicked)
                    return { ...p, championId: pick, locked: true }
                  })
                  setSim(prev => ({ ...prev, [myTeam]: newTeam }))
                }}
                className="w-full px-3 py-2 rounded-lg text-xs font-medium bg-surface text-zinc-300 hover:bg-white/10 border border-white/10 transition-colors"
              >
                🎲 Fill Ally Picks
              </button>
            </div>
          </div>

          {/* Bans Display */}
          <div>
            <label className="text-xs text-zinc-500 uppercase tracking-wider block mb-2">Bans</label>
            <div className="space-y-2">
              <div className="flex gap-1">
                <span className="text-xs text-blue-400 w-12">Blue:</span>
                <div className="flex gap-1">
                  {sim.blueBans.map((id, i) => {
                    const champ = getChampionById(id)
                    return (
                      <div key={i} className="w-6 h-6 rounded bg-zinc-800 overflow-hidden">
                        {champ && (
                          <img 
                            src={riotApi.getChampionSquareUrl(champ.name)} 
                            alt={champ.name}
                            className="w-full h-full grayscale"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
              <div className="flex gap-1">
                <span className="text-xs text-red-400 w-12">Red:</span>
                <div className="flex gap-1">
                  {sim.redBans.map((id, i) => {
                    const champ = getChampionById(id)
                    return (
                      <div key={i} className="w-6 h-6 rounded bg-zinc-800 overflow-hidden">
                        {champ && (
                          <img 
                            src={riotApi.getChampionSquareUrl(champ.name)} 
                            alt={champ.name}
                            className="w-full h-full grayscale"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Teams */}
        <div className="flex-1 flex p-6 gap-6 overflow-hidden">
          {/* Blue Team */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-medium text-blue-400 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-400" />
              Blue Team {sim.userTeam === 'blue' && '(You)'}
            </h3>
            <div className="space-y-2">
              {sim.blueTeam.map((player, i) => (
                <TeamSlot
                  key={i}
                  player={player}
                  isUser={sim.userTeam === 'blue' && player.role === sim.userRole}
                  isCurrentTurn={sim.currentTurn === 'blue' && !player.locked && sim.phase === 'picking'}
                  onClick={() => {
                    if (sim.userTeam === 'blue' && player.role === sim.userRole) {
                      setPickerTarget({ team: 'blue', role: player.role })
                      setShowChampionPicker(true)
                    }
                  }}
                />
              ))}
            </div>
          </div>

          {/* VS */}
          <div className="flex items-center">
            <div className="text-4xl font-display font-bold text-zinc-700">VS</div>
          </div>

          {/* Red Team */}
          <div className="flex-1 flex flex-col">
            <h3 className="text-sm font-medium text-red-400 mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-400" />
              Red Team {sim.userTeam === 'red' && '(You)'}
            </h3>
            <div className="space-y-2">
              {sim.redTeam.map((player, i) => (
                <TeamSlot
                  key={i}
                  player={player}
                  isUser={sim.userTeam === 'red' && player.role === sim.userRole}
                  isCurrentTurn={sim.currentTurn === 'red' && !player.locked && sim.phase === 'picking'}
                  onClick={() => {
                    if (sim.userTeam === 'red' && player.role === sim.userRole) {
                      setPickerTarget({ team: 'red', role: player.role })
                      setShowChampionPicker(true)
                    }
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right: Champion Picker (when open) */}
        {showChampionPicker && (
          <div className="w-80 border-l border-border/50 flex flex-col bg-surface/50">
            <div className="p-4 border-b border-border/50 flex items-center justify-between">
              <h3 className="font-medium text-white">
                {sim.phase === 'banning' ? 'Select Ban' : 'Select Champion'}
              </h3>
              <button 
                onClick={() => setShowChampionPicker(false)}
                className="text-zinc-500 hover:text-white"
              >
                ✕
              </button>
            </div>
            
            <div className="p-4">
              <input
                type="text"
                placeholder="Search champion..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 bg-surface border border-white/10 rounded-lg text-white text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              <div className="grid grid-cols-5 gap-2">
                {filteredChampions.slice(0, 50).map(champ => {
                  const isBanned = bannedAndPicked.includes(champ.id)
                  return (
                    <button
                      key={champ.id}
                      disabled={isBanned}
                      onClick={() => {
                        if (sim.phase === 'banning') {
                          handleUserBan(champ.id)
                        } else {
                          handleUserPick(champ.id, false)
                        }
                      }}
                      className={cn(
                        "relative rounded overflow-hidden transition-all",
                        isBanned 
                          ? "opacity-30 cursor-not-allowed" 
                          : "hover:scale-110 hover:ring-2 hover:ring-primary"
                      )}
                    >
                      <img
                        src={riotApi.getChampionSquareUrl(champ.name)}
                        alt={champ.name}
                        className="w-full aspect-square"
                      />
                    </button>
                  )
                })}
              </div>
            </div>

            {sim.phase === 'picking' && sim.userPickIntent && (
              <div className="p-4 border-t border-border/50">
                <button
                  onClick={() => handleUserPick(sim.userPickIntent!, true)}
                  className="w-full py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-lg transition-colors"
                >
                  Lock In
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

// Team Slot Component
function TeamSlot({ 
  player, 
  isUser, 
  isCurrentTurn,
  onClick 
}: { 
  player: { role: Role; championId: number; locked: boolean }
  isUser: boolean
  isCurrentTurn: boolean
  onClick: () => void
}) {
  const champ = player.championId > 0 ? getChampionById(player.championId) : null

  return (
    <button
      onClick={onClick}
      disabled={!isUser}
      className={cn(
        "flex items-center gap-3 p-3 rounded-lg border transition-all",
        isUser 
          ? "border-primary/50 bg-primary/10 hover:bg-primary/20 cursor-pointer" 
          : "border-white/10 bg-surface cursor-default",
        isCurrentTurn && "ring-2 ring-amber-500 animate-pulse"
      )}
    >
      <div className={cn(
        "w-12 h-12 rounded-lg overflow-hidden border-2",
        player.locked ? "border-emerald-500" : "border-white/20"
      )}>
        {champ ? (
          <img
            src={riotApi.getChampionSquareUrl(champ.name)}
            alt={champ.name}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-zinc-500 text-xl">
            ?
          </div>
        )}
      </div>
      <div className="flex-1 text-left">
        <div className="text-xs text-zinc-500">{player.role}</div>
        <div className="text-sm font-medium text-white">
          {champ?.name || 'Not Selected'}
        </div>
      </div>
      {player.locked && (
        <div className="text-emerald-400 text-xs">✓</div>
      )}
      {isUser && !player.locked && (
        <div className="text-primary text-xs">YOU</div>
      )}
    </button>
  )
}

// Icons
function TestIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2v2h1v14a4 4 0 0 0 4 4a4 4 0 0 0 4-4V4h1V2H7zm2 2h6v2H9V4zm0 4h6v10c0 1.1-.9 2-2 2s-2-.9-2-2V8z"/>
    </svg>
  )
}


