'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@/lib/auth'
import { db } from '@/lib/db/db'
import { tasks } from '@/lib/db/schema'
import { eq, and, desc, asc } from 'drizzle-orm'
import { z } from 'zod'

const createTaskSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters'),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
})

const updateTaskSchema = z.object({
  id: z.string(),
  title: z.string().min(1, 'Title is required').max(100, 'Title must be less than 100 characters').optional(),
  description: z.string().max(500, 'Description must be less than 500 characters').optional(),
  completed: z.boolean().optional(),
})

export async function createTask(formData: FormData) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const validatedFields = createTaskSchema.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
  })

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { title, description } = validatedFields.data

  try {
    const taskId = crypto.randomUUID()
    await db.insert(tasks).values({
      id: taskId,
      title,
      description: description || null,
      userId: session.user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    })

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Error creating task:', error)
    return { error: 'Failed to create task' }
  }
}

export async function updateTask(data: { id: string; title?: string; description?: string; completed?: boolean }) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  const validatedFields = updateTaskSchema.safeParse(data)

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors }
  }

  const { id, title, description, completed } = validatedFields.data

  try {
    const updateData: Partial<typeof tasks.$inferInsert> = { updatedAt: new Date() }
    
    if (title !== undefined) updateData.title = title
    if (description !== undefined) updateData.description = description
    if (completed !== undefined) updateData.completed = completed

    await db
      .update(tasks)
      .set(updateData)
      .where(and(eq(tasks.id, id), eq(tasks.userId, session.user.id)))

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Error updating task:', error)
    return { error: 'Failed to update task' }
  }
}

export async function deleteTask(id: string) {
  const session = await auth()
  
  if (!session?.user?.id) {
    throw new Error('Unauthorized')
  }

  try {
    await db
      .delete(tasks)
      .where(and(eq(tasks.id, id), eq(tasks.userId, session.user.id)))

    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Error deleting task:', error)
    return { error: 'Failed to delete task' }
  }
}

export async function getTasks(sortBy: 'date' | 'completed' | 'title' = 'date', order: 'asc' | 'desc' = 'desc') {
  const session = await auth()
  
  if (!session?.user?.id) {
    return []
  }

  try {
    let orderBy
    switch (sortBy) {
      case 'completed':
        orderBy = order === 'asc' ? asc(tasks.completed) : desc(tasks.completed)
        break
      case 'title':
        orderBy = order === 'asc' ? asc(tasks.title) : desc(tasks.title)
        break
      case 'date':
      default:
        orderBy = order === 'asc' ? asc(tasks.createdAt) : desc(tasks.createdAt)
        break
    }

    const userTasks = await db
      .select()
      .from(tasks)
      .where(eq(tasks.userId, session.user.id))
      .orderBy(orderBy)

    return userTasks
  } catch (error) {
    console.error('Error fetching tasks:', error)
    return []
  }
}