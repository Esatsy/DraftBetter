import { useEffect, useState } from 'react'
import { riotApi } from '../services/RiotApiService'
import { summonerService, SummonerProfile } from '../services/SummonerService'
import { cn } from '../lib/utils'

interface HomePageProps {
  isConnected?: boolean
}

export function HomePage({ isConnected = false }: HomePageProps) {
  const [profile, setProfile] = useState<SummonerProfile | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isConnected) {
      loadProfile()
    } else {
      setProfile(null)
    }
  }, [isConnected])

  const loadProfile = async () => {
    setLoading(true)
    try {
      const data = await summonerService.loadSummonerData()
      setProfile(data)
    } catch (error) {
      console.error('[HomePage] Load failed:', error)
    }
    setLoading(false)
  }

  const soloQ = profile?.ranked.soloQueue
  const recent = profile?.recentPerformance

  return (
    <div className="flex flex-col h-full w-full p-8 overflow-y-auto animate-fade-in">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header with Profile */}
        {profile ? (
          <div className="flex items-center gap-4 mb-8">
            <div className="relative">
              <img 
                src={summonerService.getProfileIconUrl()}
                alt="Profile"
                className="w-16 h-16 rounded-full border-3 border-primary/50"
              />
              <div className="absolute -bottom-1 -right-1 bg-primary px-2 py-0.5 rounded-full text-xs font-bold text-black">
                {profile.summoner.summonerLevel}
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-display font-medium text-white">
                {profile.summoner.gameName}
                <span className="text-zinc-500 text-xl ml-2">#{profile.summoner.tagLine}</span>
              </h1>
              <p className="text-zinc-500">Welcome back. Here is your performance overview.</p>
            </div>
          </div>
        ) : (
          <>
            <h1 className="text-3xl font-display font-medium text-white mb-2">Dashboard</h1>
            <p className="text-zinc-500 mb-8">
              {isConnected 
                ? (loading ? 'Loading your profile...' : 'Welcome back.')
                : 'Connect to League client to see your stats.'}
            </p>
          </>
        )}
        
        {/* Stats Cards - Real data if connected */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <StatsCard
            icon={<CupIcon />}
            label="Ranked Solo"
            value={soloQ ? `${soloQ.tier} ${soloQ.division}` : (isConnected ? 'Unranked' : 'Emerald II')}
            subtext={soloQ 
              ? `${soloQ.leaguePoints} LP · ${soloQ.wins}W ${soloQ.losses}L` 
              : (isConnected ? 'Play ranked to see stats' : '24 LP / Top 4.2%')}
            subtextColor={soloQ ? summonerService.getTierColor(soloQ.tier) : 'text-emerald-400'}
          />
          <StatsCard
            icon={<GraphIcon />}
            label="Win Rate"
            value={recent ? `${recent.winRate}%` : (isConnected ? '-' : '54.2%')}
            subtext={recent ? `Last ${recent.wins + recent.losses} Games` : 'Last 20 Games'}
            subtextColor={recent 
              ? (recent.winRate >= 55 ? 'text-emerald-400' : recent.winRate >= 50 ? 'text-zinc-400' : 'text-red-400')
              : 'text-zinc-400'}
          />
          <StatsCard
            icon={<TargetIcon />}
            label="KDA Ratio"
            value={recent ? recent.avgKDA.toFixed(2) : (isConnected ? '-' : '3.82')}
            subtext={recent 
              ? (recent.avgKDA >= 3 ? 'Excellent' : recent.avgKDA >= 2 ? 'Good' : 'Needs Improvement')
              : 'Excellent Performance'}
            subtextColor={recent
              ? (recent.avgKDA >= 3 ? 'text-emerald-400' : recent.avgKDA >= 2 ? 'text-amber-400' : 'text-red-400')
              : 'text-zinc-400'}
          />
        </div>

        {/* Recent Matches & Patch Notes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-96">
          {/* Recent Matches */}
          <div className="lg:col-span-2 glass-panel rounded-xl p-6 border border-white/5 flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-medium text-white">Recent Matches</h3>
              <button className="text-xs text-primary hover:text-primary/80">View All</button>
            </div>
            <div className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2">
              <MatchItem
                champion="Kaisa"
                result="victory"
                kda="12/3/8"
                lp="+21"
                queue="Ranked Solo"
                duration="24 min"
              />
              <MatchItem
                champion="Jhin"
                result="defeat"
                kda="4/6/12"
                lp="-18"
                queue="Ranked Solo"
                duration="32 min"
              />
              <MatchItem
                champion="Ezreal"
                result="victory"
                kda="8/1/5"
                lp="+22"
                queue="Ranked Solo"
                duration="28 min"
              />
            </div>
          </div>

          {/* Patch Notes */}
          <div className="glass-panel rounded-xl p-6 border border-white/5">
            <h3 className="font-medium text-white mb-4">Patch 14.23 Notes</h3>
            <div className="space-y-4">
              <PatchNote
                champion="Skarner"
                title="Skarner Nerfs"
                description="Base health reduced. Q damage ratio adjusted for late game scaling."
              />
              <PatchNote
                champion="Azir"
                title="Azir Adjustments"
                description="W base damage increased. E shield duration slightly reduced."
              />
              <PatchNote
                champion="Jinx"
                title="Jinx Buffs"
                description="Attack speed growth increased. Passive movement speed improved."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Stats Card Component
interface StatsCardProps {
  icon: React.ReactNode
  label: string
  value: string
  subtext: string
  subtextColor?: string
}

function StatsCard({ icon, label, value, subtext, subtextColor = "text-zinc-400" }: StatsCardProps) {
  return (
    <div className="glass-panel p-6 rounded-xl relative overflow-hidden group">
      <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
        {icon}
      </div>
      <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider mb-2">{label}</div>
      <div className="text-3xl font-display text-white mb-1">{value}</div>
      <div className={`text-sm ${subtextColor}`}>{subtext}</div>
    </div>
  )
}

// Match Item Component
interface MatchItemProps {
  champion: string
  result: 'victory' | 'defeat'
  kda: string
  lp: string
  queue: string
  duration: string
}

function MatchItem({ champion, result, kda, lp, queue, duration }: MatchItemProps) {
  const formattedName = riotApi.formatChampionName(champion)
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${formattedName}_0.jpg`
  const isVictory = result === 'victory'

  return (
    <div className={`match-item ${result}`}>
      <div className="w-10 h-10 rounded overflow-hidden mr-4">
        <img src={imageUrl} className="w-full h-full object-cover" alt={champion} />
      </div>
      <div className="flex-1">
        <div className="text-white font-medium text-sm capitalize">{result}</div>
        <div className="text-xs text-zinc-500">{queue} • {duration}</div>
      </div>
      <div className="text-right">
        <div className="text-white font-medium">{kda}</div>
        <div className={`text-xs font-bold ${isVictory ? 'text-victory' : 'text-defeat'}`}>{lp} LP</div>
      </div>
    </div>
  )
}

// Patch Note Component
interface PatchNoteProps {
  champion: string
  title: string
  description: string
}

function PatchNote({ champion, title, description }: PatchNoteProps) {
  const formattedName = riotApi.formatChampionName(champion)
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${formattedName}.png`

  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center shrink-0 border border-zinc-700 overflow-hidden">
        <img src={imageUrl} className="w-6 h-6 rounded-sm" alt={champion} />
      </div>
      <div>
        <div className="text-sm text-white font-medium">{title}</div>
        <p className="text-xs text-zinc-500 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}

// Icons
function CupIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M5 3h14v3c0 3-2.5 5.5-5.5 6.5c0 0 1 .5 1.5 2.5h2v2H7v-2h2c.5-2 1.5-2.5 1.5-2.5C7.5 11.5 5 9 5 6V3zm12 3V5H7v1c0 2 1.5 4 4.5 4.5v.5h1v-.5C15.5 10 17 8 17 6z" opacity=".5"/>
      <path d="M7 17h10v2H7z"/>
    </svg>
  )
}

function GraphIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <path d="M3 20v-8l4-4l4 4l6-6l4 4v10H3z" opacity=".5"/>
      <path d="M7 12l4 4l6-6l4 4" stroke="currentColor" strokeWidth="2" fill="none"/>
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="10" opacity=".3"/>
      <circle cx="12" cy="12" r="6" opacity=".5"/>
      <circle cx="12" cy="12" r="2"/>
    </svg>
  )
}
