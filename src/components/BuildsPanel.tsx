/**
 * BUILDS PANEL
 * 
 * Blitz.gg tarzı build öneri paneli.
 * - Runes, Items, Skill Order
 * - Matchup bazlı win rate'ler
 * - Gerçek Data Dragon görselleri
 */

import React, { useState, useMemo, useEffect } from 'react'
import { riotApi } from '../services/RiotApiService'
import { buildDataService, ChampionBuildData, ItemData, RuneInfo } from '../services/BuildDataService'
import { CHAMPION_KNOWLEDGE_BASE } from '../data/ChampionKnowledgeBase'
import { cn } from '../lib/utils'
import { Role, PickedChampion } from '../types'

// ==========================================
// BUILDS PANEL COMPONENT
// ==========================================

interface BuildsPanelProps {
  selectedChampionId: number | null
  userRole: Role | null
  enemyTeam: PickedChampion[]
  onClose?: () => void
}

export function BuildsPanel({ selectedChampionId, userRole, enemyTeam, onClose }: BuildsPanelProps) {
  const [activeTab, setActiveTab] = useState<'suggestions' | 'builds'>('builds')
  const [selectedMatchup, setSelectedMatchup] = useState<number | null>(null)
  const [showMatchupDropdown, setShowMatchupDropdown] = useState(false)
  const [buildData, setBuildData] = useState<ChampionBuildData | null>(null)
  const [loading, setLoading] = useState(false)
  const [selectedRuneSet, setSelectedRuneSet] = useState(0)
  const [selectedSpellSet, setSelectedSpellSet] = useState(0)

  const champion = useMemo(() => {
    if (!selectedChampionId) return null
    return CHAMPION_KNOWLEDGE_BASE.find(c => c.id === selectedChampionId)
  }, [selectedChampionId])

  // Load build data
  useEffect(() => {
    if (!selectedChampionId || !userRole) {
      setBuildData(null)
      return
    }

    const loadBuild = async () => {
      setLoading(true)
      try {
        await buildDataService.initialize()
        const data = await buildDataService.getChampionBuild(selectedChampionId, userRole)
        setBuildData(data)
      } catch (error) {
        console.error('[BuildsPanel] Failed to load build:', error)
      }
      setLoading(false)
    }

    loadBuild()
  }, [selectedChampionId, userRole])

  // Enemy champions in same lane - önce pozisyona göre, sonra role göre algıla
  const laneOpponents = useMemo(() => {
    if (!userRole) return enemyTeam.filter(e => e.championId > 0)
    
    // 1. Önce assignedPosition ile direkt eşleşme ara
    const directMatch = enemyTeam.filter(e => {
      if (!e.championId || e.championId <= 0) return false
      // assignedPosition varsa kullan
      if (e.assignedPosition === userRole) return true
      // ADC-Support lane matchup
      if ((userRole === 'ADC' || userRole === 'Support') && 
          (e.assignedPosition === 'ADC' || e.assignedPosition === 'Support')) {
        return true
      }
      return false
    })
    
    if (directMatch.length > 0) {
      console.log(`[BuildsPanel] Direct lane match found for ${userRole}:`, directMatch.map(d => d.championId))
      return directMatch
    }
    
    // 2. Pozisyon bilgisi yoksa, şampiyon rolüne göre tahmin et
    const laneMap: Record<Role, Role[]> = {
      'Top': ['Top'],
      'Jungle': ['Jungle'],
      'Mid': ['Mid'],
      'ADC': ['ADC', 'Support'],
      'Support': ['ADC', 'Support']
    }
    const targetRoles = laneMap[userRole]
    
    const roleBasedMatch = enemyTeam.filter(e => {
      if (!e.championId || e.championId <= 0) return false
      const enemyChamp = CHAMPION_KNOWLEDGE_BASE.find(c => c.id === e.championId)
      return enemyChamp?.role.some(r => targetRoles.includes(r))
    })
    
    if (roleBasedMatch.length > 0) {
      console.log(`[BuildsPanel] Role-based lane match for ${userRole}:`, roleBasedMatch.map(d => d.championId))
    }
    
    return roleBasedMatch
  }, [userRole, enemyTeam])

  // Auto-detect opponent
  const detectedOpponent = useMemo(() => {
    if (selectedMatchup !== null) return selectedMatchup
    if (laneOpponents.length > 0 && laneOpponents[0].championId) {
      return laneOpponents[0].championId
    }
    return null
  }, [laneOpponents, selectedMatchup])

  const detectedOpponentChamp = useMemo(() => {
    if (!detectedOpponent) return null
    return CHAMPION_KNOWLEDGE_BASE.find(c => c.id === detectedOpponent)
  }, [detectedOpponent])

  // Matchup from build data
  const currentMatchup = useMemo(() => {
    if (!buildData || !detectedOpponent) return null
    return buildData.matchups.find(m => m.enemyId === detectedOpponent) || 
           buildData.matchups[0] // Fallback to first matchup
  }, [buildData, detectedOpponent])

  if (!champion) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-500 p-8">
        <div className="text-center">
          <GamepadIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>Select a champion to see builds</p>
        </div>
      </div>
    )
  }

  const formattedName = riotApi.formatChampionName(champion.name)

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-surface/80 backdrop-blur-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border/50 shrink-0">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <img 
              src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${formattedName}.png`}
              className="w-12 h-12 rounded-xl border border-white/10"
              alt={champion.name}
            />
            <div>
              <h3 className="font-display font-medium text-white text-lg">{champion.name}</h3>
              <p className="text-xs text-zinc-500">Build Patch 14.23</p>
            </div>
          </div>
          {onClose && (
            <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
              <CloseIcon />
            </button>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 p-1 bg-surface rounded-lg">
          <button 
            onClick={() => setActiveTab('suggestions')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors",
              activeTab === 'suggestions' ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
            )}
          >
            <SparkleIcon />
            Suggestions
          </button>
          <button 
            onClick={() => setActiveTab('builds')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors",
              activeTab === 'builds' ? "bg-primary text-white" : "text-zinc-400 hover:text-white"
            )}
          >
            <SwordIcon />
            Builds
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'builds' && buildData ? (
          <>
            {/* Matchup Selector */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-zinc-500 uppercase tracking-wider">vs Enemy</span>
                  {/* Auto-detected indicator */}
                  {detectedOpponentChamp && laneOpponents.some(o => o.championId === detectedOpponent) && (
                    <span className="flex items-center gap-1 px-1.5 py-0.5 bg-primary/10 border border-primary/20 rounded text-[10px] text-primary">
                      <AutoIcon />
                      Auto-Detected
                    </span>
                  )}
                  {userRole && (
                    <span className="text-[10px] text-zinc-500">({userRole})</span>
                  )}
                </div>
                {currentMatchup && (
                  <span className={cn(
                    "text-xs font-bold px-2 py-0.5 rounded",
                    currentMatchup.winRate >= 52 ? "bg-emerald-500/20 text-emerald-400" :
                    currentMatchup.winRate >= 48 ? "bg-amber-500/20 text-amber-400" : "bg-red-500/20 text-red-400"
                  )}>
                    {currentMatchup.winRate.toFixed(1)}% WR
                  </span>
                )}
              </div>
              
              <button 
                onClick={() => setShowMatchupDropdown(!showMatchupDropdown)}
                className="w-full flex items-center justify-between p-3 bg-surface border border-white/10 rounded-lg hover:border-white/20 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {detectedOpponentChamp ? (
                    <>
                      <img 
                        src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${riotApi.formatChampionName(detectedOpponentChamp.name)}.png`}
                        className="w-8 h-8 rounded"
                        alt={detectedOpponentChamp.name}
                      />
                      <span className="text-white font-medium">{detectedOpponentChamp.name}</span>
                      {currentMatchup && (
                        <span className={cn(
                          "text-[10px] px-1.5 py-0.5 rounded font-medium",
                          currentMatchup.difficulty === 'Easy' ? "bg-emerald-500/20 text-emerald-400" :
                          currentMatchup.difficulty === 'Medium' ? "bg-amber-500/20 text-amber-400" :
                          currentMatchup.difficulty === 'Hard' ? "bg-orange-500/20 text-orange-400" :
                          "bg-red-500/20 text-red-400"
                        )}>
                          {currentMatchup.difficulty}
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="text-zinc-500">Select opponent</span>
                  )}
                </div>
                <ChevronIcon className={showMatchupDropdown ? "rotate-180" : ""} />
              </button>

              {/* Dropdown */}
              {showMatchupDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-surface border border-white/10 rounded-lg shadow-xl z-50 max-h-60 overflow-y-auto">
                  {/* From enemy team */}
                  {enemyTeam.filter(e => e.championId).map(enemy => {
                    const enemyChamp = CHAMPION_KNOWLEDGE_BASE.find(c => c.id === enemy.championId)
                    if (!enemyChamp) return null
                    const matchup = buildData.matchups.find(m => m.enemyId === enemy.championId)
                    const isSelected = selectedMatchup === enemy.championId
                    
                    return (
                      <button
                        key={enemy.championId}
                        onClick={() => {
                          setSelectedMatchup(enemy.championId)
                          setShowMatchupDropdown(false)
                        }}
                        className={cn(
                          "w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0",
                          isSelected && "bg-primary/10"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <img 
                            src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${riotApi.formatChampionName(enemyChamp.name)}.png`}
                            className="w-8 h-8 rounded"
                            alt={enemyChamp.name}
                          />
                          <div className="text-left">
                            <span className="text-white block">{enemyChamp.name}</span>
                            {matchup && (
                              <span className="text-[10px] text-zinc-500">{matchup.games.toLocaleString()} Games</span>
                            )}
                          </div>
                        </div>
                        {isSelected && <CheckIcon />}
                      </button>
                    )
                  })}
                  
                  {/* From matchup data if enemy team is empty */}
                  {enemyTeam.filter(e => e.championId).length === 0 && buildData.matchups.map(matchup => (
                    <button
                      key={matchup.enemyId}
                      onClick={() => {
                        setSelectedMatchup(matchup.enemyId)
                        setShowMatchupDropdown(false)
                      }}
                      className="w-full flex items-center justify-between p-3 hover:bg-white/5 transition-colors border-b border-white/5 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        <img 
                          src={`https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${riotApi.formatChampionName(matchup.enemyName)}.png`}
                          className="w-8 h-8 rounded"
                          alt={matchup.enemyName}
                        />
                        <div className="text-left">
                          <span className="text-white block">{matchup.enemyName}</span>
                          <span className="text-[10px] text-zinc-500">{matchup.games.toLocaleString()} Games</span>
                        </div>
                      </div>
                      <span className={cn(
                        "text-xs font-medium",
                        matchup.winRate >= 52 ? "text-emerald-400" : matchup.winRate >= 48 ? "text-amber-400" : "text-red-400"
                      )}>
                        {matchup.winRate.toFixed(1)}%
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Runes Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  Runes <CheckmarkBadge />
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {buildData.runes.slice(0, 3).map((runeSet, i) => {
                  const primaryRune = buildDataService.getRuneById(runeSet.primary[0])
                  const isSelected = selectedRuneSet === i
                  
                  return (
                    <button 
                      key={i}
                      onClick={() => setSelectedRuneSet(i)}
                      className={cn(
                        "p-3 rounded-lg border text-center transition-all",
                        isSelected 
                          ? "bg-primary/10 border-primary/30 scale-105" 
                          : "bg-surface border-white/10 hover:border-white/20"
                      )}
                    >
                      <div className="w-10 h-10 mx-auto mb-2 rounded-full overflow-hidden bg-zinc-800">
                        {primaryRune ? (
                          <img src={primaryRune.icon} alt={primaryRune.name} className="w-full h-full" />
                        ) : (
                          <RuneIcon />
                        )}
                      </div>
                      <div className={cn(
                        "text-sm font-bold",
                        runeSet.winRate >= 55 ? "text-emerald-400" : 
                        runeSet.winRate >= 50 ? "text-white" : "text-amber-400"
                      )}>
                        {runeSet.winRate.toFixed(0)}%
                      </div>
                      <div className="text-[10px] text-zinc-500">{runeSet.games.toLocaleString()} Games</div>
                    </button>
                  )
                })}
              </div>
              
              {/* Rune Detail */}
              {buildData.runes[selectedRuneSet] && (
                <div className="mt-3 p-3 bg-surface/50 rounded-lg border border-white/5">
                  <div className="flex gap-2 justify-center">
                    {buildData.runes[selectedRuneSet].primary.map((runeId, i) => {
                      const rune = buildDataService.getRuneById(runeId)
                      return (
                        <div 
                          key={i} 
                          className={cn(
                            "rounded-full overflow-hidden border-2",
                            i === 0 ? "w-10 h-10 border-amber-500/50" : "w-8 h-8 border-white/10"
                          )}
                          title={rune?.name}
                        >
                          {rune && <img src={rune.icon} alt={rune.name} className="w-full h-full" />}
                        </div>
                      )
                    })}
                    <div className="w-px bg-white/10 mx-2" />
                    {buildData.runes[selectedRuneSet].secondary.map((runeId, i) => {
                      const rune = buildDataService.getRuneById(runeId)
                      return (
                        <div 
                          key={i} 
                          className="w-7 h-7 rounded-full overflow-hidden border border-white/10"
                          title={rune?.name}
                        >
                          {rune && <img src={rune.icon} alt={rune.name} className="w-full h-full" />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Summoner Spells */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  Summoner Spells
                </span>
              </div>
              <div className="space-y-2">
                {buildData.summonerSpells.slice(0, 2).map((spellSet, i) => {
                  const spell1 = buildDataService.getSpellById(`Summoner${spellSet.spell1}`)
                  const spell2 = buildDataService.getSpellById(`Summoner${spellSet.spell2}`)
                  const isSelected = selectedSpellSet === i
                  
                  return (
                    <button
                      key={i}
                      onClick={() => setSelectedSpellSet(i)}
                      className={cn(
                        "w-full flex items-center justify-between p-3 rounded-lg border transition-all",
                        isSelected 
                          ? "bg-primary/10 border-primary/30" 
                          : "bg-surface border-white/10 hover:border-white/20"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded overflow-hidden border border-white/10">
                          {spell1 && <img src={spell1.image} alt={spell1.name} className="w-full h-full" />}
                        </div>
                        <div className="w-8 h-8 rounded overflow-hidden border border-white/10">
                          {spell2 && <img src={spell2.image} alt={spell2.name} className="w-full h-full" />}
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={cn(
                          "text-sm font-bold",
                          spellSet.winRate >= 52 ? "text-emerald-400" : "text-white"
                        )}>
                          {spellSet.winRate.toFixed(0)}%
                        </span>
                        <span className="text-[10px] text-zinc-500 ml-2">{spellSet.games.toLocaleString()} Games</span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Apply to Game Button */}
            <div className="p-3 bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 rounded-xl">
              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <span className="text-white font-medium">Apply to Game</span>
                  <p className="text-xs text-zinc-400">Set runes & spells in client</p>
                </div>
                <button
                  onClick={async () => {
                    if (!buildData) return
                    
                    try {
                      // Rün sayfası uygula
                      const runeSet = buildData.runes[selectedRuneSet]
                      if (runeSet) {
                        const result = await window.api.lcu.setRunePage({
                          name: 'DraftBetter',
                          primaryStyleId: runeSet.primaryTree,
                          subStyleId: runeSet.secondaryTree,
                          selectedPerkIds: [...runeSet.primary, ...runeSet.secondary, ...runeSet.stat]
                        })
                        if (result.success) {
                          console.log('[BuildsPanel] Runes applied successfully')
                        }
                      }

                      // Sihirdar büyülerini uygula
                      const spellSet = buildData.summonerSpells[selectedSpellSet]
                      if (spellSet) {
                        const result = await window.api.lcu.setSummonerSpells(spellSet.spell1, spellSet.spell2)
                        if (result.success) {
                          console.log('[BuildsPanel] Summoner spells applied successfully')
                        }
                      }
                    } catch (error) {
                      console.error('[BuildsPanel] Failed to apply:', error)
                    }
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <ApplyIcon />
                  Apply
                </button>
              </div>
            </div>

            {/* Items Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white flex items-center gap-2">
                  Items <CheckmarkBadge />
                </span>
              </div>
              
              <div className="space-y-4">
                {/* Starting Items */}
                <div>
                  <span className="text-xs text-zinc-500 block mb-2">Starting Items</span>
                  <div className="flex gap-2">
                    {buildData.items[0]?.starting.map((itemId, i) => {
                      const item = buildDataService.getItemById(itemId)
                      return (
                        <div 
                          key={i} 
                          className="w-10 h-10 rounded bg-surface border border-white/10 overflow-hidden"
                          title={item?.name}
                        >
                          {item && <img src={item.image} alt={item.name} className="w-full h-full" />}
                        </div>
                      )
                    })}
                  </div>
                </div>

                {/* Core Build */}
                <div>
                  <span className="text-xs text-zinc-500 block mb-2">Core Build Order</span>
                  <div className="flex items-center gap-1 flex-wrap">
                    {buildData.items[0]?.boots.slice(0, 1).map((itemId, i) => {
                      const item = buildDataService.getItemById(itemId)
                      return (
                        <React.Fragment key={`boot-${i}`}>
                          <div 
                            className="w-10 h-10 rounded bg-surface border border-white/10 overflow-hidden"
                            title={item?.name}
                          >
                            {item && <img src={item.image} alt={item.name} className="w-full h-full" />}
                          </div>
                          <ArrowIcon className="text-zinc-600" />
                        </React.Fragment>
                      )
                    })}
                    {buildData.items[0]?.core.map((itemId, i) => {
                      const item = buildDataService.getItemById(itemId)
                      return (
                        <React.Fragment key={i}>
                          <div 
                            className="w-10 h-10 rounded bg-surface border border-amber-500/30 overflow-hidden"
                            title={item?.name}
                          >
                            {item && <img src={item.image} alt={item.name} className="w-full h-full" />}
                          </div>
                          {i < buildData.items[0].core.length - 1 && <ArrowIcon className="text-zinc-600" />}
                        </React.Fragment>
                      )
                    })}
                  </div>
                </div>

                {/* Situational */}
                <div>
                  <span className="text-xs text-zinc-500 block mb-2">Situational</span>
                  <div className="flex gap-2 flex-wrap">
                    {buildData.items[0]?.situational.map((itemId, i) => {
                      const item = buildDataService.getItemById(itemId)
                      return (
                        <div 
                          key={i} 
                          className="w-10 h-10 rounded bg-surface border border-white/10 overflow-hidden"
                          title={item?.name}
                        >
                          {item && <img src={item.image} alt={item.name} className="w-full h-full" />}
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Skill Order */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-white">Skill Max Order</span>
                <div className="flex items-center gap-1 text-xs font-bold">
                  <span className="text-orange-400">Q</span>
                  <span className="text-zinc-600">&gt;</span>
                  <span className="text-cyan-400">W</span>
                  <span className="text-zinc-600">&gt;</span>
                  <span className="text-emerald-400">E</span>
                </div>
              </div>
              <div className="bg-surface/50 rounded-lg p-2 overflow-x-auto">
                <div className="grid grid-cols-18 gap-px text-[9px] min-w-[400px]">
                  {/* Level numbers */}
                  {Array.from({ length: 18 }, (_, i) => (
                    <div key={i} className="text-center py-1 text-zinc-600 font-medium">
                      {i + 1}
                    </div>
                  ))}
                  {/* Skill order from build data */}
                  {buildData.skillOrder.order.map((skill, i) => (
                    <div 
                      key={i} 
                      className={cn(
                        "text-center py-1 font-bold text-[10px]",
                        skill === 'Q' ? "bg-orange-500/20 text-orange-400" :
                        skill === 'W' ? "bg-cyan-500/20 text-cyan-400" :
                        skill === 'E' ? "bg-emerald-500/20 text-emerald-400" :
                        skill === 'R' ? "bg-purple-500/20 text-purple-400" : ""
                      )}
                    >
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Matchup Tips */}
            {currentMatchup && currentMatchup.tips.length > 0 && (
              <div>
                <span className="text-sm font-medium text-white block mb-3">Tips vs {currentMatchup.enemyName}</span>
                <div className="space-y-2">
                  {currentMatchup.tips.map((tip, i) => (
                    <div key={i} className="flex gap-2 text-xs text-zinc-400">
                      <span className="text-primary">•</span>
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        ) : (
          /* Suggestions Tab */
          <div className="text-center py-12">
            <SparkleIcon className="w-12 h-12 mx-auto mb-4 text-primary opacity-50" />
            <p className="text-zinc-500 mb-2">AI-powered suggestions</p>
            <p className="text-xs text-zinc-600">Based on your team comp and enemy picks</p>
          </div>
        )}
      </div>
    </div>
  )
}

// ==========================================
// ICONS
// ==========================================

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
    </svg>
  )
}

function SwordIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 3v7l-9 9l-7-7l9-9h7z"/>
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12"/>
    </svg>
  )
}

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={cn("transition-transform", className)}>
      <path d="M6 9l6 6 6-6"/>
    </svg>
  )
}

function AutoIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  )
}

function ApplyIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2v20M2 12h20"/>
      <path d="M12 5l7 7-7 7"/>
    </svg>
  )
}

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary">
      <path d="M20 6L9 17l-5-5"/>
    </svg>
  )
}

function CheckmarkBadge() {
  return (
    <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-500/20">
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-emerald-400">
        <path d="M20 6L9 17l-5-5"/>
      </svg>
    </span>
  )
}

function RuneIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-amber-500 m-auto">
      <path d="M12 2L3 7v10l9 5l9-5V7l-9-5z"/>
    </svg>
  )
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <path d="M9 18l6-6-6-6"/>
    </svg>
  )
}

function GamepadIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="m10.667 6.134l-.502-.355A4.24 4.24 0 0 0 7.715 5h-.612c-.405 0-.813.025-1.194.16c-2.383.846-4.022 3.935-3.903 10.943c.024 1.412.354 2.972 1.628 3.581A3.2 3.2 0 0 0 5.027 20a2.74 2.74 0 0 0 1.53-.437c.41-.268.77-.616 1.13-.964c.444-.43.888-.86 1.424-1.138a4.1 4.1 0 0 1 1.89-.461H13c.658 0 1.306.158 1.89.46c.536.279.98.709 1.425 1.139c.36.348.72.696 1.128.964c.39.256.895.437 1.531.437a3.2 3.2 0 0 0 1.393-.316c1.274-.609 1.604-2.17 1.628-3.581c.119-7.008-1.52-10.097-3.903-10.942C17.71 5.025 17.3 5 16.897 5h-.612a4.24 4.24 0 0 0-2.45.78l-.502.354a2.31 2.31 0 0 1-2.666 0" opacity=".5"/>
      <path d="M16.75 9a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5m-9.25.25a.75.75 0 0 1 .75.75v.75H9a.75.75 0 0 1 0 1.5h-.75V13a.75.75 0 0 1-1.5 0v-.75H6a.75.75 0 0 1 0-1.5h.75V10a.75.75 0 0 1 .75-.75m11.5 2a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m-3.75.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5m2.25.75a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0"/>
    </svg>
  )
}

export default BuildsPanel
