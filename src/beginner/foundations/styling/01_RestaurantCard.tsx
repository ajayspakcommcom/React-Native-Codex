import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

interface RestaurantCardProps {
  name: string
  cuisine: string
  deliveryTime: string
  rating: number
  priceLevel: string
  isOpen: boolean
}

function RestaurantCard({
  name,
  cuisine,
  deliveryTime,
  rating,
  priceLevel,
  isOpen,
}: RestaurantCardProps): React.JSX.Element {
  return (
    <View style={styles.screen}>
      <View style={styles.card}>
        <View style={styles.hero} />

        <View style={styles.content}>
          <View style={styles.headerRow}>
            <View style={styles.titleBlock}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subtitle}>
                {cuisine} . {priceLevel}
              </Text>
            </View>

            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoChip}>
              <Text style={styles.infoChipText}>{deliveryTime}</Text>
            </View>
            <View
              style={[styles.statusChip, isOpen ? styles.openChip : styles.closedChip]}>
              <Text style={styles.statusText}>{isOpen ? 'Open now' : 'Closed'}</Text>
            </View>
          </View>

          <Text style={styles.description}>
            A layout-focused example that shows Flexbox, spacing, radius,
            typography, cards, chips, and `StyleSheet.create`.
          </Text>

          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>View menu</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default function RestaurantCardExample() {
  return (
    <RestaurantCard
      name="North Table"
      cuisine="Contemporary Asian"
      deliveryTime="25-30 min"
      rating={4.7}
      priceLevel="$$"
      isOpen
    />
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#0F172A',
    shadowOpacity: 0.1,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 10 },
    elevation: 5,
  },
  hero: {
    height: 170,
    backgroundColor: '#F59E0B',
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleBlock: {
    flex: 1,
    marginRight: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0F172A',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 14,
    color: '#64748B',
  },
  ratingBadge: {
    minWidth: 54,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#0F172A',
    borderRadius: 14,
    alignItems: 'center',
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    marginTop: 18,
  },
  infoChip: {
    backgroundColor: '#E2E8F0',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginRight: 10,
  },
  infoChipText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '600',
  },
  statusChip: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  openChip: {
    backgroundColor: '#DCFCE7',
  },
  closedChip: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#166534',
  },
  description: {
    marginTop: 18,
    fontSize: 15,
    lineHeight: 22,
    color: '#475569',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#EA580C',
    borderRadius: 14,
    alignItems: 'center',
    paddingVertical: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
})
