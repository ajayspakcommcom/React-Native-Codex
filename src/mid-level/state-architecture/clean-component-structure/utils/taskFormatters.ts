import { DeliveryTaskStatus } from '../types/task'

export function formatEtaLabel(etaDays: number): string {
  return etaDays === 1 ? '1 day remaining' : `${etaDays} days remaining`
}

export function getStatusTone(
  status: DeliveryTaskStatus,
): 'neutral' | 'warning' | 'danger' | 'success' {
  switch (status) {
    case 'Draft':
      return 'neutral'
    case 'In Progress':
      return 'warning'
    case 'Blocked':
      return 'danger'
    case 'Done':
      return 'success'
  }
}
