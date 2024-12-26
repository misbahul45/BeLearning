'use client'
import { feedbackData } from '@/constants'
import React, { useState, useEffect } from 'react'
import { Button } from '../ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const ShowFeedback = () => {
    const [showIndekFeedback, setShowIndekFeedback] = useState(0)
    const [isAnimating, setIsAnimating] = useState(false)

    const next = () => {
        if (isAnimating) return
        setIsAnimating(true)
        if (showIndekFeedback === feedbackData.length - 1) {
            setShowIndekFeedback(0)
        } else {
            setShowIndekFeedback(prev => prev + 1)
        }
    }

    const prev = () => {
        if (isAnimating) return
        setIsAnimating(true)
        if (showIndekFeedback === 0) {
            setShowIndekFeedback(feedbackData.length - 1)
        } else {
            setShowIndekFeedback(prev => prev - 1)
        }
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsAnimating(false)
        }, 500)
        return () => clearTimeout(timer)
    }, [showIndekFeedback])

    return (
        <div className="space-y-5">
            <div>
                <p className="text-white font-extrabold text-3xl">{feedbackData[showIndekFeedback].name}</p>
                <p
                    key={showIndekFeedback} // key prop to force React to re-render the component
                    className={`text-white text-xl transition-all duration-500 ease-in-out ${
                        isAnimating ? 'opacity-0 translate-x-10' : 'opacity-100 translate-x-0'
                    }`}
                >
                    &quot;{feedbackData[showIndekFeedback].comment}&quot;
                </p>
            </div>

            <div className="flex gap-2">
                <Button onClick={prev} variant={'secondary'}>
                    <ChevronLeft className="size-4" />
                </Button>
                <Button onClick={next} variant={'secondary'}>
                    <ChevronRight className="size-4" />
                </Button>
            </div>
        </div>
    )
}

export default ShowFeedback
