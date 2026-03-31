import React from 'react'
import {
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native'

interface Destination {
  id: string
  city: string
  country: string
  rating: number
  image: string
}

const categories = ['Popular', 'Weekend', 'Beach', 'Mountains', 'Culture']

const destinations: Destination[] = [
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

function DestinationCard({ city, country, rating, image }: Destination) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.city}>{city}</Text>
        <Text style={styles.country}>{country}</Text>
        <Text style={styles.rating}>Rating {rating}</Text>
      </View>
    </View>
  )
}

export default function TravelFeed(): React.JSX.Element {
  return (
    <View style={styles.screen}>
      <Text style={styles.heading}>Travel Discover</Text>
      <Text style={styles.subtitle}>
        This example uses View, Text, Image, ScrollView, and FlatList together.
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryRow}>
        {categories.map(category => (
          <View key={category} style={styles.categoryChip}>
            <Text style={styles.categoryText}>{category}</Text>
          </View>
        ))}
      </ScrollView>

      <FlatList
        data={destinations}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <DestinationCard {...item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    paddingTop: 24,
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#0F172A',
    paddingHorizontal: 20,
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#475569',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  categoryRow: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 10,
  },
  categoryChip: {
    backgroundColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    marginRight: 10,
  },
  categoryText: {
    color: '#0F172A',
    fontSize: 13,
    fontWeight: '600',
  },
  listContent: {
    padding: 20,
    paddingTop: 6,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    marginBottom: 18,
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
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
    color: '#0F172A',
  },
  country: {
    marginTop: 4,
    fontSize: 14,
    color: '#64748B',
  },
  rating: {
    marginTop: 12,
    fontSize: 14,
    fontWeight: '600',
    color: '#0B8F55',
  },
})
