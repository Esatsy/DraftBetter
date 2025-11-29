import { cn } from '../../lib/utils'

interface ShimmerButtonProps {
  children: React.ReactNode
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function ShimmerButton({ children, onClick, className, disabled }: ShimmerButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "shimmer-btn group",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {/* Shimmer Background */}
      <div className="shimmer-bg">
        <div className="shimmer-gradient">
          <div className="absolute inset-0" style={{
            background: 'conic-gradient(from calc(270deg - (90deg * 0.5)), transparent 0, #06b6d4 90deg, transparent 90deg)'
          }} />
        </div>
      </div>
      
      {/* Inner Background */}
      <div className="shimmer-inner" />
      
      {/* Content */}
      <span className="relative z-10 flex items-center gap-2">
        {children}
      </span>
    </button>
  )
}





