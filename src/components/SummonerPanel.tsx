/**
 * SUMMONER PANEL
 * 
 * Bağlı sihirdarın profilini ve istatistiklerini gösterir.
 */

import React, { useEffect, useState } from 'react'
import { summonerService, SummonerProfile, ChampionPersonalStats } from '../services/SummonerService'
import { riotApi } from '../services/RiotApiService'
import { cn } from '../lib/utils'

interface SummonerPanelProps {
  isConnected: boolean
  compact?: boolean
}

export const SummonerPanel: React.FC<SummonerPanelProps> = ({ isConnected, compact = false }) => {
  const [profile, setProfile] = useState<SummonerProfile | null>(null)
  const [bestChampions, setBestChampions] = useState<ChampionPersonalStats[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isConnected) {
      loadProfile()
    } else {
      setProfile(null)
      setBestChampions([])
    }
  }, [isConnected])

  const loadProfile = async () => {
    setLoading(true)
    try {
      const data = await summonerService.loadSummonerData()
      setProfile(data)
      
      if (data) {
        const champions = summonerService.getBestPerformingChampions(3)
        setBestChampions(champions)
      }
    } catch (error) {
      console.error('[SummonerPanel] Load failed:', error)
    }
    setLoading(false)
  }

  if (!isConnected) {
    return null
  }

  if (loading) {
    return (
      <div className={cn(
        "glass rounded-xl p-4 animate-pulse",
        compact ? "p-3" : "p-4"
      )}>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/10 rounded-full" />
          <div className="flex-1">
            <div className="h-4 bg-white/10 rounded w-24 mb-2" />
            <div className="h-3 bg-white/10 rounded w-16" />
          </div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return null
  }

  const { summoner, ranked, recentPerformance } = profile
  const soloQ = ranked.soloQueue

  if (compact) {
    return (
      <div className="glass rounded-xl p-3">
        <div className="flex items-center gap-3">
          {/* Profile Icon */}
          <div className="relative">
            <img 
              src={summonerService.getProfileIconUrl()}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-primary/50"
            />
            <div className="absolute -bottom-1 -right-1 bg-surface px-1.5 py-0.5 rounded text-[10px] font-bold text-primary">
              {summoner.summonerLevel}
            </div>
          </div>

          {/* Name & Rank */}
          <div className="flex-1 min-w-0">
            <div className="font-display text-sm truncate">
              {summoner.gameName}
              <span className="text-zinc-500">#{summoner.tagLine}</span>
            </div>
            {soloQ && (
              <div 
                className="text-xs font-medium"
                style={{ color: summonerService.getTierColor(soloQ.tier) }}
              >
                {soloQ.tier} {soloQ.division} · {soloQ.winRate}% WR
              </div>
            )}
          </div>

          {/* Recent Performance */}
          <div className="text-right">
            <div className={cn(
              "text-sm font-bold",
              recentPerformance.winRate >= 55 ? "text-emerald-400" :
              recentPerformance.winRate >= 50 ? "text-zinc-200" : "text-red-400"
            )}>
              {recentPerformance.winRate}%
            </div>
            <div className="text-[10px] text-zinc-500">
              {recentPerformance.wins}W {recentPerformance.losses}L
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="glass rounded-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/20 to-transparent p-4">
        <div className="flex items-center gap-4">
          {/* Profile Icon */}
          <div className="relative">
            <img 
              src={summonerService.getProfileIconUrl()}
              alt="Profile"
              className="w-16 h-16 rounded-full border-3 border-primary/50"
            />
            <div className="absolute -bottom-1 -right-1 bg-primary px-2 py-0.5 rounded-full text-xs font-bold text-black">
              {summoner.summonerLevel}
            </div>
          </div>

          {/* Name & Rank */}
          <div className="flex-1">
            <h3 className="font-display text-xl">
              {summoner.gameName}
              <span className="text-zinc-500 text-base ml-1">#{summoner.tagLine}</span>
            </h3>
            {soloQ ? (
              <div className="flex items-center gap-2 mt-1">
                <span 
                  className="font-bold"
                  style={{ color: summonerService.getTierColor(soloQ.tier) }}
                >
                  {soloQ.tier} {soloQ.division}
                </span>
                <span className="text-zinc-400 text-sm">
                  {soloQ.leaguePoints} LP
                </span>
              </div>
            ) : (
              <div className="text-zinc-500 text-sm">Unranked</div>
            )}
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="p-4 grid grid-cols-3 gap-3">
        {/* Ranked Stats */}
        {soloQ && (
          <>
            <div className="text-center">
              <div className={cn(
                "text-2xl font-bold",
                soloQ.winRate >= 55 ? "text-emerald-400" :
                soloQ.winRate >= 50 ? "text-zinc-200" : "text-red-400"
              )}>
                {soloQ.winRate}%
              </div>
              <div className="text-xs text-zinc-500">Win Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-emerald-400">{soloQ.wins}</div>
              <div className="text-xs text-zinc-500">Wins</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{soloQ.losses}</div>
              <div className="text-xs text-zinc-500">Losses</div>
            </div>
          </>
        )}

        {/* Recent Performance */}
        {!soloQ && (
          <>
            <div className="text-center">
              <div className={cn(
                "text-2xl font-bold",
                recentPerformance.winRate >= 55 ? "text-emerald-400" :
                recentPerformance.winRate >= 50 ? "text-zinc-200" : "text-red-400"
              )}>
                {recentPerformance.winRate}%
              </div>
              <div className="text-xs text-zinc-500">Recent WR</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-amber-400">{recentPerformance.avgKDA}</div>
              <div className="text-xs text-zinc-500">Avg KDA</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-zinc-200">
                {recentPerformance.wins + recentPerformance.losses}
              </div>
              <div className="text-xs text-zinc-500">Games</div>
            </div>
          </>
        )}
      </div>

      {/* Best Champions */}
      {bestChampions.length > 0 && (
        <div className="px-4 pb-4">
          <div className="text-xs text-zinc-500 mb-2 uppercase tracking-wider">En İyi Şampiyonlar</div>
          <div className="space-y-2">
            {bestChampions.map(champ => (
              <div 
                key={champ.championId}
                className="flex items-center gap-3 bg-white/5 rounded-lg p-2"
              >
                <img 
                  src={riotApi.getChampionSquareUrl(champ.championName)}
                  alt={champ.championName}
                  className="w-8 h-8 rounded"
                />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm truncate">{champ.championName}</div>
                  <div className="text-xs text-zinc-500">
                    {champ.gamesPlayed} maç · {champ.avgKills}/{champ.avgDeaths}/{champ.avgAssists}
                  </div>
                </div>
                <div className={cn(
                  "text-sm font-bold",
                  champ.winRate >= 60 ? "text-emerald-400" :
                  champ.winRate >= 50 ? "text-zinc-200" : "text-red-400"
                )}>
                  {champ.winRate}%
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SummonerPanel



