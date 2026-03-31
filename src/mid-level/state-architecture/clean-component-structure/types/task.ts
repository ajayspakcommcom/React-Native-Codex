export type DeliveryTaskStatus = 'Draft' | 'In Progress' | 'Blocked' | 'Done'

export interface DeliveryTask {
  id: string
  title: string
  owner: string
  status: DeliveryTaskStatus
  etaDays: number
}
