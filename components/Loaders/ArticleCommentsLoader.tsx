import React from 'react'
import { Skeleton } from '../ui/skeleton'

const ArticleCommentsLoader = () => {
return (
    <div className="space-y-6 animate-in fade-in-50">
      {[1, 2, 3].map((i) => (
        <div 
          key={i} 
          className="flex items-start space-x-4 bg-card p-4 rounded-lg border border-border/50"
          style={{ 
            opacity: 1 - (i * 0.2),
            transform: `translateY(${i * 10}px)`
          }}
        >
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="space-y-3 flex-1">
            <div className="space-y-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-[90%]" />
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-8 w-16" />
              <Skeleton className="h-8 w-24" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ArticleCommentsLoader
