import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import {
  NavigationContainer,
  NavigatorScreenParams,
  RouteProp,
  useNavigation,
} from '@react-navigation/native'
import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs'
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack'

type HomeTabsParamList = {
  Dashboard: undefined
  Profile: { userId: string }
  Settings: undefined
}

type RootStackParamList = {
  MainTabs: NavigatorScreenParams<HomeTabsParamList>
  Details: { listingId: string; city: string }
}

interface QuickActionButtonProps {
  label: string
  onPress: () => void
}

const RootStack = createNativeStackNavigator<RootStackParamList>()
const HomeTabs = createBottomTabNavigator<HomeTabsParamList>()

function QuickActionButton({
  label,
  onPress,
}: QuickActionButtonProps): React.JSX.Element {
  return (
    <Pressable accessibilityRole="button" style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  )
}

function DashboardScreen(): React.JSX.Element {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>Stack + Tabs</Text>
      <Text style={styles.heading}>Dashboard</Text>
      <Text style={styles.description}>
        A beginner-friendly navigation example with a root stack, nested tabs,
        and typed route params.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Suggested route flow</Text>
        <Text style={styles.cardText}>Dashboard to Details</Text>
        <Text style={styles.cardText}>Tabs to Profile with params</Text>
      </View>

      <QuickActionButton
        label="Open Lisbon details"
        onPress={() =>
          navigation.navigate('Details', {
            listingId: 'listing-101',
            city: 'Lisbon',
          })
        }
      />

      <QuickActionButton
        label="Go to profile tab"
        onPress={() =>
          navigation.navigate('MainTabs', {
            screen: 'Profile',
            params: { userId: 'user-42' },
          })
        }
      />
    </View>
  )
}

function ProfileScreen({
  route,
}: {
  route: RouteProp<HomeTabsParamList, 'Profile'>
}): React.JSX.Element {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>Route Params</Text>
      <Text style={styles.heading}>Profile</Text>
      <Text style={styles.description}>
        This screen receives a typed `userId` param from the tab navigator.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Current user</Text>
        <Text style={styles.cardText}>User ID: {route.params.userId}</Text>
      </View>
    </View>
  )
}

function SettingsScreen(): React.JSX.Element {
  const navigation =
    useNavigation<BottomTabNavigationProp<HomeTabsParamList, 'Settings'>>()

  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>Bottom Tabs</Text>
      <Text style={styles.heading}>Settings</Text>
      <Text style={styles.description}>
        This tab demonstrates simple movement across tab screens.
      </Text>

      <QuickActionButton
        label="Open profile tab"
        onPress={() => navigation.navigate('Profile', { userId: 'user-42' })}
      />
    </View>
  )
}

function MainTabs(): React.JSX.Element {
  return (
    <HomeTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: '#FFFFFF' },
        tabBarActiveTintColor: '#2563EB',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}>
      <HomeTabs.Screen name="Dashboard" component={DashboardScreen} />
      <HomeTabs.Screen
        name="Profile"
        component={ProfileScreen}
        initialParams={{ userId: 'user-42' }}
      />
      <HomeTabs.Screen name="Settings" component={SettingsScreen} />
    </HomeTabs.Navigator>
  )
}

function DetailsScreen({
  route,
}: NativeStackScreenProps<RootStackParamList, 'Details'>): React.JSX.Element {
  return (
    <View style={styles.screen}>
      <Text style={styles.eyebrow}>Native Stack</Text>
      <Text style={styles.heading}>Listing Details</Text>
      <Text style={styles.description}>
        This screen receives typed route params from the stack navigator.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Selected listing</Text>
        <Text style={styles.cardText}>City: {route.params.city}</Text>
        <Text style={styles.cardText}>Listing ID: {route.params.listingId}</Text>
      </View>
    </View>
  )
}

export default function AppNavigatorExample(): React.JSX.Element {
  return (
    <NavigationContainer independent>
      <RootStack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#FFFFFF' },
          headerTitleStyle: { color: '#0F172A' },
          contentStyle: { backgroundColor: '#F8FAFC' },
        }}>
        <RootStack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <RootStack.Screen name="Details" component={DetailsScreen} />
      </RootStack.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    padding: 20,
  },
  eyebrow: {
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
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
    lineHeight: 21,
    color: '#475569',
  },
  card: {
    marginTop: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 18,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0F172A',
  },
  cardText: {
    marginTop: 8,
    fontSize: 14,
    color: '#475569',
  },
  button: {
    marginTop: 14,
    backgroundColor: '#1D4ED8',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
})
