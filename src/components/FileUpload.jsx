import { useRef } from 'react'

const FileUpload = ({ files, onFilesChange, onFileRemove }) => {
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files)
    const allFiles = [...files]
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    
    // Check file sizes and add new files to the array (avoid duplicates by name+size)
    newFiles.forEach(file => {
      if (file.size > maxSize) {
        alert(`File "${file.name}" is too large. Maximum file size is 10MB.`)
        return
      }
      
      if (!allFiles.some(f => f.name === file.name && f.size === file.size)) {
        allFiles.push(file)
      }
    })
    
    onFilesChange(allFiles)
    
    // Reset input so user can add the same file again if needed
    e.target.value = ''
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleDragOver = (e) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    const droppedFiles = Array.from(e.dataTransfer.files)
    const allFiles = [...files]
    const maxSize = 10 * 1024 * 1024 // 10MB in bytes
    
    droppedFiles.forEach(file => {
      if (file.size > maxSize) {
        alert(`File "${file.name}" is too large. Maximum file size is 10MB.`)
        return
      }
      
      if (!allFiles.some(f => f.name === file.name && f.size === file.size)) {
        allFiles.push(file)
      }
    })
    
    onFilesChange(allFiles)
  }

  return (
    <div className="w-full">
      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors duration-200 cursor-pointer"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleUploadClick}
      >
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-700">Click to upload or drag and drop</p>
            <p className="text-xs text-gray-500">PDF, JPG, PNG, DOC files up to 10MB</p>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Selected Files */}
      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-medium text-gray-700">Selected Files:</p>
          <div className="space-y-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${file.size}-${index}`}
                className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-lg p-3"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onFileRemove(index)}
                  className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full p-1 transition-colors duration-200"
                  title="Remove file"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FileUpload 