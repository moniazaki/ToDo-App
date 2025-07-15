import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTasks } from '@/lib/actions/tasks'
import { TaskList } from '@/components/task-list'
import { AddTaskForm } from '@/components/add-task-form'
import { TaskSorter } from '@/components/task-sorter'
import { UserProfile } from '@/components/user-profile'
import { Suspense } from 'react'

interface DashboardProps {
  searchParams: Promise<{
    sort?: 'date' | 'completed' | 'title'
    order?: 'asc' | 'desc'
  }>
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const session = await auth()

  if (!session) {
    redirect('/auth/signin')
  }

  const params = await searchParams
  const sortBy = params.sort || 'date'
  const order = params.order || 'desc'

  const tasks = await getTasks(sortBy, order)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
              <p className="text-sm text-gray-600">
                {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
              </p>
            </div>
            <UserProfile user={session.user} />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Add Task */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h2>
              <AddTaskForm />
            </div>
          </div>

          {/* Right Column - Task List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-900">Your Tasks</h2>
                  <TaskSorter currentSort={sortBy} currentOrder={order} />
                </div>
              </div>
              <div className="p-6">
                <Suspense fallback={<div className="text-center py-8">Loading tasks...</div>}>
                  <TaskList tasks={tasks} />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
