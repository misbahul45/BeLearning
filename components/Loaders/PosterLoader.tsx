import React from 'react'

const PosterLoader = () => {
  return (
    <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:my-6 my-4">
        <div className="flex-1">
            <div className="relative w-full h-[40vh] md:h-[65vh] rounded-lg overflow-hidden bg-gray-400 animate-pulse" />
        </div>
        <div className="w-full md:w-80 border border-gray-200 rounded-lg p-4">
            <div className="h-6 w-32 bg-gray-200 rounded mb-4" />
            <div className="space-y-4">
                {[1, 2].map((idx) => (
                <div key={idx} className="space-y-2">
                    <div className="h-24 rounded-md bg-gray-100" />
                    <div className="h-4 w-3/4 bg-gray-200 rounded" />
                </div>
                ))}
        </div>
    </div>
  </div>
  )
}

export default PosterLoader