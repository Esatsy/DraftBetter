import { useState, useMemo } from 'react'
import { CHAMPION_KNOWLEDGE_BASE } from '../data/ChampionKnowledgeBase'
import { Role } from '../types'

interface ChampionSearchProps {
  onSelect?: (championId: number) => void
  filterRole?: Role | null
  excludeIds?: number[]
}

export function ChampionSearch({ onSelect, filterRole, excludeIds = [] }: ChampionSearchProps) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRole, setSelectedRole] = useState<Role | 'all'>('all')

  const filteredChampions = useMemo(() => {
    let champions = CHAMPION_KNOWLEDGE_BASE

    // Exclude certain champions
    if (excludeIds.length > 0) {
      champions = champions.filter(c => !excludeIds.includes(c.id))
    }

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      champions = champions.filter(c => 
        c.name.toLowerCase().includes(term) ||
        c.displayName.toLowerCase().includes(term)
      )
    }

    // Filter by role
    const roleFilter = filterRole || (selectedRole !== 'all' ? selectedRole : null)
    if (roleFilter) {
      champions = champions.filter(c => c.role.includes(roleFilter))
    }

    // Sort alphabetically
    return champions.sort((a, b) => a.displayName.localeCompare(b.displayName))
  }, [searchTerm, selectedRole, filterRole, excludeIds])

  const roles: (Role | 'all')[] = ['all', 'Top', 'Jungle', 'Mid', 'ADC', 'Support']

  return (
    <div className="glass-card p-4">
      {/* Search Input */}
      <div className="relative mb-4">
        <svg 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Şampiyon ara..."
          className="w-full pl-10 pr-4 py-2 rounded-lg bg-draft-surface border border-draft-border text-white placeholder-white/30 focus:outline-none focus:border-neon-green/50"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Role Filter */}
      {!filterRole && (
        <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
          {roles.map(role => (
            <button
              key={role}
              onClick={() => setSelectedRole(role)}
              className={`
                px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all
                ${selectedRole === role
                  ? 'bg-neon-green/20 text-neon-green border border-neon-green/30'
                  : 'bg-draft-surface text-white/60 border border-draft-border hover:border-white/20'
                }
              `}
            >
              {role === 'all' ? 'Tümü' : role}
            </button>
          ))}
        </div>
      )}

      {/* Champion Grid */}
      <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto">
        {filteredChampions.slice(0, 50).map(champion => (
          <button
            key={champion.id}
            onClick={() => onSelect?.(champion.id)}
            className="group relative aspect-square rounded-lg overflow-hidden border border-draft-border hover:border-neon-green/50 transition-all"
            title={champion.displayName}
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${champion.name}.png`}
              alt={champion.displayName}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect fill="%231a1a2e" width="48" height="48"/><text x="24" y="28" text-anchor="middle" fill="%23666" font-size="10">?</text></svg>'
              }}
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-1">
              <span className="text-[10px] text-white truncate w-full text-center">
                {champion.displayName}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Results count */}
      <div className="mt-3 text-xs text-white/40 text-center">
        {filteredChampions.length} şampiyon bulundu
      </div>
    </div>
  )
}

