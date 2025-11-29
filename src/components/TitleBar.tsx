export function TitleBar() {
  const handleMinimize = () => window.api.window.minimize()
  const handleMaximize = () => window.api.window.maximize()
  const handleClose = () => window.api.window.close()

  return (
    <header className="h-10 border-b border-border flex justify-between items-center px-4 bg-surface/50 app-drag z-50 shrink-0">
      {/* Logo & Title */}
      <div className="flex items-center gap-3">
        <div className="flex w-5 h-5 rounded-md items-center justify-center overflow-hidden bg-primary/20">
          <span className="text-primary font-bold text-xs">D</span>
        </div>
        <span className="text-xs font-medium text-zinc-200 tracking-wide">
          DraftBetter <span className="text-zinc-600 ml-1">v2.4.0</span>
        </span>
      </div>

      {/* Window Controls */}
      <div className="flex items-center gap-2 no-drag">
        <button 
          onClick={handleMinimize}
          className="h-2 w-2 rounded-full bg-zinc-600 hover:bg-zinc-400 cursor-pointer transition-colors"
        />
        <button 
          onClick={handleMaximize}
          className="h-2 w-2 rounded-full bg-zinc-600 hover:bg-zinc-400 cursor-pointer transition-colors"
        />
        <button 
          onClick={handleClose}
          className="h-2 w-2 rounded-full bg-red-500/50 hover:bg-red-500 cursor-pointer transition-colors"
        />
      </div>
    </header>
  )
}
