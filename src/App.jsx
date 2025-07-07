import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Dashboard from './pages/Dashboard'
import EligibilityPage from './pages/EligibilityPage'
import MedicalCodingPage from './pages/MedicalCodingPage'
import HelpPage from './pages/HelpPage'
import ThankYou from './components/ThankYou'


console.log('test')
function App() {
  const [showThankYou, setShowThankYou] = useState(false)
  const [completedService, setCompletedService] = useState('')

  const handleFormSuccess = (serviceType) => {
    setCompletedService(serviceType)
    setShowThankYou(true)
  }

  const handleBackToForms = () => {
    setShowThankYou(false)
    setCompletedService('')
  }

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {showThankYou ? (
          <div className="flex items-center justify-center min-h-screen px-4">
            <ThankYou 
              serviceType={completedService}
              onBack={handleBackToForms}
            />
          </div>
        ) : (
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/help" element={<HelpPage />} />
            <Route 
              path="/eligibility" 
              element={<EligibilityPage onSuccess={() => handleFormSuccess('eligibility')} />} 
            />
            <Route 
              path="/medical-coding" 
              element={<MedicalCodingPage onSuccess={() => handleFormSuccess('dental')} />} 
            />
          </Routes>
        )}
      </div>
      <Analytics />
    </Router>
  )
}

export default App
