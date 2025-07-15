import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { SignInForm } from '@/components/signin-form'

export default async function SignIn() {
  const session = await auth()
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Access your personal todo dashboard
          </p>
        </div>
        <SignInForm />
      </div>
    </div>
  )
}