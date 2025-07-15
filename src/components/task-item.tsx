'use client'

import { useState, useTransition } from 'react'
import { Task } from '@/lib/db/schema'
import { updateTask, deleteTask } from '@/lib/actions/tasks'
import { Check, X, Edit3, Trash2, Save } from 'lucide-react'
import { clsx } from 'clsx'

interface TaskItemProps {
  task: Task
}

export function TaskItem({ task }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState(task.title)
  const [editDescription, setEditDescription] = useState(task.description || '')
  const [isPending, startTransition] = useTransition()

  const handleToggleComplete = () => {
    startTransition(async () => {
      await updateTask({
        id: task.id,
        completed: !task.completed
      })
    })
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      startTransition(async () => {
        await deleteTask(task.id)
      })
    }
  }

  const handleSave = () => {
    startTransition(async () => {
      await updateTask({
        id: task.id,
        title: editTitle,
        description: editDescription
      })
      setIsEditing(false)
    })
  }

  const handleCancel = () => {
    setEditTitle(task.title)
    setEditDescription(task.description || '')
    setIsEditing(false)
  }

  return (
    <div className={clsx(
      'bg-white border rounded-lg p-4 transition-all duration-200 hover:shadow-md',
      task.completed && 'bg-gray-50 border-gray-200',
      isPending && 'opacity-50 pointer-events-none'
    )}>
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggleComplete}
          className={clsx(
            'mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors',
            task.completed 
              ? 'bg-green-500 border-green-500 text-white' 
              : 'border-gray-300 hover:border-green-500'
          )}
          disabled={isPending}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </button>

        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-3">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={100}
              />
              <textarea
                value={editDescription}
                onChange={(e) => setEditDescription(e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Description..."
                maxLength={500}
              />
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="flex items-center gap-1 bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 transition-colors"
                >
                  <Save className="w-3 h-3" />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="flex items-center gap-1 bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 transition-colors"
                >
                  <X className="w-3 h-3" />
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h3 className={clsx(
                'font-medium text-gray-900 mb-1',
                task.completed && 'line-through text-gray-500'
              )}>
                {task.title}
              </h3>
              {task.description && (
                <p className={clsx(
                  'text-sm text-gray-600',
                  task.completed && 'line-through text-gray-400'
                )}>
                  {task.description}
                </p>
              )}
              <div className="flex items-center justify-between mt-2">
                <span className="text-xs text-gray-400">
                  {new Date(task.createdAt).toLocaleDateString()}
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                    title="Edit task"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}