import { useEffect, useState } from 'react'

import { getDeliveryTasks } from '../services/taskService'
import { DeliveryTask } from '../types/task'

interface UseDeliveryTasksResult {
  tasks: DeliveryTask[]
  isLoading: boolean
  errorMessage: string | null
}

export function useDeliveryTasks(): UseDeliveryTasksResult {
  const [tasks, setTasks] = useState<DeliveryTask[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadTasks = async (): Promise<void> => {
      setIsLoading(true)
      setErrorMessage(null)

      try {
        const nextTasks = await getDeliveryTasks()

        if (isMounted) {
          setTasks(nextTasks)
        }
      } catch {
        if (isMounted) {
          setTasks([])
          setErrorMessage('Unable to load delivery tasks.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadTasks()

    return () => {
      isMounted = false
    }
  }, [])

  return {
    tasks,
    isLoading,
    errorMessage,
  }
}
