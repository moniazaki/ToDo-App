import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getTasks } from '@/lib/actions/tasks'
import { TaskList } from '@/components/task-list'
import { AddTaskForm } from '@/components/add-task-form'
import { TaskSorter } from '@/components/task-sorter'
import { UserProfile } from '@/components/user-profile'
import { Suspense } from 'react'
import type PageProps  from "next"       // ✅ <-- NEW

type Search = {
  sort?: 'date' | 'completed' | 'title'
  order?: 'asc' | 'desc'
}

/**
 * Next 15 expects the first parameter to EXTEND PageProps, not replace it.
 * We keep “params?” (unused) so the generic stays compatible.
 */
interface DashboardProps extends PageProps {
  searchParams?: Search
}

export default async function Dashboard({ searchParams }: DashboardProps) {
  const session = await auth()
  if (!session) redirect('/auth/signin')

  const sortBy  = (searchParams?.sort  ?? 'date') as Search['sort']
  const orderBy = (searchParams?.order ?? 'desc') as Search['order']

  const tasks = await getTasks(sortBy, orderBy)

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Tasks</h1>
            <p className="text-sm text-gray-600">
              {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
            </p>
          </div>
          <UserProfile user={session.user} />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ➤ Add‑task card */}
        <aside className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Task</h2>
            <AddTaskForm />
          </div>
        </aside>

        {/* ➤ Task list */}
        <section className="lg:col-span-2 bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Your Tasks</h2>
            <TaskSorter currentSort={sortBy} currentOrder={orderBy} />
          </div>
          <div className="p-6">
            <Suspense fallback={<div className="text-center py-8">Loading tasks...</div>}>
              <TaskList tasks={tasks} />
            </Suspense>
          </div>
        </section>
      </main>
    </div>
  )
}

