import React, { useMemo, useRef } from 'react'
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'
import { Provider } from 'react-redux'

import { useAppDispatch, useAppSelector } from './hooks'
import { RemoteFeedbackPost, useGetFeedbackPostsQuery } from './feedbackApi'
import {
  FeedbackPriorityFilter,
  setPriorityFilter,
} from './feedbackFiltersSlice'
import { createFeedbackStore } from './store'

const filterOptions: ReadonlyArray<FeedbackPriorityFilter> = [
  'all',
  'high-priority',
]

const isHighPriorityPost = (post: RemoteFeedbackPost): boolean =>
  post.id <= 3 || post.userId === 1

function formatFilterLabel(filter: FeedbackPriorityFilter): string {
  return filter === 'all' ? 'All feedback' : 'High priority'
}

function FeedbackOperationsDashboardContent(): React.JSX.Element {
  const dispatch = useAppDispatch()
  const priorityFilter = useAppSelector(
    state => state.feedbackFilters.priorityFilter,
  )

  const {
    data: posts = [],
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetFeedbackPostsQuery()

  const visiblePosts = useMemo(() => {
    if (priorityFilter === 'all') {
      return posts
    }

    return posts.filter(isHighPriorityPost)
  }, [posts, priorityFilter])

  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.eyebrow}>Redux Toolkit / RTK Query</Text>
      <Text style={styles.heading}>Feedback Operations Dashboard</Text>
      <Text style={styles.description}>
        This example combines Redux Toolkit for client UI state with RTK Query
        for server data fetching.
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>How state is divided</Text>
        <Text style={styles.secondaryText}>
          The selected priority filter lives in a Redux slice. The remote
          feedback posts come from RTK Query.
        </Text>

        <View style={styles.filterRow}>
          {filterOptions.map(filter => {
            const isActive = priorityFilter === filter

            return (
              <Pressable
                key={filter}
                accessibilityRole="button"
                style={[styles.filterChip, isActive && styles.filterChipActive]}
                onPress={() => dispatch(setPriorityFilter(filter))}>
                <Text
                  style={[
                    styles.filterChipText,
                    isActive && styles.filterChipTextActive,
                  ]}>
                  {formatFilterLabel(filter)}
                </Text>
              </Pressable>
            )
          })}
        </View>

        <Pressable
          accessibilityRole="button"
          style={styles.refetchButton}
          onPress={() => refetch()}>
          <Text style={styles.refetchButtonText}>Refetch server data</Text>
        </Pressable>

        <View style={styles.syncBox}>
          <Text style={styles.syncText}>
            {isFetching ? 'Refreshing feedback data...' : 'Server state is synced'}
          </Text>
        </View>
      </View>

      {isLoading ? (
        <View style={styles.card}>
          <ActivityIndicator size="small" color="#2563EB" />
          <Text style={styles.stateText}>Loading feedback posts...</Text>
        </View>
      ) : null}

      {!isLoading && error ? (
        <View style={styles.card}>
          <Text style={styles.errorText}>
            Failed to load server data through RTK Query.
          </Text>
        </View>
      ) : null}

      {!isLoading && !error ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Visible feedback items</Text>
          <Text style={styles.secondaryText}>
            Showing {visiblePosts.length} item(s) from the server query.
          </Text>

          {visiblePosts.map(post => (
            <View key={post.id} style={styles.postRow}>
              <View style={styles.postContent}>
                <Text style={styles.postTitle}>{post.title}</Text>
                <Text style={styles.postBody} numberOfLines={3}>
                  {post.body}
                </Text>
              </View>
              <View
                style={[
                  styles.priorityBadge,
                  isHighPriorityPost(post)
                    ? styles.priorityBadgeHigh
                    : styles.priorityBadgeNormal,
                ]}>
                <Text style={styles.priorityBadgeText}>
                  {isHighPriorityPost(post) ? 'High' : 'Normal'}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : null}
    </ScrollView>
  )
}

export default function FeedbackOperationsDashboard(): React.JSX.Element {
  const storeRef = useRef(createFeedbackStore())

  return (
    <Provider store={storeRef.current}>
      <FeedbackOperationsDashboardContent />
    </Provider>
  )
}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: '#2563EB',
  },
  heading: {
    marginTop: 8,
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
  },
  description: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 22,
    color: '#475569',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0F172A',
  },
  secondaryText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  filterRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  filterChip: {
    borderRadius: 999,
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  filterChipActive: {
    backgroundColor: '#1D4ED8',
  },
  filterChipText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '700',
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },
  refetchButton: {
    marginTop: 6,
    borderRadius: 14,
    backgroundColor: '#0F172A',
    alignItems: 'center',
    paddingVertical: 14,
  },
  refetchButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  syncBox: {
    marginTop: 16,
    borderRadius: 14,
    backgroundColor: '#EFF6FF',
    padding: 14,
  },
  syncText: {
    color: '#1D4ED8',
    fontSize: 13,
    fontWeight: '600',
  },
  stateText: {
    marginTop: 10,
    fontSize: 14,
    color: '#475569',
  },
  errorText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#991B1B',
  },
  postRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  postContent: {
    flex: 1,
    marginRight: 12,
  },
  postTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F172A',
  },
  postBody: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: '#475569',
  },
  priorityBadge: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  priorityBadgeHigh: {
    backgroundColor: '#FEE2E2',
  },
  priorityBadgeNormal: {
    backgroundColor: '#E2E8F0',
  },
  priorityBadgeText: {
    color: '#0F172A',
    fontSize: 12,
    fontWeight: '700',
  },
})
