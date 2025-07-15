'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { ArrowUpDown, Share2 } from 'lucide-react'
import { useState } from 'react'

interface TaskSorterProps {
  currentSort: 'date' | 'completed' | 'title'
  currentOrder: 'asc' | 'desc'
}

export function TaskSorter({ currentSort, currentOrder }: TaskSorterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showShareTooltip, setShowShareTooltip] = useState(false)

  const handleSortChange = (sort: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sort)
    

    if (sort === currentSort) {
      const newOrder = currentOrder === 'asc' ? 'desc' : 'asc'
      params.set('order', newOrder)
    } else {
      params.set('order', 'desc')
    }
    
    router.push(`/dashboard?${params.toString()}`)
  }

  const handleShareState = async () => {
    const url = `${window.location.origin}/dashboard?sort=${currentSort}&order=${currentOrder}`
    
    try {
      await navigator.clipboard.writeText(url)
      setShowShareTooltip(true)
      setTimeout(() => setShowShareTooltip(false), 2000)
    } catch (err) {
      console.error('Failed to copy URL')
    }
  }

  const sortOptions = [
    { value: 'date', label: 'Date Created' },
    { value: 'completed', label: 'Completion Status' },
    { value: 'title', label: 'Title' },
  ]

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-600">Sort by:</span>
        <div className="flex rounded-md border border-gray-200 overflow-hidden">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`px-3 py-1 text-sm border-r border-gray-200 last:border-r-0 transition-colors ${
                currentSort === option.value
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={() => handleSortChange(currentSort)}
        className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
        title={`Sort ${currentOrder === 'asc' ? 'descending' : 'ascending'}`}
      >
        <ArrowUpDown className={`w-4 h-4 ${currentOrder === 'desc' ? 'rotate-180' : ''} transition-transform`} />
      </button>

      <div className="relative">
        <button
          onClick={handleShareState}
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
          title="Share current view"
        >
          <Share2 className="w-4 h-4" />
        </button>
        {showShareTooltip && (
          <div className="absolute top-full right-0 mt-2 bg-gray-900 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
            Link copied!
          </div>
        )}
      </div>
    </div>
  )
}