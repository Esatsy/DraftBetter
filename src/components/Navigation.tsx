import { cn } from '../lib/utils'

export type Page = 'home' | 'draft' | 'champions' | 'tierlist' | 'synergies' | 'simulation' | 'settings'

interface NavigationProps {
  currentPage: Page
  onPageChange: (page: Page) => void
  isInChampSelect: boolean
}

export function Navigation({ currentPage, onPageChange, isInChampSelect }: NavigationProps) {
  return (
    <aside className="w-16 border-r border-border flex flex-col items-center py-6 gap-8 bg-surface/30 backdrop-blur-sm z-40">
      <nav className="flex flex-col gap-6 w-full items-center">
        <NavButton 
          icon={<HomeIcon />} 
          active={currentPage === 'home'} 
          onClick={() => onPageChange('home')} 
        />
        <NavButton 
          icon={<GamepadIcon />} 
          active={currentPage === 'draft'} 
          onClick={() => onPageChange('draft')}
          highlight={isInChampSelect}
        />
        <NavButton 
          icon={<UserIcon />} 
          active={currentPage === 'champions'} 
          onClick={() => onPageChange('champions')} 
        />
        <NavButton 
          icon={<RankingIcon />} 
          active={currentPage === 'tierlist'} 
          onClick={() => onPageChange('tierlist')} 
        />
        <NavButton 
          icon={<ConnectionIcon />} 
          active={currentPage === 'synergies'} 
          onClick={() => onPageChange('synergies')} 
        />
        <NavButton 
          icon={<TestIcon />} 
          active={currentPage === 'simulation'} 
          onClick={() => onPageChange('simulation')} 
        />
      </nav>

      <div className="mt-auto flex flex-col gap-6 w-full items-center">
        <NavButton 
          icon={<SettingsIcon />} 
          active={currentPage === 'settings'} 
          onClick={() => onPageChange('settings')} 
        />
        <div className="w-8 h-8 rounded-full overflow-hidden border border-white/10">
          <img 
            src="https://ui-avatars.com/api/?name=Summoner&background=27272a&color=a1a1aa" 
            alt="User" 
            className="hover:opacity-100 transition-opacity opacity-80 w-full h-full object-cover"
          />
        </div>
      </div>
    </aside>
  )
}

interface NavButtonProps {
  icon: React.ReactNode
  active: boolean
  onClick: () => void
  highlight?: boolean
}

function NavButton({ icon, active, onClick, highlight }: NavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "nav-btn",
        active && "active",
        highlight && !active && "animate-pulse text-primary"
      )}
    >
      {icon}
    </button>
  )
}

// Icons (Solar Bold Duotone style simplified as SVGs)
function HomeIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M2 12.204c0-2.289 0-3.433.52-4.381c.518-.949 1.467-1.537 3.364-2.715l2-1.241C9.889 2.622 10.892 2 12 2s2.11.622 4.116 1.867l2 1.241c1.897 1.178 2.846 1.766 3.365 2.715S22 9.915 22 12.203v1.522c0 3.9 0 5.851-1.172 7.063S17.771 22 14 22h-4c-3.771 0-5.657 0-6.828-1.212S2 17.626 2 13.725z" opacity=".5"/>
      <path d="M9.447 15.398a.75.75 0 0 0-.894 1.205A5.77 5.77 0 0 0 12 17.75a5.77 5.77 0 0 0 3.447-1.147a.75.75 0 0 0-.894-1.206A4.27 4.27 0 0 1 12 16.25a4.27 4.27 0 0 1-2.553-.852"/>
    </svg>
  )
}

function GamepadIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="m10.667 6.134l-.502-.355A4.24 4.24 0 0 0 7.715 5h-.612c-.405 0-.813.025-1.194.16c-2.383.846-4.022 3.935-3.903 10.943c.024 1.412.354 2.972 1.628 3.581A3.2 3.2 0 0 0 5.027 20a2.74 2.74 0 0 0 1.53-.437c.41-.268.77-.616 1.13-.964c.444-.43.888-.86 1.424-1.138a4.1 4.1 0 0 1 1.89-.461H13c.658 0 1.306.158 1.89.46c.536.279.98.709 1.425 1.139c.36.348.72.696 1.128.964c.39.256.895.437 1.531.437a3.2 3.2 0 0 0 1.393-.316c1.274-.609 1.604-2.17 1.628-3.581c.119-7.008-1.52-10.097-3.903-10.942C17.71 5.025 17.3 5 16.897 5h-.612a4.24 4.24 0 0 0-2.45.78l-.502.354a2.31 2.31 0 0 1-2.666 0" opacity=".5"/>
      <path d="M16.75 9a.75.75 0 1 1 0 1.5a.75.75 0 0 1 0-1.5m-9.25.25a.75.75 0 0 1 .75.75v.75H9a.75.75 0 0 1 0 1.5h-.75V13a.75.75 0 0 1-1.5 0v-.75H6a.75.75 0 0 1 0-1.5h.75V10a.75.75 0 0 1 .75-.75m11.5 2a.75.75 0 1 1-1.5 0a.75.75 0 0 1 1.5 0m-3.75.75a.75.75 0 1 0 0-1.5a.75.75 0 0 0 0 1.5m2.25.75a.75.75 0 1 0-1.5 0a.75.75 0 0 0 1.5 0"/>
    </svg>
  )
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="6" r="4"/>
      <path d="M20 17.5c0 2.485 0 4.5-8 4.5s-8-2.015-8-4.5S7.582 13 12 13s8 2.015 8 4.5" opacity=".5"/>
    </svg>
  )
}

function RankingIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M11.146 3.023C11.526 2.34 11.716 2 12 2s.474.34.854 1.023l.098.176c.108.194.162.29.246.354c.085.064.19.088.4.135l.19.044c.738.167 1.107.25 1.195.532s-.164.577-.667 1.165l-.13.152c-.143.167-.215.25-.247.354s-.021.215 0 .438l.02.203c.076.785.114 1.178-.115 1.352c-.23.175-.576.015-1.267-.303l-.178-.082c-.197-.09-.295-.136-.399-.136s-.202.046-.399.136l-.178.082c-.691.318-1.037.478-1.267.303c-.23-.174-.191-.567-.115-1.352l.02-.203c.021-.223.032-.334 0-.438s-.104-.187-.247-.354l-.13-.152c-.503-.588-.755-.882-.667-1.165c.088-.282.457-.365 1.195-.532l.19-.044c.21-.047.315-.07.4-.135c.084-.064.138-.16.246-.354zM13 10h-2c-1.414 0-2.121 0-2.56.44C8 10.878 8 11.585 8 13v9h8v-9c0-1.414 0-2.121-.44-2.56C15.122 10 14.415 10 13 10"/>
      <path d="M7.56 19.44C7.122 19 6.415 19 5 19s-2.121 0-2.56.44C2 19.878 2 20.585 2 22h6c0-1.414 0-2.121-.44-2.56M16 19v3h6v-3c0-1.414 0-2.121-.44-2.56C21.122 16 20.415 16 19 16s-2.121 0-2.56.44C16 16.878 16 17.585 16 19" opacity=".5"/>
    </svg>
  )
}

function ConnectionIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="5" cy="12" r="3"/>
      <circle cx="19" cy="5" r="3" opacity=".5"/>
      <circle cx="19" cy="19" r="3" opacity=".5"/>
      <path d="M7.5 10.5L16.5 6M7.5 13.5l9 4.5" stroke="currentColor" strokeWidth="1.5" opacity=".5"/>
    </svg>
  )
}

function SettingsIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path fillRule="evenodd" d="M12.428 2c-1.114 0-2.129.6-4.157 1.802l-.686.406C5.555 5.41 4.542 6.011 3.985 7c-.557.99-.557 2.19-.557 4.594v.812c0 2.403 0 3.605.557 4.594s1.57 1.59 3.6 2.791l.686.407C10.299 21.399 11.314 22 12.428 22s2.128-.6 4.157-1.802l.686-.407c2.028-1.2 3.043-1.802 3.6-2.791c.557-.99.557-2.19.557-4.594v-.812c0-2.403 0-3.605-.557-4.594s-1.572-1.59-3.6-2.792l-.686-.406C14.555 2.601 13.542 2 12.428 2" clipRule="evenodd" opacity=".5"/>
      <path d="M12.428 8.25a3.75 3.75 0 1 0 0 7.5a3.75 3.75 0 0 0 0-7.5"/>
    </svg>
  )
}

function TestIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
      <path d="M7 2v2h1v14a4 4 0 0 0 4 4a4 4 0 0 0 4-4V4h1V2H7z" opacity=".5"/>
      <path d="M9 4h6v2H9zm0 4h6v10c0 1.1-.9 2-2 2s-2-.9-2-2z"/>
    </svg>
  )
}
