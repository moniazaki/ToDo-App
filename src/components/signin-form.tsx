'use client'

import { signIn } from 'next-auth/react'
import { Github } from 'lucide-react'

export function SignInForm() {
  const handleSignIn = async () => {
    await signIn('github', { redirectTo: '/dashboard' })
  }

  return (
    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
      <div className="space-y-6">
        <div>
          <button
            onClick={handleSignIn}
            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
          >
            <Github className="w-5 h-5" />
            Sign in with GitHub
          </button>
        </div>
        
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Sign in to access your personal todo dashboard and start organizing your tasks.
          </p>
        </div>
      </div>
    </div>
  )
}