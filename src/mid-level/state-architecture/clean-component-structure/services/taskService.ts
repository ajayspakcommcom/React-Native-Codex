import { DeliveryTask } from '../types/task'

const deliveryTasks: ReadonlyArray<DeliveryTask> = [
  {
    id: 'task-1',
    title: 'Finalize onboarding analytics events',
    owner: 'Ava',
    status: 'In Progress',
    etaDays: 3,
  },
  {
    id: 'task-2',
    title: 'Prepare API fallback handling',
    owner: 'Noah',
    status: 'Blocked',
    etaDays: 5,
  },
  {
    id: 'task-3',
    title: 'Review release communication checklist',
    owner: 'Mia',
    status: 'Done',
    etaDays: 1,
  },
  {
    id: 'task-4',
    title: 'Draft payment settings screen copy',
    owner: 'Liam',
    status: 'Draft',
    etaDays: 4,
  },
]

export async function getDeliveryTasks(): Promise<DeliveryTask[]> {
  await new Promise<void>(resolve => {
    setTimeout(() => {
      resolve()
    }, 350)
  })
  return [...deliveryTasks]
}
