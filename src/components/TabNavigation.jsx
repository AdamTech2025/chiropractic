import { track } from '@vercel/analytics'

const TabNavigation = ({ activeTab, onTabChange }) => {
  const handleTabClick = (tabId, tabName) => {
    onTabChange(tabId)
    track('Tab Changed', { tab: tabName })
  }

  return (
    <div className="w-full max-w-lg mb-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-xl shadow-card border border-blue-100 p-1">
        <div className="flex">
          <button
            onClick={() => handleTabClick('dental', 'Dental Coding')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeTab === 'dental'
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-primary hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span>Dental Coding</span>
            </div>
          </button>
          
          <button
            onClick={() => handleTabClick('eligibility', 'Eligibility Checker')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold text-sm transition-all duration-200 ${
              activeTab === 'eligibility'
                ? 'bg-primary text-white shadow-md'
                : 'text-gray-600 hover:text-primary hover:bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Eligibility Check</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TabNavigation 