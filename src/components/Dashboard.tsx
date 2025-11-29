import { useState, useEffect } from 'react'
import { useDraftStore } from '../stores/draftStore'
import { CHAMPION_KNOWLEDGE_BASE } from '../data/ChampionKnowledgeBase'
import { riotApi } from '../services/RiotApiService'
import { cn } from '../lib/utils'
import { Role, PickedChampion, Recommendation } from '../types'
import { ShimmerButton } from './ui/ShimmerButton'
import { BuildsPanel } from './BuildsPanel'

const ROLES: Role[] = ['Top', 'Jungle', 'Mid', 'ADC', 'Support']

const ROLE_ICONS: Record<Role, React.ReactNode> = {
  'Top': <SwordIcon />,
  'Jungle': <TreeIcon />,
  'Mid': <FlashIcon />,
  'ADC': <TargetIcon />,
  'Support': <HeartIcon />
}

export function Dashboard() {
  const { 
    connectionStatus, 
    phase, 
    recommendations, 
    banRecommendations, 
    myTeam, 
    theirTeam, 
    userRole, 
    isDemoMode,
    isPracticeMode,
    userPickIntent,
    setUserRole
  } = useDraftStore()

  const [activeTab, setActiveTab] = useState<'suggestions' | 'builds'>('suggestions')
  const [showBuildsPanel, setShowBuildsPanel] = useState(false)
  
  // Get selected champion (from myTeam local player)
  const localPlayer = myTeam.find(m => m.isLocalPlayer)
  const selectedChampionId = localPlayer?.championId && localPlayer.championId > 0 ? localPlayer.championId : null
  
  // Find champion name for display
  const selectedChampion = selectedChampionId 
    ? CHAMPION_KNOWLEDGE_BASE.find(c => c.id === selectedChampionId) 
    : null

  // Finalization aşamasında otomatik olarak builds sekmesine geç
  useEffect(() => {
    if (phase === 'finalization' && selectedChampionId) {
      setActiveTab('builds')
      console.log('[Dashboard] Auto-switched to builds (finalization phase)')
    }
  }, [phase, selectedChampionId])

  // Show waiting state when not in champion select
  if ((connectionStatus !== 'connected' || phase === 'none') && !isDemoMode) {
    return <WaitingState connectionStatus={connectionStatus} />
  }

  const isBanPhase = phase === 'banning' && !isPracticeMode
  const isFinalization = phase === 'finalization'
  const topRecommendations = isBanPhase ? banRecommendations.slice(0, 3) : recommendations.slice(0, 3)

  return (
    <div className="flex flex-col h-full w-full animate-fade-in">
      {/* Header Status */}
      <div className="h-16 border-b border-border/50 px-8 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-surface/50 rounded-lg border border-white/5">
            <button 
              onClick={() => setActiveTab('suggestions')}
              className={cn(
                "flex items-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === 'suggestions' 
                  ? "bg-surface text-white border-b-2 border-primary" 
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <SparkleIcon />
              Suggestions
            </button>
            <button 
              onClick={() => setActiveTab('builds')}
              className={cn(
                "flex items-center gap-2 py-2 px-4 rounded-md text-sm font-medium transition-colors",
                activeTab === 'builds' 
                  ? "bg-surface text-white border-b-2 border-primary" 
                  : "text-zinc-400 hover:text-white"
              )}
            >
              <BuildIcon />
              Builds
            </button>
          </div>
          
          <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-zinc-800 text-zinc-400 border border-zinc-700/50">
            Patch {riotApi.getCurrentVersion().substring(0, 5)}
          </span>
          
          {/* Selected Champion Indicator */}
          {selectedChampion && (
            <div className="flex items-center gap-2 px-2 py-1 bg-primary/10 border border-primary/20 rounded">
              <img 
                src={riotApi.getChampionSquareUrl(selectedChampion.name)}
                className="w-5 h-5 rounded"
                alt={selectedChampion.name}
              />
              <span className="text-xs font-medium text-primary">{selectedChampion.name}</span>
            </div>
          )}
          {isPracticeMode && (
            <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary border border-primary/20">
              Practice Mode
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {/* Current Phase Indicator */}
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border",
            phase === 'banning' 
              ? "bg-defeat/10 border-defeat/20" 
              : phase === 'picking' 
                ? "bg-primary/10 border-primary/20"
                : phase === 'finalization'
                  ? "bg-emerald-500/10 border-emerald-500/20"
                  : "bg-zinc-800 border-zinc-700"
          )}>
            {phase === 'banning' ? (
              <>
                <BanIcon className="w-3.5 h-3.5 text-defeat" />
                <span className="text-xs font-medium text-defeat">Ban Phase</span>
              </>
            ) : phase === 'picking' ? (
              <>
                <PickIcon className="w-3.5 h-3.5 text-primary" />
                <span className="text-xs font-medium text-primary">Pick Phase</span>
              </>
            ) : phase === 'finalization' ? (
              <>
                <CheckIcon className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-xs font-medium text-emerald-400">Locked In</span>
              </>
            ) : (
              <>
                <ClockIcon className="w-3.5 h-3.5 text-zinc-400" />
                <span className="text-xs font-medium text-zinc-400">Planning</span>
              </>
            )}
          </div>
          
          {/* Connection Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs font-medium text-emerald-400">Connected</span>
          </div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 gap-0 overflow-hidden">
        {/* Left: Allied Team */}
        <TeamPanel team={myTeam} type="ally" />

        {/* Center: Content based on active tab */}
        {activeTab === 'suggestions' ? (
          <div className="col-span-6 lg:col-span-8 flex flex-col p-8 relative">
            {/* Ban Phase: Pick Intent Info */}
            {isBanPhase && (
              <div className="mb-6">
                <div className={cn(
                  "glass-panel p-4 rounded-xl border text-center",
                  userPickIntent 
                    ? "border-primary/30 bg-primary/5" 
                    : "border-zinc-700/50 bg-zinc-800/30"
                )}>
                  {userPickIntent ? (
                    <div className="flex items-center justify-center gap-3">
                      <img 
                        src={riotApi.getChampionSquareUrl(userPickIntent.championName)}
                        className="w-10 h-10 rounded-lg border-2 border-primary/50"
                        alt={userPickIntent.championName}
                      />
                      <div className="text-left">
                        <p className="text-xs text-zinc-400">Oynamak istediğin şampiyon</p>
                        <p className="text-lg font-bold text-primary">{userPickIntent.championName}</p>
                      </div>
                      <div className="h-8 w-px bg-zinc-700 mx-2" />
                      <div className="text-left">
                        <p className="text-xs text-zinc-400">Önerilen banlar</p>
                        <p className="text-sm text-white">{userPickIntent.championName}'ın counter'ları</p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700 flex items-center justify-center">
                        <QuestionIcon className="w-5 h-5 text-zinc-500" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-zinc-400">Şampiyon göster</p>
                        <p className="text-sm text-white">Counter ban önerileri için bir şampiyon seç</p>
                      </div>
                      <div className="h-8 w-px bg-zinc-700 mx-2" />
                      <div className="text-left">
                        <p className="text-xs text-zinc-400">Mevcut öneriler</p>
                        <p className="text-sm text-defeat">Meta OP şampiyonlar</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Role Selector */}
            <div className="flex justify-center mb-6">
              <div className="glass-panel p-1 rounded-full flex gap-1">
                {ROLES.map(role => (
                  <button
                    key={role}
                    onClick={() => setUserRole(role)}
                    className={cn("role-btn", userRole === role && "active")}
                    title={role}
                  >
                    {ROLE_ICONS[role]}
                  </button>
                ))}
              </div>
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 items-center">
              {topRecommendations.length > 0 ? (
                topRecommendations.map((rec, index) => (
                  <ChampionCard 
                    key={rec.championId} 
                    recommendation={rec} 
                    rank={index + 1} 
                    isMain={index === 0}
                    isBan={isBanPhase}
                  />
                ))
              ) : (
                <>
                  <EmptyCard />
                  <EmptyCard isMain />
                  <EmptyCard />
                </>
              )}
            </div>
          </div>
        ) : (
          /* Builds Tab Content */
          <div className="col-span-6 lg:col-span-8 overflow-hidden">
            <BuildsPanel 
              selectedChampionId={selectedChampionId}
              userRole={userRole}
              enemyTeam={theirTeam}
            />
          </div>
        )}

        {/* Right: Enemy Team */}
        <TeamPanel team={theirTeam} type="enemy" />
      </div>
    </div>
  )
}

// Team Panel Component
interface TeamPanelProps {
  team: PickedChampion[]
  type: 'ally' | 'enemy'
}

function TeamPanel({ team, type }: TeamPanelProps) {
  const isAlly = type === 'ally'
  const roleOrder: Role[] = ['Top', 'Jungle', 'Mid', 'ADC', 'Support']
  
  // Create 5 slots
  const slots = roleOrder.map((role, index) => {
    const member = team.find(m => m.cellId === index) || team[index] || null
    return { role, member }
  })

  return (
    <div className={cn(
      "col-span-3 lg:col-span-2 border-border/50 bg-surface/20 flex flex-col",
      isAlly ? "border-r" : "border-l"
    )}>
      <div className={cn(
        "px-5 py-4 border-b border-border/50 flex items-center",
        isAlly ? "justify-between" : "flex-row-reverse justify-between"
      )}>
        {isAlly ? (
          <>
            <span className="text-xs font-medium uppercase tracking-widest text-primary">Blue Team</span>
            <ShieldIcon className="text-primary opacity-50" />
          </>
        ) : (
          <>
            <span className="text-xs font-medium uppercase tracking-widest text-defeat">Red Team</span>
            <SwordIcon className="text-defeat opacity-50" />
          </>
        )}
      </div>
      <div className="flex-1 flex flex-col">
        {slots.map((slot, index) => (
          <TeamSlot 
            key={index}
            member={slot.member}
            role={slot.role}
            isAlly={isAlly}
            isLocalPlayer={isAlly && slot.member?.isLocalPlayer}
          />
        ))}
      </div>
    </div>
  )
}

// Team Slot Component
interface TeamSlotProps {
  member: PickedChampion | null
  role: Role
  isAlly: boolean
  isLocalPlayer?: boolean
}

function TeamSlot({ member, role, isAlly, isLocalPlayer }: TeamSlotProps) {
  const champion = member?.championId 
    ? CHAMPION_KNOWLEDGE_BASE.find(c => c.id === member.championId) 
    : null
  
  const championName = champion?.name
  const formattedName = championName ? riotApi.formatChampionName(championName) : null
  const imageUrl = formattedName 
    ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${formattedName}_0.jpg`
    : null

  const isEmpty = !championName

  return (
    <div className={cn(
      "team-slot group",
      isLocalPlayer && "bg-white/[0.02]"
    )}>
      {isLocalPlayer && (
        <>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-primary/10 to-transparent" />
          <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary" />
        </>
      )}
      
      <div className={cn(
        "h-full flex items-center px-4 gap-4 relative z-10",
        !isAlly && "flex-row-reverse",
        isEmpty && "opacity-50 group-hover:opacity-100 transition-opacity"
      )}>
        {/* Avatar */}
        <div className="relative">
          {imageUrl ? (
            <div className={cn(
              "w-10 h-10 rounded-full border overflow-hidden",
              isLocalPlayer ? "w-12 h-12 border-2 border-primary/30 p-0.5" : isAlly ? "border-zinc-700" : "border-defeat/30"
            )}>
              <img 
                src={imageUrl} 
                className={cn(
                  "w-full h-full rounded-full object-cover",
                  !isLocalPlayer && !isAlly && "",
                  !isLocalPlayer && isAlly && "filter grayscale opacity-60"
                )}
                alt={championName}
              />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-500">
              {ROLE_ICONS[role]}
            </div>
          )}
          {isLocalPlayer && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-surface border border-border rounded-full flex items-center justify-center text-zinc-400">
              <TargetIcon className="w-3 h-3" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className={!isAlly ? "text-right" : ""}>
          {championName ? (
            <>
              <div className={cn(
                "text-sm font-medium",
                isLocalPlayer ? "text-white" : "text-zinc-400"
              )}>
                {isLocalPlayer ? 'You' : championName}
              </div>
              <div className={cn(
                "text-xs mt-0.5",
                isLocalPlayer ? "text-primary" : "text-zinc-600"
              )}>
                {isLocalPlayer ? 'Picking...' : role}
              </div>
            </>
          ) : (
            <div className={cn("flex flex-col gap-1", !isAlly && "items-end")}>
              <div className="h-2 w-16 bg-zinc-800 rounded" />
              <div className="text-[10px] text-zinc-600 font-medium uppercase tracking-wider">{role}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Champion Card Component
interface ChampionCardProps {
  recommendation: Recommendation
  rank: number
  isMain?: boolean
  isBan?: boolean
}

function ChampionCard({ recommendation, rank, isMain, isBan }: ChampionCardProps) {
  const champion = CHAMPION_KNOWLEDGE_BASE.find(c => c.id === recommendation.championId)
  if (!champion) return null

  const formattedName = riotApi.formatChampionName(champion.name)
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${formattedName}_0.jpg`

  const handlePick = async () => {
    try {
      await window.api.lcu.hoverChampion(champion.id)
    } catch (e) {
      console.error('Pick failed:', e)
    }
  }

  const handleLockIn = async () => {
    try {
      await window.api.lcu.lockInChampion(champion.id)
    } catch (e) {
      console.error('Lock in failed:', e)
    }
  }

  const handleBan = async () => {
    try {
      await window.api.lcu.banChampion(champion.id)
    } catch (e) {
      console.error('Ban failed:', e)
    }
  }

  const scoreColor = recommendation.score >= 90 ? 'text-primary' : recommendation.score >= 80 ? 'text-emerald-400' : 'text-zinc-200'

  return (
    <div className={cn(
      "rounded-2xl relative group cursor-pointer transition-transform duration-300",
      isMain ? "h-[460px] card-glow z-10" : "h-[420px] hover:-translate-y-2"
    )}>
      <div className={cn(
        "absolute inset-0 rounded-2xl overflow-hidden border bg-surface",
        isMain ? "border-primary/30 shadow-2xl shadow-primary/5" : "border-white/10"
      )}>
        <img 
          src={imageUrl} 
          className={cn(
            "w-full h-full object-cover transition-all duration-700",
            isMain ? "group-hover:scale-105" : "opacity-60 group-hover:opacity-80"
          )}
          alt={champion.name}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-6">
          <div className="flex justify-between items-end mb-2">
            <h3 className={cn(
              "font-display font-medium text-white tracking-tight",
              isMain ? "text-3xl" : "text-2xl"
            )}>
              {champion.name}
            </h3>
            <div className={cn("font-medium", isMain ? "text-xl" : "text-lg", scoreColor)}>
              {recommendation.score}%
            </div>
          </div>

          {isMain && (
            <div className="flex gap-2 mb-6">
              {champion.archetype.slice(0, 1).map(arch => (
                <span key={arch} className="px-2 py-0.5 rounded text-[10px] bg-primary/20 text-primary border border-primary/20">
                  {arch}
                </span>
              ))}
            </div>
          )}

          {!isMain && recommendation.reasons[0] && (
            <p className="text-xs text-zinc-400 line-clamp-2 mb-4">
              {recommendation.reasons[0].description}
            </p>
          )}

          <div className={cn(
            "flex gap-2",
            isMain ? "grid grid-cols-2" : "opacity-0 group-hover:opacity-100 transition-opacity"
          )}>
            {isBan ? (
              <button 
                onClick={handleBan}
                className={cn(
                  "py-2 bg-defeat/80 text-white text-xs font-semibold uppercase tracking-wide rounded hover:bg-defeat transition-colors",
                  isMain ? "col-span-2 py-3 text-sm font-bold" : "flex-1"
                )}
              >
                Ban
              </button>
            ) : isMain ? (
              <ShimmerButton onClick={handleLockIn} className="col-span-2">
                <span>Lock In</span>
                <CheckIcon />
              </ShimmerButton>
            ) : (
              <button 
                onClick={handlePick}
                className="flex-1 py-2 bg-zinc-800 border border-white/10 text-white text-xs font-semibold uppercase tracking-wide rounded hover:bg-zinc-700"
              >
                Pick
              </button>
            )}
          </div>
        </div>

        {isMain && (
          <div className="absolute top-4 left-4">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-black font-bold text-sm">
              {rank}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Empty Card Placeholder
function EmptyCard({ isMain }: { isMain?: boolean }) {
  return (
    <div className={cn(
      "rounded-2xl relative",
      isMain ? "h-[460px]" : "h-[420px]"
    )}>
      <div className={cn(
        "absolute inset-0 rounded-2xl overflow-hidden border bg-surface/50 flex items-center justify-center",
        isMain ? "border-primary/20" : "border-white/5"
      )}>
        <div className="text-center">
          <div className={cn(
            "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
            isMain ? "bg-primary/10" : "bg-zinc-800"
          )}>
            <GamepadIcon className={isMain ? "text-primary" : "text-zinc-600"} />
          </div>
          <p className="text-zinc-500 text-sm">Waiting for picks...</p>
        </div>
      </div>
    </div>
  )
}

// Waiting State Component
function WaitingState({ connectionStatus }: { connectionStatus: string }) {
  const { enableDemoMode } = useDraftStore()
  
  return (
    <div className="flex flex-col h-full w-full items-center justify-center p-8 animate-fade-in">
      <div className="max-w-md text-center">
        <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-6">
          <GamepadIcon className="w-10 h-10 text-primary" />
        </div>
        
        <h1 className="text-2xl font-display font-medium text-white mb-3">
          Ready to Draft
        </h1>
        <p className="text-zinc-500 mb-8">
          Enter champion select to get AI-powered recommendations. Connect to the League client to begin.
        </p>

        <div className={cn(
          "inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8",
          connectionStatus === 'connected' 
            ? "bg-emerald-500/10 border border-emerald-500/20" 
            : "bg-zinc-800 border border-zinc-700"
        )}>
          <div className={cn(
            "w-2 h-2 rounded-full",
            connectionStatus === 'connected' ? "bg-emerald-400 animate-pulse" : "bg-zinc-500"
          )} />
          <span className={cn(
            "text-xs font-medium",
            connectionStatus === 'connected' ? "text-emerald-400" : "text-zinc-400"
          )}>
            {connectionStatus === 'connected' ? 'Client Connected' : 'Waiting for Client...'}
          </span>
        </div>

        <button
          onClick={enableDemoMode}
          className="px-6 py-3 bg-surface border border-white/10 text-white rounded-xl hover:bg-white/5 transition-colors text-sm font-medium"
        >
          Try Demo Mode
        </button>
      </div>
    </div>
  )
}

// Icon Components
function SwordIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M21 3v7l-9 9l-7-7l9-9h7z"/>
      <path d="m3 21l3.5-3.5M7 14l3 3" stroke="currentColor" strokeWidth="2" opacity=".5"/>
    </svg>
  )
}

function TreeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L5 10h3v4H5l7 8l7-8h-3v-4h3L12 2z" opacity=".7"/>
      <path d="M12 22v-4"/>
    </svg>
  )
}

function FlashIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M13 2L4 14h7v8l9-12h-7V2z"/>
    </svg>
  )
}

function TargetIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <circle cx="12" cy="12" r="10" opacity=".3"/>
      <circle cx="12" cy="12" r="6" opacity=".5"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  )
}

function HeartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2L4 5v6.09c0 5.05 3.41 9.76 8 10.91c4.59-1.15 8-5.86 8-10.91V5l-8-3z"/>
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

function CheckIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
      <path d="M20 6 9 17l-5-5"/>
    </svg>
  )
}

function SparkleIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L9.5 9.5L2 12l7.5 2.5L12 22l2.5-7.5L22 12l-7.5-2.5L12 2z"/>
    </svg>
  )
}

function BuildIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 3v7l-9 9l-7-7l9-9h7z"/>
      <path d="m3 21l3.5-3.5M7 14l3 3" stroke="currentColor" strokeWidth="2" opacity=".5"/>
    </svg>
  )
}

function BanIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M4.93 4.93l14.14 14.14"/>
    </svg>
  )
}

function PickIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M9 12l2 2 4-4"/>
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    </svg>
  )
}

function ClockIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M12 6v6l4 2"/>
    </svg>
  )
}

function QuestionIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="12" cy="12" r="10"/>
      <path d="M9 9a3 3 0 0 1 6 0c0 2-3 3-3 3"/>
      <circle cx="12" cy="17" r="0.5" fill="currentColor"/>
    </svg>
  )
}
