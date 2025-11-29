import { riotApi } from '../services/RiotApiService'
import { cn } from '../lib/utils'

interface SynergyDuo {
  champion1: string
  champion2: string
  name: string
  subtitle: string
  winRate: number
}

const SYNERGY_DATA: SynergyDuo[] = [
  { champion1: 'Lucian', champion2: 'Nami', name: 'Lucian & Nami', subtitle: 'Bot Lane Duo', winRate: 56.8 },
  { champion1: 'Yasuo', champion2: 'Diana', name: 'Yasuo & Diana', subtitle: 'Mid / Jungle', winRate: 54.1 },
  { champion1: 'Xayah', champion2: 'Rakan', name: 'Xayah & Rakan', subtitle: 'The Lovers Duo', winRate: 53.5 },
  { champion1: 'Yone', champion2: 'Malphite', name: 'Yone & Malphite', subtitle: 'Wombo Combo', winRate: 55.2 },
  { champion1: 'Jinx', champion2: 'Lulu', name: 'Jinx & Lulu', subtitle: 'Hypercarry Duo', winRate: 54.8 },
  { champion1: 'Leona', champion2: 'MissFortune', name: 'Leona & MF', subtitle: 'All-in Lane', winRate: 53.9 },
]

export function SynergiesPage() {
  return (
    <div className="flex flex-col h-full w-full p-8 overflow-y-auto animate-fade-in">
      <h1 className="text-2xl font-display font-medium text-white mb-2">Top Duo Synergies</h1>
      <p className="text-zinc-500 mb-8">Best performing champion combinations this patch.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SYNERGY_DATA.map((synergy, index) => (
          <SynergyCard key={index} synergy={synergy} />
        ))}
      </div>
    </div>
  )
}

// Synergy Card Component
function SynergyCard({ synergy }: { synergy: SynergyDuo }) {
  const image1 = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${riotApi.formatChampionName(synergy.champion1)}.png`
  const image2 = `https://ddragon.leagueoflegends.com/cdn/14.23.1/img/champion/${riotApi.formatChampionName(synergy.champion2)}.png`

  const winRateColor = synergy.winRate >= 55 
    ? 'text-primary' 
    : synergy.winRate >= 53 
    ? 'text-emerald-400' 
    : 'text-white'

  return (
    <div className="synergy-card group">
      <div className="flex items-center gap-6">
        {/* Champion Avatars */}
        <div className="flex -space-x-4">
          <img 
            src={image1} 
            className="w-14 h-14 rounded-full border-2 border-surface relative z-10"
            alt={synergy.champion1}
          />
          <img 
            src={image2} 
            className="w-14 h-14 rounded-full border-2 border-surface relative z-0 grayscale group-hover:grayscale-0 transition-all"
            alt={synergy.champion2}
          />
        </div>
        
        {/* Info */}
        <div>
          <h3 className="text-white font-medium">{synergy.name}</h3>
          <div className="text-xs text-zinc-500 uppercase tracking-wider mt-1">{synergy.subtitle}</div>
        </div>
      </div>

      {/* Win Rate */}
      <div className="text-right">
        <div className={cn("text-2xl font-display", winRateColor)}>{synergy.winRate}%</div>
        <div className="text-xs text-zinc-500">Win Rate</div>
      </div>
    </div>
  )
}
