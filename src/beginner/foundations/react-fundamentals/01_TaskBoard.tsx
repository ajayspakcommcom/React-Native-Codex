import React, { useState } from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native'

import {
  FoundationCard,
  PrimaryButton,
  SectionHeader,
} from '../shared/ui'
import { foundationTheme } from '../shared/theme'

export interface Task {
  id: string
  title: string
  done: boolean
}

interface TaskRowProps {
  task: Task
  onToggle: (taskId: string) => void
}

let nextTaskId = 4

const createTask = (title: string): Task => ({
  id: `task-${nextTaskId++}`,
  title,
  done: false,
})

function TaskRow({ task, onToggle }: TaskRowProps): React.JSX.Element {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: task.done }}
      accessibilityLabel={`Task ${task.title}`}
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
    const trimmedTask = newTask.trim()

    if (!trimmedTask) {
      return
    }

    setTasks(currentTasks => [createTask(trimmedTask), ...currentTasks])
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
      <SectionHeader
        title="Team Task Board"
        subtitle="Refactored toward a production-style component boundary with typed task models, reusable UI primitives, accessibility roles, and safer local state updates."
      />

      <FoundationCard style={styles.summaryCard}>
        <Text style={styles.summaryNumber}>
          {completedCount}/{tasks.length}
        </Text>
        <Text style={styles.summaryLabel}>tasks completed</Text>
      </FoundationCard>

      <View style={styles.inputRow}>
        <TextInput
          accessibilityLabel="New task title"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask}
          placeholder="Add a new task"
          placeholderTextColor="#94A3B8"
          returnKeyType="done"
          style={styles.input}
        />
        <View style={styles.addButtonWrap}>
          <PrimaryButton
            label="Add"
            onPress={addTask}
            disabled={!newTask.trim()}
            accessibilityLabel="Add task to board"
          />
        </View>
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
    color: foundationTheme.colors.textPrimary,
  },
  summaryCard: {
    marginTop: 20,
    backgroundColor: foundationTheme.colors.dark,
  },
  summaryNumber: {
    fontSize: 32,
    fontWeight: '800',
    color: foundationTheme.colors.white,
  },
  summaryLabel: {
    marginTop: 4,
    fontSize: 14,
    color: foundationTheme.colors.border,
  },
  inputRow: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    backgroundColor: foundationTheme.colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: foundationTheme.colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: foundationTheme.colors.textPrimary,
    marginRight: 10,
  },
  addButtonWrap: {
    width: 88,
  },
  list: {
    marginTop: 20,
  },
  taskRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: foundationTheme.colors.surface,
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
    color: foundationTheme.colors.textPrimary,
  },
  taskTitleDone: {
    textDecorationLine: 'line-through',
    color: '#047857',
  },
  taskSubtitle: {
    marginTop: 4,
    fontSize: 13,
    color: foundationTheme.colors.textMuted,
  },
  emptyText: {
    fontSize: 14,
    color: foundationTheme.colors.textMuted,
    textAlign: 'center',
    marginTop: 20,
  },
})
