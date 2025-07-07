import { useNavigate } from 'react-router-dom'
import { track } from '@vercel/analytics'
import { useState, useEffect } from 'react'

const Dashboard = () => {
  const navigate = useNavigate()
  const [currentReview, setCurrentReview] = useState(0)

  const handleServiceClick = (service) => {
    track('Dashboard Service Selected', { service })
    navigate(`/${service}`)
  }

  // 30+ realistic testimonials for chiropractic practice
  const testimonials = [
    {
      name: "Dr. Sarah Martinez",
      role: "Chiropractor",
      location: "Austin, TX",
      review: "This platform has been a game-changer for my practice! The patient management system is incredible and it saves me hours every week. I used to struggle with complex scheduling scenarios, but now I feel confident managing my entire practice.",
      rating: 5,
      avatar: "SM"
    },
    {
      name: "Jennifer Chen",
      role: "Chiropractic Assistant",
      location: "San Francisco, CA",
      review: "I was skeptical at first, but after using this for 6 months, I'm blown away. The patient intake process is streamlined and has prevented so many scheduling conflicts. My stress levels have dropped significantly!",
      rating: 5,
      avatar: "JC"
    },
    {
      name: "Dr. Michael Rodriguez",
      role: "Sports Chiropractor",
      location: "Miami, FL",
      review: "Finally, a practice management solution that understands sports chiropractic needs! The treatment tracking is always accurate, and the patient portal gives me peace of mind. Worth every penny.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Lisa Thompson",
      role: "Practice Manager",
      location: "Seattle, WA",
      review: "Our patient satisfaction has increased by 40% since we started using this service. The team loves how user-friendly it is - no more guessing games with appointment scheduling!",
      rating: 5,
      avatar: "LT"
    },
    {
      name: "Dr. Amanda Foster",
      role: "Family Chiropractor",
      location: "Denver, CO",
      review: "As a busy mom and chiropractor, I need tools that work flawlessly. This platform delivers every time. The customer support is also fantastic - they genuinely care about helping us succeed.",
      rating: 5,
      avatar: "AF"
    },
    {
      name: "Robert Kim",
      role: "Chiropractic Office Manager",
      location: "Phoenix, AZ",
      review: "I've tried many practice management platforms, but this one stands out. The interface is intuitive, the results are reliable, and it's saved our practice thousands in administrative costs. Highly recommended!",
      rating: 5,
      avatar: "RK"
    },
    {
      name: "Dr. Patricia Williams",
      role: "Rehabilitation Specialist",
      location: "Boston, MA",
      review: "The accuracy for tracking patient progress is phenomenal. I used to spend 30 minutes per complex case - now it takes 5 minutes and I'm more confident than ever. This is the future of chiropractic practice management!",
      rating: 5,
      avatar: "PW"
    },
    {
      name: "Carlos Mendoza",
      role: "Patient Coordinator",
      location: "Los Angeles, CA",
      review: "Working with patient scheduling used to be my nightmare. Now I actually enjoy my job! The appointment system is so thorough, and I rarely have to deal with conflicts anymore.",
      rating: 5,
      avatar: "CM"
    },
    {
      name: "Dr. Rachel Green",
      role: "Wellness Chiropractor",
      location: "Chicago, IL",
      review: "I was drowning in paperwork before finding this platform. Now my confidence is through the roof! My patients are happier because their appointments run smoothly. Thank you for saving my sanity!",
      rating: 5,
      avatar: "RG"
    },
    {
      name: "Maria Santos",
      role: "Treatment Coordinator",
      location: "Houston, TX",
      review: "The real-time scheduling system is a lifesaver! I can give patients accurate availability immediately instead of making them wait. This has transformed our patient experience completely.",
      rating: 5,
      avatar: "MS"
    },
    {
      name: "Dr. David Park",
      role: "Sports Medicine Chiropractor",
      location: "San Diego, CA",
      review: "Complex athletic injury cases used to stress me out because of documentation requirements. This platform handles even the most intricate treatments with ease. My practice revenue has increased significantly!",
      rating: 5,
      avatar: "DP"
    },
    {
      name: "Ashley Johnson",
      role: "Front Desk Coordinator",
      location: "Portland, OR",
      review: "I love how this makes me look like a pro in front of patients! I can instantly check their treatment history and schedule follow-ups. No more awkward 'let me check and call you back' moments.",
      rating: 5,
      avatar: "AJ"
    },
    {
      name: "Dr. Kevin O'Brien",
      role: "Pediatric Chiropractor",
      location: "Nashville, TN",
      review: "The pediatric treatment tracking is unmatched. I've been practicing for 20 years and this is the most reliable practice management tool I've ever used. It's like having an assistant on my team 24/7.",
      rating: 5,
      avatar: "KO"
    },
    {
      name: "Stephanie Liu",
      role: "Massage Therapist",
      location: "Las Vegas, NV",
      review: "Even as a massage therapist working with the chiropractors, I appreciate how this helps our clinic run smoothly. Patients are less stressed about appointments, and the doctors are happier. It's created such a positive work environment!",
      rating: 5,
      avatar: "SL"
    },
    {
      name: "Dr. James Anderson",
      role: "Pain Management Specialist",
      location: "Atlanta, GA",
      review: "Pain management treatment plans involve complex tracking sequences. This platform gets it right every single time. My treatment coordinators are more confident, and patients trust our care plans completely.",
      rating: 5,
      avatar: "JA"
    },
    {
      name: "Monica Garcia",
      role: "Clinic Manager",
      location: "Dallas, TX",
      review: "I manage 3 chiropractic clinics, and this platform has made my job so much easier. The consistency across different treatment types is remarkable. I sleep better at night knowing our operations are solid!",
      rating: 5,
      avatar: "MG"
    },
    {
      name: "Dr. Nicole Turner",
      role: "Holistic Chiropractor",
      location: "Minneapolis, MN",
      review: "Holistic treatment planning can be complex, but this system handles it beautifully. My patients get their treatments scheduled faster, and I spend more time doing what I love - helping patients heal, not fighting with paperwork.",
      rating: 5,
      avatar: "NT"
    },
    {
      name: "Brandon Walsh",
      role: "Practice Administrator",
      location: "Tampa, FL",
      review: "ROI is incredible! We've eliminated virtually all scheduling conflicts and administrative errors. The time savings alone pays for the service, but the peace of mind is priceless. Best investment we've made in years.",
      rating: 5,
      avatar: "BW"
    },
    {
      name: "Dr. Samantha Lee",
      role: "Wellness Chiropractor",
      location: "San Antonio, TX",
      review: "Wellness programs often have complex scheduling needs. This platform navigates them perfectly! My patients know exactly what to expect with their treatment plans, which has improved our patient retention rate dramatically.",
      rating: 5,
      avatar: "SL2"
    },
    {
      name: "Thomas Rivera",
      role: "Patient Services Specialist",
      location: "Philadelphia, PA",
      review: "I process hundreds of appointments weekly, and this tool never lets me down. The accuracy is phenomenal, and the speed allows me to help more patients. I actually look forward to work now!",
      rating: 5,
      avatar: "TR"
    },
    {
      name: "Dr. Emily Clark",
      role: "Family Chiropractor",
      location: "Cleveland, OH",
      review: "As a new practice owner, I was terrified of administrative mistakes. This platform gave me the confidence to focus on patient care instead of worrying about scheduling errors. It's been my security blanket!",
      rating: 5,
      avatar: "EC"
    },
    {
      name: "Diana Patel",
      role: "Treatment Coordinator",
      location: "Sacramento, CA",
      review: "Explaining treatment plans to patients is so much easier now! The patient portal is detailed and easy to use, helping patients understand their care journey. Our treatment acceptance has soared!",
      rating: 5,
      avatar: "DP2"
    },
    {
      name: "Dr. Mark Thompson",
      role: "Injury Rehabilitation Specialist",
      location: "Kansas City, MO",
      review: "Injury rehabilitation is complex, but this system makes it simple. I've seen a 35% increase in successful treatment outcomes since we started using this. My patients are getting the care they need without administrative hassles.",
      rating: 5,
      avatar: "MT"
    },
    {
      name: "Victoria Chang",
      role: "Office Manager",
      location: "Indianapolis, IN",
      review: "This platform has transformed our entire workflow. Staff morale is up because they're not constantly dealing with scheduling conflicts. Patients are happier, and our operations are more predictable. Win-win-win!",
      rating: 5,
      avatar: "VC"
    },
    {
      name: "Dr. Christopher Davis",
      role: "Sports Chiropractor",
      location: "Charlotte, NC",
      review: "I was spending 2 hours daily on administrative tasks. Now it takes 20 minutes! The extra time with my family is invaluable. This service has literally given me my life back.",
      rating: 5,
      avatar: "CD"
    },
    {
      name: "Isabella Rodriguez",
      role: "Chiropractic Assistant",
      location: "Milwaukee, WI",
      review: "Even though I'm not directly involved in treatment planning, I see how much happier our patients are when their appointments run smoothly. The whole office atmosphere has improved since we started using this!",
      rating: 5,
      avatar: "IR"
    },
    {
      name: "Dr. Andrew Mitchell",
      role: "Pediatric Chiropractor",
      location: "Oklahoma City, OK",
      review: "Parents are already stressed about their children's health. This platform eliminates the appointment stress completely. Families can focus on their child's treatment instead of worrying about scheduling.",
      rating: 5,
      avatar: "AM"
    },
    {
      name: "Rachel Martinez",
      role: "Patient Care Specialist",
      location: "New Orleans, LA",
      review: "I've worked in chiropractic care for 15 years, and this is revolutionary. The learning curve was minimal, but the impact was immediate. I feel like I've leveled up professionally!",
      rating: 5,
      avatar: "RM"
    },
    {
      name: "Dr. Lisa Wang",
      role: "Pain Management Chiropractor",
      location: "Salt Lake City, UT",
      review: "Complex pain management used to give me anxiety attacks. Now I manage treatment plans with complete confidence. My success rate is nearly 100%, and patients get their care coordinated quickly. Amazing!",
      rating: 5,
      avatar: "LW"
    },
    {
      name: "Joshua Brown",
      role: "Multi-Practice Owner",
      location: "Richmond, VA",
      review: "As someone who owns multiple chiropractic practices, consistency is crucial. This platform delivers the same high-quality results across all locations. It's helped standardize our operations beautifully.",
      rating: 5,
      avatar: "JB"
    },
    {
      name: "Dr. Melissa Taylor",
      role: "Holistic Chiropractor",
      location: "Tucson, AZ",
      review: "I almost left chiropractic because of administrative frustrations. This platform saved my career! I'm passionate about healing again because I can focus on patient care instead of paperwork nightmares.",
      rating: 5,
      avatar: "MT2"
    },
    {
      name: "Carmen Flores",
      role: "Appointment Coordinator",
      location: "Fresno, CA",
      review: "My job satisfaction has skyrocketed! I used to dread coming to work because of scheduling headaches. Now I'm the hero who keeps everyone's appointments running smoothly. This tool made me love my job again!",
      rating: 5,
      avatar: "CF"
    }
  ]

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % testimonials.length)
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [testimonials.length])

  const services = [
    {
      id: 'eligibility',
      title: 'Insurance Eligibility',
      subtitle: 'We call the insurance for you, so you don\'t have to be hold',
      icon: (
        <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      features: ['We support all payers', 'HIPAA compliant', 'summarize results within 1 hour'],
      gradient: 'from-blue-500 to-indigo-600',
      hoverGradient: 'from-blue-600 to-indigo-700',
      bgGradient: 'from-blue-50 to-indigo-50',
      borderColor: 'border-blue-200'
    }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">ChiroWell Pro</h1>
                <p className="text-xs text-gray-500">Professional Chiropractic Solutions</p>
              </div>
            </div>
            
            <a
              href="/help"
              onClick={(e) => {
                e.preventDefault()
                navigate('/help')
                track('Help Page Accessed', { from: 'dashboard' })
              }}
              className="text-gray-500 hover:text-blue-600 transition-colors duration-200 flex items-center space-x-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm">Need Help?</span>
            </a>
          </div>
        </div>
      </header>

      <div className="text-center mb-16">
      
        <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
        </p>
      </div>

      {/* Main Dashboard Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
        <div className="max-w-6xl mx-auto w-full">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Transform Your Chiropractic Practice
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto"> 
              Streamline patient care, enhance treatment outcomes, and grow your practice with our comprehensive chiropractic management platform.
            </p>
          </div>

          {/* Service Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 max-w-3xl mx-auto">
            {services.map((service) => (
              <div
                key={service.id}
                onClick={() => handleServiceClick(service.id)}
                className={`
                  group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
                  bg-gradient-to-br ${service.bgGradient} rounded-3xl border-2 ${service.borderColor}
                  p-8 text-center relative overflow-hidden
                `}
              >
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white to-transparent transform rotate-12 scale-150"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-lg mb-6 group-hover:shadow-xl transition-shadow duration-300">
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h2>
                  <p className="text-lg text-gray-600 mb-4">
                    {service.subtitle}
                  </p>

                  {/* Description */}
                  {/* <p className="text-gray-700 mb-6 leading-relaxed">
                    Complete patient management system designed specifically for chiropractic practices. Track treatments, manage appointments, and enhance patient outcomes with our comprehensive platform.
                  </p> */}

                  {/* Features */}
                  <div className="flex items-center justify-center space-x-6 mb-8">
                    {service.features.map((feature, index) => (
                      <div key={index} className="flex items-center space-x-1">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-gray-600 font-medium">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <button className={`
                    w-full bg-gradient-to-r ${service.gradient} hover:${service.hoverGradient}
                    text-white font-semibold py-4 px-8 rounded-xl
                    transition-all duration-300 shadow-lg hover:shadow-xl
                    group-hover:scale-105
                  `}>
                    <span className="flex items-center justify-center space-x-2">
                      <span>Check Eligibility</span>
                      <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path d="M13 7l5 5m0 0l-5 5m5-5H6" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
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
                <span>Professional Excellence</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="w-5 h-5 text-purple-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Fast & Reliable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="w-full max-w-7xl mx-auto mt-20 px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full mb-6">
              <span className="text-blue-600 font-semibold text-sm">TESTIMONIALS</span>
            </div>
            <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Loved by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">1000+</span> Chiropractors
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              See how chiropractic professionals are transforming their practices with our platform
            </p>
          </div>

          {/* Modern Testimonial Card */}
          <div className="relative max-w-5xl mx-auto mb-16">
            {/* Main Testimonial Card */}
            <div className="relative bg-white/70 backdrop-blur-xl rounded-3xl p-8 md:p-12 shadow-2xl border border-white/20 overflow-hidden">
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 animate-pulse"></div>
              
              {/* Floating Elements */}
              <div className="absolute top-6 right-6 w-20 h-20 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full blur-xl animate-bounce"></div>
              <div className="absolute bottom-6 left-6 w-16 h-16 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>

              {/* Content */}
              <div className="relative z-10">
                {/* Rating Stars with Animation */}
                <div className="flex justify-center mb-8">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="transform transition-all duration-300 hover:scale-125"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <svg className="w-7 h-7 text-yellow-400 fill-current drop-shadow-sm animate-pulse" viewBox="0 0 24 24">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                      </svg>
                    </div>
                  ))}
                </div>

                {/* Quote Icon */}
                <div className="flex justify-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                    </svg>
                  </div>
                </div>

                {/* Review Text with Typing Animation Effect */}
                <div className="text-center mb-10">
                  <blockquote className="text-2xl md:text-3xl text-gray-800 font-medium leading-relaxed mb-2 transition-all duration-1000 ease-out">
                    "{testimonials[currentReview].review}"
                  </blockquote>
                </div>

                {/* Author Card */}
                <div className="flex items-center justify-center">
                  <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/30 flex items-center space-x-4 max-w-md">
                    {/* Avatar with Gradient Ring */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full animate-spin-slow"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-lg m-1 shadow-inner">
                        {testimonials[currentReview].avatar}
                      </div>
                    </div>
                    
                    {/* Author Info */}
                    <div className="text-left">
                      <div className="font-bold text-gray-900 text-lg mb-1">
                        {testimonials[currentReview].name}
                      </div>
                      <div className="text-blue-600 font-semibold text-sm mb-1">
                        {testimonials[currentReview].role}
                      </div>
                      <div className="text-gray-500 text-sm flex items-center">
                        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {testimonials[currentReview].location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center mt-8 space-x-6">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentReview(currentReview === 0 ? testimonials.length - 1 : currentReview - 1)}
                className="group flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/30 hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Dots Indicator */}
              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentReview(index)}
                    className={`transition-all duration-300 ${
                      index === currentReview 
                        ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-lg' 
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400 rounded-full hover:scale-125'
                    }`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={() => setCurrentReview((currentReview + 1) % testimonials.length)}
                className="group flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg border border-white/30 hover:bg-white transition-all duration-300 hover:scale-110"
              >
                <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Review Counter */}
            <div className="text-center mt-6">
              <div className="inline-flex items-center px-4 py-2 bg-white/60 backdrop-blur-sm rounded-full shadow-sm border border-white/20">
                <span className="text-gray-600 text-sm font-medium">
                  {currentReview + 1} of {testimonials.length} reviews
                </span>
              </div>
            </div>
          </div>

          {/* Modern Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "1000+", label: "Happy Chiropractic Professionals", color: "from-blue-500 to-blue-600", icon: "👨‍⚕️" },
              { number: "98.5%", label: "Patient Satisfaction Rate", color: "from-emerald-500 to-emerald-600", icon: "✅" },
              { number: "15k+", label: "Successful Treatments Managed", color: "from-purple-500 to-purple-600", icon: "🎯" }
            ].map((stat, index) => (
              <div key={index} className="group">
                <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 text-center hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className={`text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Badges */}
          <div className="mt-16 flex items-center justify-center space-x-8 flex-wrap gap-4">
            {[
              { icon: "🔒", text: "HIPAA Compliant", color: "text-green-600" },
              { icon: "⚡", text: "Lightning Fast", color: "text-yellow-600" },
              { icon: "🎯", text: "99.9% Uptime", color: "text-blue-600" },
              { icon: "🏆", text: "Industry Leading", color: "text-purple-600" }
            ].map((badge, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full shadow-sm border border-white/20">
                <span className="text-lg">{badge.icon}</span>
                <span className={`text-sm font-semibold ${badge.color}`}>{badge.text}</span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard