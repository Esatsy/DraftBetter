import { useState } from 'react'
import { riotApi } from '../services/RiotApiService'
import { cn } from '../lib/utils'

interface TierEntry {
  rank: number
  champion: string
  role: 'Top' | 'Jungle' | 'Mid' | 'ADC' | 'Support'
  winRate: number
  tier: 'S+' | 'S' | 'A' | 'B' | 'C'
  trend: number // positive = up, negative = down, 0 = stable
}

const MOCK_TIER_DATA: TierEntry[] = [
  { rank: 1, champion: 'Jinx', role: 'ADC', winRate: 53.4, tier: 'S+', trend: 2.1 },
  { rank: 2, champion: 'Ahri', role: 'Mid', winRate: 52.8, tier: 'S+', trend: 0.8 },
  { rank: 3, champion: 'Thresh', role: 'Support', winRate: 52.1, tier: 'S', trend: 0 },
  { rank: 4, champion: 'Darius', role: 'Top', winRate: 50.4, tier: 'A', trend: -1.2 },
  { rank: 5, champion: 'LeeSin', role: 'Jungle', winRate: 49.8, tier: 'A', trend: -0.5 },
  { rank: 6, champion: 'Kaisa', role: 'ADC', winRate: 51.2, tier: 'S', trend: 1.5 },
  { rank: 7, champion: 'Lux', role: 'Support', winRate: 51.8, tier: 'S', trend: 0.3 },
  { rank: 8, champion: 'Yasuo', role: 'Mid', winRate: 49.2, tier: 'A', trend: -0.8 },
]

export function TierListPage() {
  const [sortBy, setSortBy] = useState<'winRate' | 'pickRate' | 'banRate'>('winRate')

  return (
    <div className="flex flex-col h-full w-full p-8 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <h1 className="text-2xl font-display font-medium text-white mb-1">Meta Tier List</h1>
          <p className="text-xs text-zinc-500 uppercase tracking-widest">Global • Emerald+ • Patch 14.23</p>
        </div>
        <div className="flex gap-2 text-xs">
          <button 
            onClick={() => setSortBy('winRate')}
            className={cn(
              "px-3 py-1.5 rounded transition-colors",
              sortBy === 'winRate' 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "bg-surface text-zinc-400 border border-white/10 hover:text-white"
            )}
          >
            Win Rate
          </button>
          <button 
            onClick={() => setSortBy('pickRate')}
            className={cn(
              "px-3 py-1.5 rounded transition-colors",
              sortBy === 'pickRate' 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "bg-surface text-zinc-400 border border-white/10 hover:text-white"
            )}
          >
            Pick Rate
          </button>
          <button 
            onClick={() => setSortBy('banRate')}
            className={cn(
              "px-3 py-1.5 rounded transition-colors",
              sortBy === 'banRate' 
                ? "bg-primary/10 text-primary border border-primary/20" 
                : "bg-surface text-zinc-400 border border-white/10 hover:text-white"
            )}
          >
            Ban Rate
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-y-auto glass-panel rounded-xl border border-white/5">
        <table className="w-full text-left border-collapse">
          <thead className="sticky top-0 bg-surface/95 backdrop-blur z-10 border-b border-white/10">
            <tr>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider w-16">Rank</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider">Champion</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider w-32">Role</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider w-32">Win Rate</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider w-32">Tier</th>
              <th className="py-4 px-6 text-xs font-semibold text-zinc-500 uppercase tracking-wider w-24">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {MOCK_TIER_DATA.map(entry => (
              <TierRow key={entry.rank} entry={entry} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Tier Row Component
function TierRow({ entry }: { entry: TierEntry }) {
  const formattedName = riotApi.formatChampionName(entry.champion)
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${formattedName}.png`

  const roleIcons: Record<string, React.ReactNode> = {
    Top: <SwordIcon />,
    Jungle: <TreeIcon />,
    Mid: <FlashIcon />,
    ADC: <TargetIcon />,
    Support: <HeartIcon />
  }

  return (
    <tr className="group hover:bg-white/[0.02] transition-colors">
      <td className="py-3 px-6 text-sm text-zinc-400">{entry.rank}</td>
      <td className="py-3 px-6">
        <div className="flex items-center gap-3">
          <img src={imageUrl} className="w-8 h-8 rounded bg-zinc-800" alt={entry.champion} />
          <span className="text-white font-medium text-sm">{entry.champion}</span>
        </div>
      </td>
      <td className="py-3 px-6 text-zinc-500">
        {roleIcons[entry.role]}
      </td>
      <td className={cn(
        "py-3 px-6 font-medium text-sm",
        entry.winRate >= 52 ? "text-emerald-400" : entry.winRate >= 50 ? "text-zinc-200" : "text-zinc-400"
      )}>
        {entry.winRate.toFixed(1)}%
      </td>
      <td className="py-3 px-6">
        <span className={cn(
          "tier-badge",
          entry.tier === 'S+' && "s-plus",
          entry.tier === 'S' && "s",
          entry.tier === 'A' && "a"
        )}>
          {entry.tier}
        </span>
      </td>
      <td className={cn(
        "py-3 px-6 text-xs",
        entry.trend > 0 ? "text-emerald-400" : entry.trend < 0 ? "text-red-400" : "text-zinc-500"
      )}>
        {entry.trend > 0 && <ArrowUpIcon />}
        {entry.trend < 0 && <ArrowDownIcon />}
        {entry.trend !== 0 && ` ${Math.abs(entry.trend)}%`}
        {entry.trend === 0 && '-'}
      </td>
    </tr>
  )
}

// Icons
function SwordIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M21 3v7l-9 9l-7-7l9-9h7z"/></svg>
}

function TreeIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2L5 10h3v4H5l7 8l7-8h-3v-4h3L12 2z" opacity=".7"/></svg>
}

function FlashIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L4 14h7v8l9-12h-7V2z"/></svg>
}

function TargetIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity=".3"/><circle cx="12" cy="12" r="6" opacity=".5"/><circle cx="12" cy="12" r="2"/></svg>
}

function HeartIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
}

function ArrowUpIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline"><path d="M12 19V5M5 12l7-7l7 7"/></svg>
}

function ArrowDownIcon() {
  return <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="inline"><path d="M12 5v14M19 12l-7 7l-7-7"/></svg>
}
