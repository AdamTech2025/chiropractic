import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { track } from '@vercel/analytics'
import FileUpload from '../components/FileUpload'

const MedicalCodingPage = ({ onSuccess }) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    notes: '',
    files: [],
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState('')

  const handleBackToDashboard = () => {
    track('Back to Dashboard', { from: 'medical-coding' })
    navigate('/')
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFilesChange = (files) => {
    setFormData(prev => ({ ...prev, files: Array.from(files) }))
    if (files.length > 0) {
      track('Dental File Uploaded', { 
        fileCount: files.length,
        fileTypes: Array.from(files).map(f => f.type).join(', ')
      })
    }
  }

  const handleFileRemove = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, files: newFiles }))
    track('Dental File Removed')
  }

  const handleNextStep = () => {
    const hasNotes = formData.notes.trim()
    const hasFiles = formData.files.length > 0

    if (!hasNotes && !hasFiles) {
      setErrors({ step1: 'Please provide procedure description or upload files.' })
      track('Dental Form Validation Error', { 
        reason: 'No notes or files provided' 
      })
      return
    }

    track('Dental Reached Step 2')
    setCurrentStep(2)
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isSubmitting) return

    track('Dental Form Submission Started')
    setIsSubmitting(true)

    const formDataToSend = new FormData()
    formDataToSend.append('type', 'dental')
    formDataToSend.append('email', formData.email)
    formDataToSend.append('notes', formData.notes)

    formData.files.forEach((file) => {
      formDataToSend.append('files', file)
    })

    const progressMessages = [
      'Submitting dental coding request...',
      'Analyzing procedure descriptions...',
      'Matching CDT codes...',
      'Preparing coding results...'
    ]

    let progressIndex = 0
    setSubmitProgress(progressMessages[0])

    const progressInterval = setInterval(() => {
      progressIndex = (progressIndex + 1) % progressMessages.length
      if (!isSubmitting) {
        clearInterval(progressInterval)
        return
      }
      setSubmitProgress(progressMessages[progressIndex])
    }, 2000)

    try {
      const apiUrl = import.meta.env.DEV ? 'http://localhost:3001/api/upload' : '/api/upload'
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend
      })

      clearInterval(progressInterval)
      
      if (response.ok) {
        track('Dental Form Submitted Successfully', { method: 'api' })
        track('Dental Form Completed')
        onSuccess()
      } else {
        track('Dental Form Submission Error', { status: response.status })
        const errorText = await response.text()
        alert('Error: ' + errorText)
      }
    } catch (error) {
      clearInterval(progressInterval)
      track('Dental Form Submission Failed', { error: error.message })
      alert('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
      setSubmitProgress('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-teal-100">
      {/* Header with Back Button */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 text-gray-600 hover:text-emerald-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-medium">Back to Dashboard</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Medical Coding</h1>
                <p className="text-xs text-gray-500">Dental CDT Codes</p>
              </div>
            </div>
            
            <a
              href="/help"
              onClick={(e) => {
                e.preventDefault()
                navigate('/help')
                track('Help Page Accessed', { from: 'medical-coding' })
              }}
              className="text-gray-500 hover:text-emerald-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm">Need Help?</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-8 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Professional Dental Coding
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get accurate CDT codes for dental procedures. Expert coding powered by AI and verified by dental professionals within 60 minutes.
            </p>
            
            {/* Features */}
            <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>60 min results</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>99% accuracy rate</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Free tier available</span>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-gray-50 px-8 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    1
                  </div>
                  <div className={`h-0.5 w-16 ${currentStep >= 2 ? 'bg-emerald-600' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    2
                  </div>
                </div>
                <div className="text-sm text-gray-500">
                  Step {currentStep} of 2
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-8">
              {/* Step 1: Procedure Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  {/* Simple Header */}
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">What dental procedure do you need coded?</h2>
                    <p className="text-gray-600">Tell us about the procedure or upload documents</p>
                  </div>

                  {/* Simplified Combined Input */}
                  <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-200 hover:border-emerald-300 transition-all duration-200">
                    {/* Main Input Area */}
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                      placeholder="Example: Composite filling on tooth #14, mesial surface..."
                      rows={4}
                      className="w-full px-0 py-0 border-0 bg-transparent focus:ring-0 focus:outline-none text-base placeholder-gray-400 resize-none"
                    />
                    
                    {/* Simple File Upload */}
                    <div className="mt-4 pt-4 border-t border-gray-300">
                      <div className="text-center">
                        <FileUpload 
                          files={formData.files}
                          onFilesChange={handleFilesChange}
                          onFileRemove={handleFileRemove}
                        />
                        {formData.files.length === 0 && (
                          <p className="text-sm text-gray-500 mt-2">
                            Or drag & drop your files here
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Examples - Simplified */}
                  {/* <div className="bg-emerald-50 rounded-xl p-4">
                    <h3 className="font-medium text-emerald-800 mb-2 text-sm">Need examples?</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-emerald-700">
                      <div>• "Crown on tooth #19"</div>
                      <div>• "Cleaning - full mouth"</div>
                      <div>• "Filling on tooth #12, mesial"</div>
                      <div>• "Root canal tooth #8"</div>
                    </div>
                  </div> */}

                  {/* Error Message */}
                  {errors.step1 && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-center">
                      <span className="text-red-700 text-sm">{errors.step1}</span>
                    </div>
                  )}
                  
                  {/* Simple Continue Button */}
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 text-lg"
                  >
                    Get My CDT Codes
                  </button>
                </div>
              )}

              {/* Step 2: Email - Simplified */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Where should we send your results?</h2>
                    <p className="text-gray-600">You'll receive accurate CDT codes in 60 minutes</p>
                  </div>

                  {/* Simple Email Input */}
                  <div className="max-w-md mx-auto">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-4 text-center border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:ring-0 transition-all duration-200 text-lg"
                    />
                  </div>

                  {/* Simple Trust Indicator */}
                  <div className="text-center bg-emerald-50 rounded-xl p-4 max-w-md mx-auto">
                    <div className="flex items-center justify-center space-x-4 text-sm text-emerald-700">
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Free</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>60 min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Secure</span>
                      </div>
                    </div>
                  </div>

                  {/* Simple Action Buttons */}
                  <div className="flex space-x-3 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-xl transition-all duration-200"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                          </svg>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <span>Send Results</span>
                      )}
                    </button>
                  </div>

                  {/* Progress Indicator */}
                  {submitProgress && (
                    <div className="text-center">
                      <div className="inline-flex items-center space-x-2 text-emerald-600 bg-emerald-50 px-3 py-2 rounded-full text-sm">
                        <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                        </svg>
                        <span>{submitProgress}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </form>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-emerald-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>ADA CDT Code Certified</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Verified by Dental Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
                </svg>
                <span>99% Accuracy Rate</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MedicalCodingPage 