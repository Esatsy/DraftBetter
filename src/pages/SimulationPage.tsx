/**
 * SIMULATION PAGE
 * 
 * Şampiyon seçimi simülasyonu sayfası.
 * Dashboard ile yan yana çalışır - soldaki panel simülasyon kontrollerini,
 * sağdaki panel normal Dashboard'u gösterir.
 */

import React, { useState } from 'react'
import { SimulationPanel } from '../components/SimulationPanel'
import { Dashboard } from '../components/Dashboard'
import { cn } from '../lib/utils'

export function SimulationPage() {
  const [layout, setLayout] = useState<'split' | 'simulation' | 'dashboard'>('split')

  return (
    <div className="h-full flex flex-col">
      {/* Layout Toggle */}
      <div className="h-12 border-b border-border/50 px-4 flex items-center justify-center gap-2 bg-surface/30 shrink-0">
        <span className="text-xs text-zinc-500 mr-2">Layout:</span>
        <button
          onClick={() => setLayout('split')}
          className={cn(
            "px-3 py-1.5 rounded text-xs font-medium transition-colors",
            layout === 'split' ? "bg-primary text-white" : "bg-surface text-zinc-400 hover:text-white"
          )}
        >
          Split View
        </button>
        <button
          onClick={() => setLayout('simulation')}
          className={cn(
            "px-3 py-1.5 rounded text-xs font-medium transition-colors",
            layout === 'simulation' ? "bg-primary text-white" : "bg-surface text-zinc-400 hover:text-white"
          )}
        >
          Simulation Only
        </button>
        <button
          onClick={() => setLayout('dashboard')}
          className={cn(
            "px-3 py-1.5 rounded text-xs font-medium transition-colors",
            layout === 'dashboard' ? "bg-primary text-white" : "bg-surface text-zinc-400 hover:text-white"
          )}
        >
          Dashboard Only
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex overflow-hidden">
        {layout === 'split' ? (
          <>
            <div className="w-1/2 border-r border-border/50 overflow-hidden">
              <SimulationPanel />
            </div>
            <div className="w-1/2 overflow-hidden">
              <Dashboard />
            </div>
          </>
        ) : layout === 'simulation' ? (
          <div className="w-full overflow-hidden">
            <SimulationPanel />
          </div>
        ) : (
          <div className="w-full overflow-hidden">
            <Dashboard />
          </div>
        )}
      </div>
    </div>
  )
}


