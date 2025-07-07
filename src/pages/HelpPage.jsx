import { useNavigate } from 'react-router-dom'
import { track } from '@vercel/analytics'

const HelpPage = () => {
  const navigate = useNavigate()

  const handleBackToDashboard = () => {
    track('Back to Dashboard', { from: 'help' })
    navigate('/')
  }

  const faqs = [
    {
      question: "How long does it take to get results?",
      answer: "Eligibility checks take 3-10 minutes, while dental coding results are delivered within 3-10 minutes. We prioritize accuracy and professional verification."
    },
    {
      question: "What file formats can I upload?",
      answer: "We accept PDF, JPG, PNG, DOC, and DOCX files up to 10MB each. Common documents include insurance cards, X-rays, treatment plans, and progress notes."
    },
    {
      question: "Is my patient information secure?",
      answer: "Yes, we are fully HIPAA compliant. All patient information is encrypted in transit and at rest. We never store sensitive information longer than necessary."
    },
    {
      question: "Do I need to create an account?",
      answer: "No account required! Simply provide your email address to receive results. This makes our service quick and accessible for all healthcare providers."
    },
    {
      question: "What insurance providers do you support?",
      answer: "We support all major insurance providers including Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Delta Dental, Humana, MetLife, and many others."
    },
    {
      question: "How accurate are the CDT codes?",
      answer: "Our dental coding service maintains a 99% accuracy rate. All codes are AI-generated and then verified by certified dental professionals."
    },
    {
      question: "Can I get a refund if I'm not satisfied?",
      answer: "We offer a satisfaction guarantee. If you're not happy with the results, contact us within 24 hours and we'll work to resolve any issues."
    },
    {
      question: "Do you offer bulk processing?",
      answer: "Yes! For practices with high volume needs, we offer bulk processing discounts. Contact us to discuss enterprise solutions."
    }
  ]

  const contactMethods = [
    {
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Email Support",
      description: "Get help via email",
      contact: "founder@adambilling.com",
      action: "mailto:founder@adambilling.com"
    },
    {
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Response Time",
      description: "We typically respond within",
      contact: "2-4 hours",
      action: null
    },
    {
      icon: (
        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Service Hours",
      description: "Available",
      contact: "Monday - Friday, 9AM - 6PM EST",
      action: null
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={handleBackToDashboard}
                className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors duration-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M15 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="font-medium">Back to Dashboard</span>
              </button>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Help & Support</h1>
                <p className="text-xs text-gray-500">Get assistance</p>
              </div>
            </div>
            
            <div className="w-20"></div> {/* Spacer for balance */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-8 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Help & Support
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get answers to common questions and learn how to make the most of our dental coding and eligibility services.
            </p>
          </div>

          {/* Quick Start Guide */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900">Quick Start Guide</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    Eligibility Check
                  </h3>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">1</span>
                      Enter patient information (name, DOB, member ID, insurance)
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">2</span>
                      Upload insurance cards or documents (optional)
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">3</span>
                      Provide your email address
                    </li>
                    <li className="flex items-start">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">4</span>
                      Receive results in 3-10 minutes
                    </li>
                  </ol>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center mr-3">
                      <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    Dental Coding
                  </h3>
                  <ol className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">1</span>
                      Describe dental procedures in detail
                    </li>
                    <li className="flex items-start">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">2</span>
                      Upload X-rays, treatment plans, or notes (optional)
                    </li>
                    <li className="flex items-start">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">3</span>
                      Provide your email address
                    </li>
                    <li className="flex items-start">
                      <span className="bg-emerald-100 text-emerald-800 text-xs font-medium px-2 py-1 rounded-full mr-3 mt-0.5">4</span>
                      Receive CDT codes within 3-10 minutes
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900">Frequently Asked Questions</h2>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-r from-green-50 to-teal-50 px-8 py-6 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-gray-900">Contact Information</h2>
            </div>
            <div className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {contactMethods.map((method, index) => (
                  <div key={index} className="text-center">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                      {method.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{method.description}</p>
                    {method.action ? (
                      <a
                        href={method.action}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {method.contact}
                      </a>
                    ) : (
                      <p className="text-gray-900 font-medium">{method.contact}</p>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-8 border-t border-gray-200 text-center">
                <p className="text-gray-600 mb-4">
                  Need immediate assistance? Send us an email and we'll get back to you as soon as possible.
                </p>
                <a
                  href="mailto:founder@adambilling.com?subject=Help%20Request%20-%20MedCheck%20Pro"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span>Send Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HelpPage 