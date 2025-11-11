interface SectionDividerProps {
  className?: string
  variant?: 'default' | 'subtle' | 'accent'
}

export default function SectionDivider({ className = '', variant = 'default' }: SectionDividerProps) {
  const variants = {
    default: 'bg-gradient-to-r from-transparent via-gray-800 to-transparent',
    subtle: 'bg-gradient-to-r from-transparent via-gray-900 to-transparent',
    accent: 'bg-gradient-to-r from-transparent via-purple-800/50 to-transparent'
  }

  return (
    <div className={`w-full h-px ${variants[variant]} ${className}`}>
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-purple-600 rounded-full opacity-60"></div>
      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-purple-400 rounded-full animate-pulse"></div>
    </div>
  )
}