import { Heart } from 'lucide-react'
import React from 'react'

const ButtonSaveCourses = () => {
  return (
    <form>
        <button className="p-2 bg-white/80 backdrop-blur rounded-full hover:bg-white transition-colors">
            <Heart className="w-4 h-4" />
        </button>
    </form>
  )
}

export default ButtonSaveCourses
