import { useState } from 'react'
import { track } from '@vercel/analytics'
import FileUpload from './FileUpload'
import Testimonials from './Testimonials'
import PrivacySection from './PrivacySection'

const EligibilityForm = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    patientName: '',
    dateOfBirth: '',
    memberId: '',
    insuranceName: '',
    notes: '',
    files: [],
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState('')

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const handleFilesChange = (files) => {
    setFormData(prev => ({ ...prev, files: Array.from(files) }))
    if (files.length > 0) {
      track('Eligibility File Uploaded', { 
        fileCount: files.length,
        fileTypes: Array.from(files).map(f => f.type).join(', ')
      })
    }
  }

  const handleFileRemove = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, files: newFiles }))
    track('Eligibility File Removed')
  }

  const handleNextStep = () => {
    // Validate Step 1 - require at least patient info OR files
    const hasPatientInfo = formData.patientName.trim() || formData.dateOfBirth.trim() || formData.memberId.trim() || formData.insuranceName.trim()
    const hasNotes = formData.notes.trim()
    const hasFiles = formData.files.length > 0

    if (!hasPatientInfo && !hasNotes && !hasFiles) {
      setErrors({ step1: 'Please provide patient information, notes, or upload files.' })
      track('Eligibility Form Validation Error', { 
        reason: 'No patient info, notes, or files provided' 
      })
      return
    }

    track('Eligibility Reached Step 2')
    setCurrentStep(2)
    setErrors({})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (isSubmitting) return

    track('Eligibility Form Submission Started')
    setIsSubmitting(true)

    const formDataToSend = new FormData()
    formDataToSend.append('type', 'eligibility')
    formDataToSend.append('email', formData.email)
    formDataToSend.append('patientName', formData.patientName)
    formDataToSend.append('dateOfBirth', formData.dateOfBirth)
    formDataToSend.append('memberId', formData.memberId)
    formDataToSend.append('insuranceName', formData.insuranceName)
    formDataToSend.append('notes', formData.notes)

    formData.files.forEach((file) => {
      formDataToSend.append('files', file)
    })

    const progressMessages = [
      'Submitting eligibility check request...',
      'Processing patient information...',
      'Verifying insurance details...',
      'Preparing eligibility report...'
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
      // Use development API server for local development
      const apiUrl = import.meta.env.DEV ? 'http://localhost:3001/api/eligibility' : '/api/eligibility'
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend
      })

      clearInterval(progressInterval)
      
      if (response.ok) {
        track('Eligibility Form Submitted Successfully', { method: 'api' })
        track('Eligibility Form Completed')
        onSuccess()
      } else {
        track('Eligibility Form Submission Error', { status: response.status })
        const errorText = await response.text()
        alert('Error: ' + errorText)
      }
    } catch (error) {
      clearInterval(progressInterval)
      track('Eligibility Form Submission Failed', { error: error.message })
      alert('Submission failed. Please try again.')
    } finally {
      setIsSubmitting(false)
      setSubmitProgress('')
    }
  }

  return (
    <div className="w-full max-w-lg px-2 sm:px-0 mt-10 mb-8">
      {/* Header */}
      <div className="flex flex-col items-center mb-6">
        <img 
          src="https://img.icons8.com/ios-filled/100/2563eb/insurance.png" 
          alt="Insurance Logo" 
          className="w-12 h-12 mb-2" 
        />
        <h1 className="text-2xl font-extrabold text-primary tracking-tight text-center">
          Instant Eligibility Checker
        </h1>
        <div className="text-gray-700 text-base mt-2 text-center max-w-md">
          Secretly powered by humans • Results in 3-10 minutes
        </div>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-card px-6 py-7 border border-blue-100">
        <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
          {/* Step 1: Patient Information */}
          {currentStep === 1 && (
            <div className="step step-1">
              <div className="font-semibold text-primary text-lg mb-4">Patient Information</div>
              
              {/* Patient Info Fields */}
              <div className="space-y-3 mb-4">
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  placeholder="Patient Name"
                  className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary/60 transition text-base"
                />
                
                <input
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  placeholder="Date of Birth (MM/DD/YYYY)"
                  className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary/60 transition text-base"
                />
                
                <input
                  type="text"
                  value={formData.memberId}
                  onChange={(e) => handleInputChange('memberId', e.target.value)}
                  placeholder="Member ID"
                  className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary/60 transition text-base"
                />
                
                <input
                  type="text"
                  value={formData.insuranceName}
                  onChange={(e) => handleInputChange('insuranceName', e.target.value)}
                  placeholder="Insurance Name (e.g., Blue Cross, Aetna, UnitedHealth)"
                  className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary/60 transition text-base"
                />
              </div>

              {/* Additional Notes */}
              <div className="relative mb-4">
                <textarea
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Additional notes or special requests (optional)"
                  className="w-full border border-blue-200 rounded-xl px-5 py-4 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary/60 resize-vertical min-h-[100px] transition shadow-card text-base"
                />
              </div>

              {/* File Upload */}
              <div className="mb-4">
                <div className="text-sm text-gray-600 mb-2">Or upload insurance card/documents:</div>
                <FileUpload 
                  files={formData.files}
                  onFilesChange={handleFilesChange}
                  onFileRemove={handleFileRemove}
                />
                <div className="text-xs text-gray-500 text-center mt-1">Upload insurance cards, ID cards, or related documents</div>
              </div>

              {errors.step1 && (
                <div className="text-red-600 text-sm mb-2">{errors.step1}</div>
              )}
              
              <button
                type="button"
                onClick={handleNextStep}
                className="mt-5 w-full py-3 bg-primary hover:bg-accent text-white font-semibold rounded-xl shadow transition text-base text-lg flex items-center justify-center gap-2"
              >
                <span>Check Eligibility</span>
              </button>
              
              <div className="text-xs text-gray-600 text-center mt-2">
                Results delivered in 3-10 minutes • No login required
              </div>
            </div>
          )}

          {/* Step 2: Email */}
          {currentStep === 2 && (
            <div className="step step-2">
              <div className="font-semibold text-primary text-base mb-3 text-center">
                Where should we send your eligibility results?
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                required
                placeholder="Your Email (required)"
                className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary/60 transition mb-1 text-base"
              />
              <div className="text-xs text-gray-600 mb-3">
                We'll send your eligibility results within 3-10 minutes. Patient information is kept confidential.
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-3 w-full py-3 bg-primary hover:bg-accent text-white font-semibold rounded-xl shadow transition text-base text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Processing...' : 'Get Eligibility Results'}</span>
                {isSubmitting && (
                  <svg className="animate-spin h-5 w-5 text-white ml-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                  </svg>
                )}
              </button>
              {submitProgress && (
                <div className="text-xs text-gray-600 text-center mt-2">{submitProgress}</div>
              )}
            </div>
          )}
        </form>

        {/* Divider */}
        <div className="my-8 border-t border-blue-100"></div>

        {/* Testimonials (only show on Step 1) */}
        {currentStep === 1 && <Testimonials />}

        {/* Privacy reassurance */}
        <PrivacySection />

        {/* Contact/help */}
        <div className="mb-2 text-center text-xs text-gray-600 flex items-center justify-center gap-2">
          <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4"/>
            <path d="M12 8h.01"/>
          </svg>
          <span>
            Need help? <a href="mailto:founder@adambilling.com" className="text-primary underline">Email us at founder@adambilling.com</a>
          </span>
        </div>
      </div>
    </div>
  )
}

export default EligibilityForm 