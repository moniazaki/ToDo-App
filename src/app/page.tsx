import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { CheckCircle, Plus, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const session = await auth()
  
  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-6">
              <CheckCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Stay Organized with <span className="text-blue-600">NextTodo</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              A modern, full-stack todo application built with Next.js 15, featuring real-time updates, 
              smart sorting, and seamless sharing capabilities.
            </p>
            <Link
              href="/auth/signin"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Feature
              icon={<Plus className="w-6 h-6 text-green-600" />}
              title="Easy Task Management"
              description="Add, edit, and delete tasks with a clean, intuitive interface. Include descriptions and mark tasks as complete."
              color="green"
            />
            <Feature
              icon={
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
              }
              title="Smart Sorting"
              description="Sort your tasks by date, completion status, or title. Your preferences are saved and shareable via URL."
              color="purple"
            />
            <Feature
              icon={
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              }
              title="Share & Collaborate"
              description="Share your task list state with others through shareable links. Perfect for team coordination and transparency."
              color="blue"
            />
          </div>

          {/* Tech Stack */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Built with Modern Technology</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'Next.js 15', desc: 'App Router & Server Components' },
                { name: 'Auth.js v5', desc: 'Secure Authentication' },
                { name: 'Drizzle ORM', desc: 'Type-safe Database' },
                { name: 'TailwindCSS', desc: 'Modern Styling' },
              ].map((tech) => (
                <div key={tech.name} className="text-center">
                  <div className="font-semibold text-gray-900">{tech.name}</div>
                  <div className="text-sm text-gray-600">{tech.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Feature({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}) {
  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className={`w-12 h-12 bg-${color}-100 rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}