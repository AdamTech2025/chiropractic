const PrivacySection = () => {
  return (
    <div className="mb-8 bg-blue-50/90 rounded-xl p-5 text-xs text-gray-700 border border-blue-200 shadow-sm">
      <div className="font-semibold text-primary mb-2 flex items-center gap-2">
        <svg className="w-5 h-5 text-primary -mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 2a4 4 0 0 0-4 4v2a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2V6a4 4 0 0 0-4-4zm-2 6V6a2 2 0 1 1 4 0v2H8zm-2 2h8v6H6v-6z" clipRule="evenodd"/>
        </svg>
        <span className="align-middle">Worried about data privacy? Don't be.</span>
      </div>
      <ul className="space-y-1 ml-5">
        <li className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7"/>
          </svg>
          No PHI is stored.
        </li>
        <li className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7"/>
          </svg>
          All uploads are permanently deleted after coding.
        </li>
        <li className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7"/>
          </svg>
          100% HIPAA-conscious workflow.
        </li>
        <li className="flex items-center gap-2">
          <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7"/>
          </svg>
          You're not signing up for anything — just getting help.
        </li>
      </ul>
    </div>
  )
}

export default PrivacySection 