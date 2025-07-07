import { useLocation, useNavigate } from 'react-router-dom'
import { track } from '@vercel/analytics'

const FloatingTabNavigation = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const tabs = [
    {
      id: 'eligibility',
      path: '/eligibility',
      name: 'Eligibility Check',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Check insurance eligibility'
    },
    {
      id: 'medical-coding',
      path: '/medical-coding',
      name: 'Medical Coding',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      description: 'Get dental CDT codes'
    }
  ]

  const handleTabClick = (tab) => {
    navigate(tab.path)
    track('Tab Navigation', { 
      tab: tab.name,
      from: location.pathname,
      to: tab.path
    })
  }

  const isActive = (path) => location.pathname === path

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">MedCheck Pro</h1>
              <p className="text-xs text-gray-500">Professional Healthcare Solutions</p>
            </div>
          </div>

          {/* Floating Tab Navigation */}
          <div className="flex items-center">
            <div className="bg-gray-100/80 backdrop-blur-sm rounded-2xl p-1.5 shadow-lg border border-gray-200/50">
              <div className="flex space-x-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab)}
                    className={`
                      relative px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 ease-out
                      flex items-center space-x-2 min-w-[160px] justify-center
                      ${isActive(tab.path)
                        ? 'bg-white text-blue-600 shadow-lg shadow-blue-100 border border-blue-100'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-white/50'
                      }
                    `}
                  >
                    <span className={`transition-transform duration-300 ${isActive(tab.path) ? 'scale-110' : ''}`}>
                      {tab.icon}
                    </span>
                    <div className="flex flex-col items-start">
                      <span className="font-semibold">{tab.name}</span>
                      <span className="text-xs opacity-75 font-normal">{tab.description}</span>
                    </div>
                    
                    {/* Active indicator */}
                    {isActive(tab.path) && (
                      <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-blue-600 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Help/Contact */}
          <div className="flex items-center space-x-4">
            <a
              href="mailto:founder@adambilling.com"
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200"
              title="Need help?"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FloatingTabNavigation 