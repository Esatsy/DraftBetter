import { RecommendationReason } from '../types'

interface ReasoningPanelProps {
  reasons: RecommendationReason[]
}

export function ReasoningPanel({ reasons }: ReasoningPanelProps) {
  if (reasons.length === 0) return null

  const getReasonIcon = (type: RecommendationReason['type']) => {
    switch (type) {
      case 'composition':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      case 'synergy':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        )
      case 'counter':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        )
      case 'powerSpike':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        )
      case 'proData':
        return (
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        )
      default:
        return null
    }
  }

  const getReasonColor = (type: RecommendationReason['type']) => {
    switch (type) {
      case 'composition':
        return 'text-neon-purple bg-neon-purple/10 border-neon-purple/20'
      case 'synergy':
        return 'text-neon-green bg-neon-green/10 border-neon-green/20'
      case 'counter':
        return 'text-neon-red bg-neon-red/10 border-neon-red/20'
      case 'powerSpike':
        return 'text-neon-orange bg-neon-orange/10 border-neon-orange/20'
      case 'proData':
        return 'text-neon-blue bg-neon-blue/10 border-neon-blue/20'
      default:
        return 'text-white/60 bg-draft-border/50 border-draft-border'
    }
  }

  const getReasonLabel = (type: RecommendationReason['type']) => {
    switch (type) {
      case 'composition':
        return 'Kompozisyon'
      case 'synergy':
        return 'Sinerji'
      case 'counter':
        return 'Counter'
      case 'powerSpike':
        return 'Güç Artışı'
      case 'proData':
        return 'Pro Veri'
      default:
        return 'Genel'
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-xs font-medium text-white/40 uppercase tracking-wider">
        Neden bu öneri?
      </div>
      <div className="space-y-2">
        {reasons.map((reason, index) => (
          <div
            key={index}
            className={`
              flex items-start gap-2 p-2 rounded-lg border
              ${getReasonColor(reason.type)}
            `}
          >
            <span className="flex-shrink-0 mt-0.5">
              {getReasonIcon(reason.type)}
            </span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="text-xs font-semibold">
                  {getReasonLabel(reason.type)}
                </span>
                <span className="text-xs opacity-60">+{reason.score} puan</span>
              </div>
              <p className="text-xs opacity-80 leading-relaxed">
                {reason.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


