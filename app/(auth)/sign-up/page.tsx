import SignupForm from '@/components/auth/SignupForm'
import Image from 'next/image'
import React from 'react'

const SignupPage = () => {
  return (
    <main className="flex min-h-screen flex-col md:flex-row">
      {/* Left Section - Form */}
      <div className="flex-1 px-4 md:px-8 py-8 md:py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold text-primary mb-4 text-center">
            Create an account
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Join thousands of users and start your journey with us today.
          </p>
          <SignupForm />
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="hidden md:flex flex-1 bg-primary justify-center items-center p-8">
        <div className="relative w-full max-w-lg aspect-square">
          <Image 
            src="/images/logo.png"
            alt="Welcome illustration"
            fill
            priority
            className="object-contain drop-shadow-lg"
          />
        </div>
      </div>
    </main>
  )
}

export default SignupPage