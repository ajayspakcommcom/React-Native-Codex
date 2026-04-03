import Geolocation from '@react-native-community/geolocation'

import { CurrentLocationSnapshot } from './types'

Geolocation.setRNConfiguration({
  skipPermissionRequests: true,
  authorizationLevel: 'whenInUse',
})

export function getCurrentLocationSnapshot(): Promise<CurrentLocationSnapshot> {
  return new Promise((resolve, reject) => {
    Geolocation.getCurrentPosition(
      position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy ?? null,
        })
      },
      error => {
        reject(error)
      },
      {
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 5000,
      },
    )
  })
}
