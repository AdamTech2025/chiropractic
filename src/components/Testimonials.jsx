const Testimonials = () => {
  return (
    <div className="mb-8">
      <div className="font-semibold text-primary flex items-center gap-2 text-lg my-8">
        <svg className="w-7 h-7 text-primary" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 14c-4.418 0-8 1.79-8 4v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2c0-2.21-3.582-4-8-4z"/>
        </svg>
        <span className="align-middle">What Other Clinic Say</span>
      </div>
      <div className="flex flex-col gap-4">
        <div className="relative bg-blue-50/80 rounded-xl p-4 border border-blue-100 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
              FD
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-2 2 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"/>
                </svg>
                <span className="italic text-gray-700">
                  "We used to guess codes. Now our claims get paid faster. This tool saved us over $2,400 in denials last month alone."
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">— Front Desk, SmileBright Dental, FL</div>
            </div>
          </div>
        </div>
        <div className="relative bg-blue-50/80 rounded-xl p-4 border border-blue-100 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-lg">
              E
            </div>
            <div>
              <div className="flex items-center gap-1 mb-1">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-2 2 2h4a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2z"/>
                </svg>
                <span className="italic text-gray-700">
                  "I submitted a scenario during lunch and got the correct code before my next patient. No login. Super easy."
                </span>
              </div>
              <div className="text-xs text-gray-500 mt-1">— Emma, FD @ Valley Smiles</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Testimonials 