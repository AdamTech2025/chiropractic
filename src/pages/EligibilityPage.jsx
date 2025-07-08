import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { track } from '@vercel/analytics'
import FileUpload from '../components/FileUpload'

// Comprehensive list of US Insurance Providers
const INSURANCE_PROVIDERS = [
  // Major National Insurers
  'Aetna',
  'Anthem',
  'Blue Cross Blue Shield',
  'Cigna',
  'Humana',
  'UnitedHealthcare',
  'Kaiser Permanente',
  
  // Dental Specific
  'Delta Dental',
  'MetLife Dental',
  'Guardian Dental',
  'Principal Dental',
  'Ameritas',
  'Assurant Dental',
  'Renaissance Dental',
  'Sun Life Dental',
  'Lincoln Financial Dental',
  'Aflac Dental',
  
  // Regional Blues Plans
  'Blue Cross Blue Shield of Alabama',
  'Blue Cross Blue Shield of Alaska',
  'Blue Cross Blue Shield of Arizona',
  'Blue Cross Blue Shield of Arkansas',
  'Blue Cross of California',
  'Blue Cross Blue Shield of Colorado',
  'Blue Cross Blue Shield of Connecticut',
  'Blue Cross Blue Shield of Delaware',
  'Blue Cross Blue Shield of Florida',
  'Blue Cross Blue Shield of Georgia',
  'Blue Cross Blue Shield of Hawaii',
  'Blue Cross of Idaho',
  'Blue Cross Blue Shield of Illinois',
  'Blue Cross Blue Shield of Indiana',
  'Blue Cross Blue Shield of Iowa',
  'Blue Cross Blue Shield of Kansas',
  'Blue Cross Blue Shield of Kentucky',
  'Blue Cross Blue Shield of Louisiana',
  'Blue Cross Blue Shield of Maine',
  'Blue Cross Blue Shield of Maryland',
  'Blue Cross Blue Shield of Massachusetts',
  'Blue Cross Blue Shield of Michigan',
  'Blue Cross Blue Shield of Minnesota',
  'Blue Cross Blue Shield of Mississippi',
  'Blue Cross Blue Shield of Missouri',
  'Blue Cross Blue Shield of Montana',
  'Blue Cross Blue Shield of Nebraska',
  'Blue Cross Blue Shield of Nevada',
  'Blue Cross Blue Shield of New Hampshire',
  'Blue Cross Blue Shield of New Jersey',
  'Blue Cross Blue Shield of New Mexico',
  'Blue Cross Blue Shield of New York',
  'Blue Cross Blue Shield of North Carolina',
  'Blue Cross Blue Shield of North Dakota',
  'Blue Cross Blue Shield of Ohio',
  'Blue Cross Blue Shield of Oklahoma',
  'Blue Cross Blue Shield of Oregon',
  'Blue Cross Blue Shield of Pennsylvania',
  'Blue Cross Blue Shield of Rhode Island',
  'Blue Cross Blue Shield of South Carolina',
  'Blue Cross Blue Shield of South Dakota',
  'Blue Cross Blue Shield of Tennessee',
  'Blue Cross Blue Shield of Texas',
  'Blue Cross Blue Shield of Utah',
  'Blue Cross Blue Shield of Vermont',
  'Blue Cross Blue Shield of Virginia',
  'Blue Cross Blue Shield of Washington',
  'Blue Cross Blue Shield of West Virginia',
  'Blue Cross Blue Shield of Wisconsin',
  'Blue Cross Blue Shield of Wyoming',
  
  // Other Major Insurers
  'Molina Healthcare',
  'Centene Corporation',
  'WellCare',
  'Health Net',
  'Independence Blue Cross',
  'Oscar Health',
  'Bright Health',
  'Friday Health Plans',
  'Ambetter',
  'Simply Healthcare',
  'Sunshine Health',
  'Buckeye Health Plan',
  'Care1st',
  'LA Care',
  'Inland Empire Health Plan',
  'Community Health Network',
  'SelectHealth',
  'Presbyterian Health Plan',
  'Blue Cross and Blue Shield of Minnesota',
  'Highmark',
  'CareFirst',
  'Excellus BlueCross BlueShield',
  'Capital BlueCross',
  'Florida Blue',
  'Caresource',
  'Medical Mutual',
  'Paramount Advantage',
  'SummaCare',
  'UPMC Health Plan',
  'Geisinger Health Plan',
  'Harvard Pilgrim Health Care',
  'Tufts Health Plan',
  'Blue Cross Blue Shield of Vermont',
  'MVP Health Care',
  'CDPHP',
  'Emblem Health',
  'Fidelis Care',
  'HealthFirst',
  'Oxford Health Plans',
  'United Healthcare of New York',
  'Horizon Blue Cross Blue Shield',
  'AmeriHealth',
  'Priority Health',
  'Blue Care Network',
  'Health Alliance Plan',
  'HealthPartners',
  'Medica',
  'PreferredOne',
  'UCare',
  'Quartz',
  'Dean Health Plan',
  'Group Health Cooperative',
  'Premera Blue Cross',
  'Community Health Plan of Washington',
  'PacificSource',
  'Regence',
  'Providence Health Plans',
  'Rocky Mountain Health Plans',
  'Denver Health Medical Plan',
  'New Mexico Health Connections',
  'Blue Cross Blue Shield of Kansas City',
  'Coventry Health Care',
  'HealthScope Benefits',
  'Celtic Insurance',
  'Time Insurance',
  'Trustmark',
  'National General',
  'Colonial Life',
  'Combined Insurance',
  'Gerber Life',
  'Manhattan Life',
  'Mutual of Omaha',
  'New York Life',
  'Northwestern Mutual',
  'Pacific Life',
  'Penn Mutual',
  'Principal Life',
  'Protective Life',
  'Prudential',
  'State Farm',
  'Transamerica',
  'Unum',
  'Washington National',
  'Globe Life',
  'American Family',
  'Allstate',
  'Farmers Insurance',
  'Liberty Mutual',
  'Nationwide',
  'Progressive',
  'USAA',
  'Auto-Owners Insurance',
  'Country Financial',
  'Erie Insurance',
  'Grange Insurance',
  'The Hartford',
  'Travelers',
  'American National',
  'Great American',
  'Great West',
  'John Hancock',
  'Jackson National Life',
  'Lincoln National',
  'MassMutual',
  'MetLife',
  'Voya Financial',
  'AIG',
  'Allianz',
  'American International Group',
  'Chubb',
  'CNA',
  'Zurich',
  'Other'
].sort()

