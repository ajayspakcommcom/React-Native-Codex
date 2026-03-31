import React from 'react'
import {
  FlatList,
  Image,
  ListRenderItem,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import { FoundationCard, Pill, SectionHeader } from '../shared/ui'
import { foundationTheme } from '../shared/theme'

export interface Destination {
  id: string
  city: string
  country: string
  rating: number
  image: string
}

const categories = ['Popular', 'Weekend', 'Beach', 'Mountains', 'Culture'] as const

const destinations: ReadonlyArray<Destination> = [
  {
    id: '1',
    city: 'Lisbon',
    country: 'Portugal',
    rating: 4.8,
    image:
      'https://images.unsplash.com/photo-1513735492246-483525079686?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '2',
    city: 'Kyoto',
    country: 'Japan',
    rating: 4.9,
    image:
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=900&q=80',
  },
  {
    id: '3',
    city: 'Cape Town',
    country: 'South Africa',
    rating: 4.7,
    image:
      'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?auto=format&fit=crop&w=900&q=80',
  },
]

function DestinationCard({
  city,
  country,
  rating,
  image,
}: Destination): React.JSX.Element {
  return (
    <FoundationCard style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.country}>{country}</Text>
        <Text style={styles.rating}>Rating {rating}</Text>
      </View>
    </FoundationCard>
  )
}

export default function TravelFeed(): React.JSX.Element {
  const renderDestination: ListRenderItem<Destination> = ({ item }) => (
    <DestinationCard {...item} />
  )

  const listHeader = (
    <View>
      <SectionHeader
        title="Travel Discover"
        subtitle="A cleaner core-components example using a vertical FlatList with a horizontal category rail inside the list header."
      />
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}>
        {categories.map(category => (
          <Pill key={category} label={category} tone="neutral" />
        ))}
      </ScrollView>
    </View>
  )

  return (
    <View style={styles.screen}>
      <FlatList
        data={destinations}
        keyExtractor={item => item.id}
        renderItem={renderDestination}
        ListHeaderComponent={listHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        accessibilityLabel="Travel destination feed"
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: foundationTheme.colors.background,
    paddingTop: 24,
  },
  categoryRow: {
    paddingTop: 18,
    paddingBottom: 10,
  },
  listContent: {
    padding: 20,
    paddingTop: 6,
  },
  card: {
    marginBottom: 18,
    padding: 0,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 180,
  },
  cardBody: {
    padding: 16,
  },
  city: {
    fontSize: 20,
    fontWeight: '700',
    color: foundationTheme.colors.textPrimary,
  },
  country: {
    marginTop: 4,
    fontSize: 14,
    color: foundationTheme.colors.textMuted,
  },
  rating: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: foundationTheme.colors.success,
  },
})
