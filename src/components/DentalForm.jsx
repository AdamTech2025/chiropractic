import { useState } from 'react'
import { track } from '@vercel/analytics'
import FileUpload from './FileUpload'
import Testimonials from './Testimonials'
import PrivacySection from './PrivacySection'

const DentalForm = ({ onSuccess }) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    notes: '',
    email: '',
    files: []
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState('')

  const handleNotesChange = (e) => {
    setFormData(prev => ({ ...prev, notes: e.target.value }))
    if (errors.step1) {
      setErrors(prev => ({ ...prev, step1: '' }))
    }
  }

  const handleEmailChange = (e) => {
    setFormData(prev => ({ ...prev, email: e.target.value }))
  }

  const handleFilesChange = (files) => {
    setFormData(prev => ({ ...prev, files }))
    if (errors.step1) {
      setErrors(prev => ({ ...prev, step1: '' }))
    }
    // Track file upload event
    if (files.length > 0) {
      track('File Uploaded', { files: files.length })
    }
  }

  const handleFileRemove = (index) => {
    const newFiles = formData.files.filter((_, i) => i !== index)
    setFormData(prev => ({ ...prev, files: newFiles }))
    track('File Removed')
  }

  const handleNextStep = () => {
    const notes = formData.notes.trim()
    if (!notes && formData.files.length === 0) {
      setErrors({ step1: 'Paste your note or upload a file.' })
      track('Form Validation Error', { step: 1 })
      return
    }
    
    setErrors({})
    track('Step 1 Completed', { 
      hasNotes: !!notes, 
      hasFiles: formData.files.length > 0,
      fileCount: formData.files.length 
    })
    setCurrentStep(2)
    track('Reached Step 2')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (isSubmitting) return

    track('Form Submission Started')
    
    setIsSubmitting(true)
    setSubmitProgress('Uploading files and sending email...')
    
    const formDataToSend = new FormData()
    formDataToSend.append('notes', formData.notes)
    formDataToSend.append('email', formData.email)
    
    formData.files.forEach(file => {
      formDataToSend.append('files', file)
    })

    // Progress messages
    const progressMessages = [
      'Uploading files and sending email...',
      'Processing your submission...',
      'Almost done...'
    ]
    let progressIndex = 0
    
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
      const apiUrl = import.meta.env.DEV ? 'http://localhost:3001/api/upload' : '/api/upload'
      const response = await fetch(apiUrl, {
        method: 'POST',
        body: formDataToSend
      })

      clearInterval(progressInterval)
      
      if (response.ok) {
        track('Form Submitted Successfully', { method: 'api' })
        track('Form Completed')
        onSuccess()
      } else {
        track('Form Submission Error', { status: response.status })
        const errorText = await response.text()
        alert('Error: ' + errorText)
      }
    } catch (error) {
      clearInterval(progressInterval)
      track('Form Submission Failed', { error: error.message })
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
          src="https://img.icons8.com/ios-filled/100/2563eb/tooth.png" 
          alt="Dental Logo" 
          className="w-12 h-12 mb-2" 
        />
        <h1 className="text-2xl font-extrabold text-primary tracking-tight text-center">
          Get Your Dental Code with 100% accuracy & Free
        </h1>
        <div className="text-gray-700 text-base mt-2 text-center max-w-md"></div>
      </div>

      <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-card px-6 py-7 border border-blue-100">
        <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="off">
          {/* Step 1: Textarea and upload */}
          {currentStep === 1 && (
            <div className="step step-1">
              <div className="font-semibold text-primary text-lg mb-3">Paste text or upload file</div>
              <div className="relative">
                <textarea
                  value={formData.notes}
                  onChange={handleNotesChange}
                  placeholder="Paste your treatment note here or Upload any files, like Voice notes, PDFs or Documents"
                  className="w-full border border-blue-200 rounded-xl px-5 py-7 pb-28 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary/60 resize-vertical min-h-[180px] transition shadow-card text-base"
                />
                <FileUpload 
                  files={formData.files}
                  onFilesChange={handleFilesChange}
                  onFileRemove={handleFileRemove}
                />
              </div>
              <div className="text-xs text-gray-500 text-center mt-1">You can add multiple files.</div>
              {errors.step1 && (
                <div className="text-red-600 text-sm mb-2">{errors.step1}</div>
              )}
              <button
                type="button"
                onClick={handleNextStep}
                className="mt-5 w-full py-3 bg-primary hover:bg-accent text-white font-semibold rounded-xl shadow transition text-base text-lg flex items-center justify-center gap-2"
              >
                <span>Next</span>
              </button>
              <div className="text-xs text-gray-600 text-center mt-2">
                Free to use. No commitment. Just better billing.
              </div>
            </div>
          )}

          {/* Step 2: Email only */}
          {currentStep === 2 && (
            <div className="step step-2">
              <div className="font-semibold text-primary text-base mb-3 text-center">
                Where should we send your code?
              </div>
              <input
                type="email"
                value={formData.email}
                onChange={handleEmailChange}
                required
                placeholder="Personal Email (required)"
                className="w-full border border-blue-200 rounded-lg px-3 py-2 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-primary/60 transition mb-1 text-base"
              />
              <div className="text-xs text-gray-600 mb-3">
                We will receive the codes via email, with all patient info masked. We do not store patient information.
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-3 w-full py-3 bg-primary hover:bg-accent text-white font-semibold rounded-xl shadow transition text-base text-lg flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <span>{isSubmitting ? 'Sending...' : 'Submit'}</span>
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

export default DentalForm 