// SearchableDropdown Component
const SearchableDropdown = ({ value, onChange, options, placeholder, className }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')

  // Handle both string options and object options with value/label
  const isObjectOptions = options.length > 0 && typeof options[0] === 'object' && options[0].hasOwnProperty('value')
  
  const filteredOptions = options.filter(option => {
    const searchText = isObjectOptions ? option.label : option
    return searchText.toLowerCase().includes(searchTerm.toLowerCase())
  })

  const handleSelect = (option) => {
    const selectedValue = isObjectOptions ? option.value : option
    onChange(selectedValue)
    setIsOpen(false)
    setSearchTerm('')
  }

  const handleInputChange = (e) => {
    const inputValue = e.target.value
    setSearchTerm(inputValue)
    onChange(inputValue)
    setIsOpen(true)
  }

  // Get display value for input
  const getDisplayValue = () => {
    if (value && isObjectOptions) {
      const selectedOption = options.find(option => option.value === value)
      return selectedOption ? selectedOption.label : value
    }
    return value || searchTerm
  }

  return (
    <div className="relative">
      <input
        type="text"
        value={getDisplayValue()}
        onChange={handleInputChange}
        onFocus={() => setIsOpen(true)}
        onBlur={() => setTimeout(() => setIsOpen(false), 200)}
        placeholder={placeholder}
        className={className}
        autoComplete="off"
      />
      
      {/* Dropdown Arrow */}
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg 
          className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm transition-colors duration-150"
                onMouseDown={() => handleSelect(option)}
              >
                {isObjectOptions ? option.label : option}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500 text-sm">
              No options found
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const EligibilityPage = ({ onSuccess }) => {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    patientName: '',
    dateOfBirth: '',
    dobMonth: '',
    dobDay: '',
    dobYear: '',
    groupNPI: '',
    groupTaxId: '',
    providerNPI: '',
    providerTaxId: '',
    memberId: '',
    insuranceName: '',
    notes: '',
    files: [],
    email: ''
  })
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitProgress, setSubmitProgress] = useState('')

  const handleBackToDashboard = () => {
    track('Back to Dashboard', { from: 'eligibility' })
    navigate('/')
  }

  const handleInputChange = (field, value) => {
    // Handle date of birth components
    if (field === 'dobMonth' || field === 'dobDay' || field === 'dobYear') {
      const newFormData = { ...formData, [field]: value }
      
      // Combine date components into dateOfBirth field
      if (newFormData.dobMonth && newFormData.dobDay && newFormData.dobYear) {
        newFormData.dateOfBirth = `${newFormData.dobMonth}/${newFormData.dobDay}/${newFormData.dobYear}`
      } else {
        newFormData.dateOfBirth = ''
      }
      
      setFormData(newFormData)
    } else {
      setFormData(prev => ({ ...prev, [field]: value }))
    }
    
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
    const hasPatientInfo = formData.patientName.trim() || formData.dateOfBirth.trim() || formData.dobMonth.trim() || formData.dobDay.trim() || formData.dobYear.trim() || formData.groupNPI.trim() || formData.providerNPI.trim() || formData.memberId.trim() || formData.insuranceName.trim()
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
    formDataToSend.append('dobMonth', formData.dobMonth)
    formDataToSend.append('dobDay', formData.dobDay)
    formDataToSend.append('dobYear', formData.dobYear)
    formDataToSend.append('groupNPI', formData.groupNPI)
    formDataToSend.append('groupTaxId', formData.groupTaxId)
    formDataToSend.append('providerNPI', formData.providerNPI)
    formDataToSend.append('providerTaxId', formData.providerTaxId)
    formDataToSend.append('memberId', formData.memberId)
    formDataToSend.append('insuranceName', formData.insuranceName)
    formDataToSend.append('notes', formData.notes)

    formData.files.forEach((file) => {
      formDataToSend.append('files', file)
    })

    // Debug logging to see what's being sent
    console.log('Sending eligibility form data:', {
      email: formData.email,
      patientName: formData.patientName,
      dateOfBirth: formData.dateOfBirth,
      dobMonth: formData.dobMonth,
      dobDay: formData.dobDay,
      dobYear: formData.dobYear,
      groupNPI: formData.groupNPI,
      groupTaxId: formData.groupTaxId,
      providerNPI: formData.providerNPI,
      providerTaxId: formData.providerTaxId,
      memberId: formData.memberId,
      insuranceName: formData.insuranceName,
      notes: formData.notes,
      filesCount: formData.files.length
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header with Back Button */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-1 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-medium text-sm sm:text-base">Back to Dashboard</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-bold text-gray-900">Eligibility Check</h1>
                <p className="text-xs text-gray-500 hidden sm:block">Insurance Verification</p>
              </div>
            </div>
            
            <a
              href="/help"
              onClick={(e) => {
                e.preventDefault()
                navigate('/help')
                track('Help Page Accessed', { from: 'eligibility' })
              }}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-1 sm:space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm hidden sm:inline">Need Help?</span>
              <span className="text-sm sm:hidden">Help</span>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-4 sm:pt-8 pb-8 sm:pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-8 sm:mb-12">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl sm:rounded-2xl mb-4 sm:mb-6">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 px-4">
              Insurance Eligibility Verification
            </h1>
            
            {/* Features */}
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8 space-y-3 sm:space-y-0 mt-6 sm:mt-8 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>100% Accuracy</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>HIPAA compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>No login required</span>
              </div>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            {/* Progress Bar */}
            <div className="bg-gray-50 px-4 sm:px-8 py-3 sm:py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 sm:space-x-4">
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                    currentStep >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    1
                  </div>
                  <div className={`h-0.5 w-8 sm:w-16 ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
                  <div className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-semibold ${
                    currentStep >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    2
                  </div>
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  Step {currentStep} of 2
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 lg:p-8">
              {/* Step 1: Patient Information */}
              {currentStep === 1 && (
                <div className="space-y-4 sm:space-y-6">
                  {/* Simple Header */}
                  <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">What patient information do you have?</h2>
                    <p className="text-gray-600 text-sm sm:text-base px-2">Type the details below or upload insurance documents</p>
                  </div>

                  {/* Simplified Combined Input Area */}
                  <div className="bg-gray-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border-2 border-gray-200 hover:border-blue-300 transition-all duration-200">
                    {/* Patient Information Fields - Simplified Layout */}
                    <div className="space-y-3 sm:space-y-4">
                      {/* Row 1: Name and Member ID */}
                      <div className="grid grid-cols-1 gap-3 sm:gap-4">
                        <input
                          type="text"
                          value={formData.patientName}
                          onChange={(e) => handleInputChange('patientName', e.target.value)}
                          placeholder="Patient name (e.g., John Smith)"
                          className="w-full px-3 sm:px-4 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400"
                        />
                        <input
                          type="text"
                          value={formData.memberId}
                          onChange={(e) => handleInputChange('memberId', e.target.value)}
                          placeholder="Member ID (from insurance card)"
                          className="w-full px-3 sm:px-4 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400"
                        />
                      </div>

                      {/* Row 2: Date of Birth */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                          Date of Birth
                        </label>
                        <div className="grid grid-cols-3 gap-2 sm:gap-3">
                          <SearchableDropdown
                            value={formData.dobMonth}
                            onChange={(value) => handleInputChange('dobMonth', value)}
                            options={[
                              { value: '01', label: 'Jan' },
                              { value: '02', label: 'Feb' },
                              { value: '03', label: 'Mar' },
                              { value: '04', label: 'Apr' },
                              { value: '05', label: 'May' },
                              { value: '06', label: 'Jun' },
                              { value: '07', label: 'Jul' },
                              { value: '08', label: 'Aug' },
                              { value: '09', label: 'Sep' },
                              { value: '10', label: 'Oct' },
                              { value: '11', label: 'Nov' },
                              { value: '12', label: 'Dec' }
                            ]}
                            placeholder="Month"
                            className="w-full px-2 sm:px-3 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400"
                          />
                          <SearchableDropdown
                            value={formData.dobDay}
                            onChange={(value) => handleInputChange('dobDay', value)}
                            options={Array.from({ length: 31 }, (_, i) => ({
                              value: (i + 1).toString().padStart(2, '0'),
                              label: (i + 1).toString()
                            }))}
                            placeholder="Day"
                            className="w-full px-2 sm:px-3 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400"
                          />
                          <SearchableDropdown
                            value={formData.dobYear}
                            onChange={(value) => handleInputChange('dobYear', value)}
                            options={Array.from({ length: 100 }, (_, i) => {
                              const year = new Date().getFullYear() - i
                              return { value: year.toString(), label: year.toString() }
                            })}
                            placeholder="Year"
                            className="w-full px-2 sm:px-3 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400"
                          />
                        </div>
                      </div>

                      {/* Row 3: Insurance Provider */}
                      <div>
                        <SearchableDropdown
                          value={formData.insuranceName}
                          onChange={(value) => handleInputChange('insuranceName', value)}
                          options={INSURANCE_PROVIDERS}
                          placeholder="Insurance name (e.g., Blue Cross, Aetna)"
                          className="w-full px-3 sm:px-4 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400"
                        />
                      </div>

                      {/* Optional Provider Info - Collapsed by default */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <input
                          type="text"
                          value={formData.groupNPI}
                          onChange={(e) => handleInputChange('groupNPI', e.target.value)}
                          placeholder="Group NPI (optional)"
                          maxLength="10"
                          className="w-full px-3 sm:px-4 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400"
                        />
                        <input
                          type="text"
                          value={formData.groupTaxId}
                          onChange={(e) => handleInputChange('groupTaxId', e.target.value)}
                          placeholder="Group Tax ID (optional)"
                          maxLength="9"
                          className="w-full px-3 sm:px-4 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400"
                        />
                      </div>

                      {/* Provider Info Row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <input
                          type="text"
                          value={formData.providerNPI}
                          onChange={(e) => handleInputChange('providerNPI', e.target.value)}
                          placeholder="Provider NPI (optional)"
                          maxLength="10"
                          className="w-full px-3 sm:px-4 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400"
                        />
                        <input
                          type="text"
                          value={formData.providerTaxId}
                          onChange={(e) => handleInputChange('providerTaxId', e.target.value)}
                          placeholder="Provider Tax ID (optional)"
                          maxLength="9"
                          className="w-full px-3 sm:px-4 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400"
                        />
                      </div>

                      {/* Additional Notes */}
                      <textarea
                        value={formData.notes}
                        onChange={(e) => handleInputChange('notes', e.target.value)}
                        placeholder="Additional notes (optional)..."
                        rows={2}
                        className="w-full px-3 sm:px-4 py-3 border-0 bg-white rounded-lg sm:rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm sm:text-base placeholder-gray-400 resize-none"
                      />
                    </div>

                    {/* Simple File Upload */}
                    <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-gray-300">
                      <div className="text-center">
                        <FileUpload 
                          files={formData.files}
                          onFilesChange={handleFilesChange}
                          onFileRemove={handleFileRemove}
                        />
                        {formData.files.length === 0 && (
                          <p className="text-xs sm:text-sm text-gray-500 mt-2">
                            Or drag & drop insurance cards here
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Help - Simplified */}
                  <div className="bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                    <h3 className="font-medium text-blue-800 mb-2 text-sm">What you need:</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs text-blue-700">
                      <div>• Patient name & date of birth</div>
                      <div>• Insurance member ID</div>
                      <div>• Insurance provider name</div>
                      <div>• Or just upload insurance card</div>
                    </div>
                  </div>

                  {/* Error Message */}
                  {errors.step1 && (
                    <div className="bg-red-50 border border-red-200 rounded-lg sm:rounded-xl p-3 text-center">
                      <span className="text-red-700 text-sm">{errors.step1}</span>
                    </div>
                  )}
                  
                  {/* Simple Continue Button */}
                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 sm:py-4 px-6 rounded-lg sm:rounded-xl transition-all duration-200 text-base sm:text-lg"
                  >
                    Check Eligibility
                  </button>
                </div>
              )}

              {/* Step 2: Email - Simplified */}
              {currentStep === 2 && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Where should we send your results?</h2>
                    <p className="text-gray-600 text-sm sm:text-base px-2">You'll receive eligibility results in 60 minutes</p>
                  </div>

                  {/* Simple Email Input */}
                  <div className="max-w-md mx-auto">
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                      placeholder="your.email@example.com"
                      className="w-full px-3 sm:px-4 py-3 sm:py-4 text-center border-2 border-gray-200 rounded-lg sm:rounded-xl focus:border-blue-500 focus:ring-0 transition-all duration-200 text-base sm:text-lg"
                    />
                  </div>

                  {/* Simple Trust Indicator */}
                  <div className="text-center bg-blue-50 rounded-lg sm:rounded-xl p-3 sm:p-4 max-w-md mx-auto">
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0 text-xs sm:text-sm text-blue-700">
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
                        <span>HIPAA Secure</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>60 min</span>
                      </div>
                    </div>
                  </div>

                  {/* Simple Action Buttons */}
                  <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg sm:rounded-xl transition-all duration-200 text-sm sm:text-base"
                    >
                      Back
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 sm:flex-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg sm:rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 text-sm sm:text-base"
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
                      <div className="inline-flex items-center space-x-2 text-blue-600 bg-blue-50 px-3 py-2 rounded-full text-xs sm:text-sm">
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
          <div className="mt-8 sm:mt-12 text-center">
            <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-8 space-y-4 sm:space-y-0 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Secure & HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span>Verified by Healthcare Professionals</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Fast 60 Minute Turnaround</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default EligibilityPage 