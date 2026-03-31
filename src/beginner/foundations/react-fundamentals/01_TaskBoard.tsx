import React, { useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

interface Task {
  id: string
  title: string
  done: boolean
}

interface TaskRowProps {
  task: Task
  onToggle: (taskId: string) => void
}

function TaskRow({ task, onToggle }: TaskRowProps): React.JSX.Element {
  return (
    <Pressable
      style={[styles.taskRow, task.done && styles.taskRowDone]}
      onPress={() => onToggle(task.id)}>
      <View style={[styles.checkbox, task.done && styles.checkboxActive]} />
      <View style={styles.taskTextBlock}>
        <Text style={[styles.taskTitle, task.done && styles.taskTitleDone]}>
          {task.title}
        </Text>
        <Text style={styles.taskSubtitle}>
          {task.done ? 'Completed' : 'Tap to mark as done'}
        </Text>
      </View>
    </Pressable>
  )
}

export default function TaskBoard(): React.JSX.Element {
  const [newTask, setNewTask] = useState('')
  const [tasks, setTasks] = useState<Task[]>([
    { id: 'task-1', title: 'Review sprint goals', done: true },
    { id: 'task-2', title: 'Update onboarding copy', done: false },
    { id: 'task-3', title: 'Prepare release checklist', done: false },
  ])

  const completedCount = tasks.filter(task => task.done).length

  const addTask = (): void => {
    if (!newTask.trim()) {
      return
    }

    setTasks(currentTasks => [
      {
        id: `task-${currentTasks.length + 1}`,
        title: newTask.trim(),
        done: false,
      },
      ...currentTasks,
    ])
    setNewTask('')
  }

  const toggleTask = (taskId: string): void => {
    setTasks(currentTasks =>
      currentTasks.map(task =>
        task.id === taskId ? { ...task, done: !task.done } : task,
      ),
    )
  }

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.heading}>Team Task Board</Text>
      <Text style={styles.caption}>
        A simple example of JSX, components, props, state, list rendering, and
        conditional UI.
      </Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryNumber}>
          {completedCount}/{tasks.length}
        </Text>
        <Text style={styles.summaryLabel}>tasks completed</Text>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          value={newTask}
          onChangeText={setNewTask}
          placeholder="Add a new task"
          placeholderTextColor="#94A3B8"
          style={styles.input}
        />
        <Pressable style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <View style={styles.list}>
        {tasks.length > 0 ? (
          tasks.map(task => (
            <TaskRow key={task.id} task={task} onToggle={toggleTask} />
          ))
        ) : (
          <Text style={styles.emptyText}>No tasks yet. Add your first task.</Text>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: '#F8FAFC',
    flexGrow: 1,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  caption: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  summaryCard: {
    marginTop: 20,
    backgroundColor: '#0F172A',
    borderRadius: 18,
    padding: 20,
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 14,
    color: '#CBD5E1',
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 20,
  },
  input: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: '#0F172A',
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#2563EB',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 18,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  list: {
    marginTop: 20,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  taskRowDone: {
    backgroundColor: '#ECFDF5',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: '#94A3B8',
    marginRight: 14,
  },
  checkboxActive: {
    backgroundColor: '#10B981',
    borderColor: '#10B981',
  },
  taskTextBlock: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#047857',
  },
  taskSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: '#64748B',
  },
  emptyText: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 20,
  },
})
