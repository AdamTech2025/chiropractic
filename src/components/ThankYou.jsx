const ThankYou = ({ serviceType = 'dental', onBack }) => {
  const getServiceDetails = () => {
    switch (serviceType) {
      case 'eligibility':
        return {
          title: 'Eligibility Check Submitted!',
          subtitle: 'We are on calling your payer',

          response: 'You will receive your eligibility results via email within 60 minutes.',
          nextSteps: 'Our team is verifying your insurance information with the latest provider databases. Results will be delivered to your email shortly!',
          icon: (
            <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          bgColor: 'from-blue-50 to-indigo-50',
          borderColor: 'border-blue-200',
          accentColor: 'text-blue-600'
        }
      case 'dental':
      default:
        return {
          title: 'Dental Coding Request Submitted!',
          subtitle: 'Your request is being processed',
          
          response: 'You will receive accurate CDT codes via email within 3-10 minutes.',
          nextSteps: 'Our AI-powered system will analyze your dental procedures and provide accurate CDT codes. However, you will receive the results within 3-10 minutes. Get accurate results quickly with professional verification!',
          icon: (
            <svg className="w-12 h-12 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ),
          bgColor: 'from-emerald-50 to-teal-50',
          borderColor: 'border-emerald-200',
          accentColor: 'text-emerald-600'
        }
    }
  }

  const details = getServiceDetails()

  return (
    <div className="max-w-2xl mx-auto">
      <div className={`bg-gradient-to-br ${details.bgColor} rounded-3xl shadow-xl border ${details.borderColor} overflow-hidden`}>
        {/* Header */}
        <div className="text-center px-8 pt-8 pb-6">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6">
            {details.icon}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{details.title}</h1>
          <p className={`text-lg font-medium ${details.accentColor} mb-4`}>{details.subtitle}</p>
          <p className="text-gray-700 text-base leading-relaxed">
            {details.description}
          </p>
        </div>

        {/* Main Content */}
        <div className="px-8 pb-8">
          {/* Timeline/Status */}
          

          {/* Key Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Delivery Time</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                Expected delivery: {serviceType === 'eligibility' ? '60 minutes' : '60 minutes'}
              </div>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <div className="flex items-center space-x-2 mb-2">
                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Delivery Method</span>
              </div>
              <p className="text-sm text-gray-600">Email notification</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            {/* Secondary Actions - Smaller and less prominent */}
            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={() => {
                  // Navigate back to dashboard
                  window.location.href = '/';
                }}
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Back to Dashboard</span>
              </button>
              
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M12 4v16m8-8H4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Submit Another Request</span>
                </button>
              )}
              
              <a
                href="mailto:founder@adambilling.com"
                className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-600 font-medium py-2 px-4 rounded-lg transition-all duration-200 text-sm flex items-center justify-center space-x-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>Need Help?</span>
              </a>
            </div>

            {/* Main Create Account Button - Prominent single button */}
            {(serviceType === 'eligibility' || serviceType === 'dental') && (
              <div className="pt-4 border-t border-white/30">
                <button
                  onClick={() => {
                    // Track the create account click
                    if (window.gtag) {
                      window.gtag('event', 'create_account_click', {
                        event_category: 'conversion',
                        event_label: `${serviceType}_results_page`
                      });
                    }
                    // Show a message instead of redirecting
                    alert('Account creation feature coming soon! You can access your results via the email we sent you.');
                  }}
                  className={`w-full bg-gradient-to-r ${
                    serviceType === 'eligibility' 
                      ? 'from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700' 
                      : 'from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                  } text-white font-bold py-4 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3 transform hover:scale-[1.02] text-lg`}
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Create Your Secure Account</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M9 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            )}
          </div>

          {/* Create Account Benefits - Simplified and cleaner */}
          {(serviceType === 'eligibility' || serviceType === 'dental') && (
            <div className="mt-6 bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-white/50">
              <h4 className="font-semibold text-gray-900 text-sm mb-3 text-center">Account Benefits</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-700">
                {serviceType === 'eligibility' ? (
                  <>
                    <div className="flex items-center space-x-2">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Instant access to results</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>HIPAA-compliant security</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Batch eligibility checks</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-3 h-3 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>24/7 expert support</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center space-x-2">
                      <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Instant CDT code results</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Custom procedure templates</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Expert validation</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <span>Priority support</span>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="bg-white/30 backdrop-blur-sm px-8 py-4 border-t border-white/50">
          <div className="flex items-center justify-center space-x-6 text-xs text-gray-600">
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Secure & HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-1">
              <svg className="w-3 h-3 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Professional Verification</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ThankYou 