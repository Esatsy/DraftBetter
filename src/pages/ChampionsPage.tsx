import { useState, useEffect } from 'react'
import { riotApi } from '../services/RiotApiService'
import { CHAMPION_KNOWLEDGE_BASE } from '../data/ChampionKnowledgeBase'
import { cn } from '../lib/utils'
import { Role } from '../types'

const ROLES: (Role | 'All')[] = ['All', 'Top', 'Jungle', 'Mid', 'ADC', 'Support']

export function ChampionsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedRole, setSelectedRole] = useState<Role | 'All'>('All')
  const [champions, setChampions] = useState(CHAMPION_KNOWLEDGE_BASE)

  useEffect(() => {
    let filtered = CHAMPION_KNOWLEDGE_BASE

    if (searchQuery) {
      filtered = filtered.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    if (selectedRole !== 'All') {
      filtered = filtered.filter(c => c.role.includes(selectedRole))
    }

    setChampions(filtered)
  }, [searchQuery, selectedRole])

  return (
    <div className="flex flex-col h-full w-full p-8 overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-display font-medium text-white">Champions</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search champion..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-primary/50 w-64"
          />
          <SearchIcon className="absolute left-3 top-2.5 text-zinc-500" />
        </div>
      </div>

      {/* Role Filters */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {ROLES.map(role => (
          <button
            key={role}
            onClick={() => setSelectedRole(role)}
            className={cn("filter-pill", selectedRole === role && "active")}
          >
            {role === 'All' ? 'All Roles' : `${role} Lane`}
          </button>
        ))}
      </div>

      {/* Champions Grid */}
      <div className="flex-1 overflow-y-auto pr-2">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
          {champions.map(champion => (
            <ChampionGridItem key={champion.id} name={champion.name} />
          ))}
        </div>

        {champions.length === 0 && (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="w-16 h-16 rounded-xl bg-zinc-800 flex items-center justify-center mx-auto mb-4">
                <SearchIcon className="w-8 h-8 text-zinc-600" />
              </div>
              <p className="text-zinc-500">No champions found</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// Champion Grid Item
function ChampionGridItem({ name }: { name: string }) {
  const formattedName = riotApi.formatChampionName(name)
  const imageUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${formattedName}_0.jpg`

  return (
    <div className="aspect-[3/4] rounded-xl overflow-hidden relative group cursor-pointer border border-white/5 hover:border-primary/30 transition-colors">
      <img 
        src={imageUrl} 
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        alt={name}
        onError={(e) => {
          e.currentTarget.src = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${formattedName}.png`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-80" />
      <span className="absolute bottom-3 left-3 text-white font-medium text-sm tracking-wide">{name}</span>
    </div>
  )
}

// Search Icon
function SearchIcon({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className}>
      <circle cx="11" cy="11" r="8"/>
      <path d="M21 21l-4.35-4.35"/>
    </svg>
  )
}
