import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import {
  FoundationCard,
  Pill,
  PrimaryButton,
  SectionHeader,
} from '../shared/ui'
import { foundationTheme } from '../shared/theme'

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
      <FoundationCard style={styles.card}>
        <View style={styles.hero} />

        <View style={styles.content}>
          <SectionHeader
            title={name}
            subtitle={`${cuisine} | ${priceLevel}`}
          />

          <View style={styles.headerRow}>
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>{rating}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Pill label={deliveryTime} tone="neutral" />
            <Pill label={isOpen ? 'Open now' : 'Closed'} tone={isOpen ? 'success' : 'danger'} />
          </View>

          <Text style={styles.description}>
            A more maintainable styling example that uses shared design tokens,
            reusable pills, a reusable button, and a card primitive instead of
            repeating the same UI patterns inline.
          </Text>

          <PrimaryButton label="View menu" accessibilityLabel="View restaurant menu" />
        </View>
      </FoundationCard>
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
    overflow: 'hidden',
    padding: 0,
  },
  hero: {
    height: 170,
    backgroundColor: foundationTheme.colors.warning,
  },
  content: {
    padding: 20,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -24,
  },
  ratingBadge: {
    minWidth: 54,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: foundationTheme.colors.dark,
    borderRadius: 14,
    alignItems: 'center',
  },
  ratingText: {
    color: foundationTheme.colors.white,
    fontSize: 16,
    fontWeight: '800',
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 18,
  },
  description: {
    marginTop: 18,
    fontSize: 15,
    lineHeight: 22,
    color: foundationTheme.colors.textSecondary,
  },
})
