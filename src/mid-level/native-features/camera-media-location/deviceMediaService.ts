import { Platform } from 'react-native'
import {
  check,
  PERMISSIONS,
  request,
  RESULTS,
  type PermissionStatus,
} from 'react-native-permissions'
import {
  launchCamera,
  launchImageLibrary,
  type Asset,
  type ImageLibraryOptions,
  type CameraOptions,
} from 'react-native-image-picker'

import { SelectedMediaAsset } from './types'

function mapAssetToSelectedMedia(asset: Asset | undefined): SelectedMediaAsset | null {
  if (!asset?.uri) {
    return null
  }

  return {
    uri: asset.uri,
    fileName: asset.fileName ?? 'unnamed-file',
    type: asset.type ?? 'unknown',
    fileSize: asset.fileSize,
  }
}

export async function ensureCameraPermission(): Promise<PermissionStatus> {
  const permission = Platform.select({
    ios: PERMISSIONS.IOS.CAMERA,
    android: PERMISSIONS.ANDROID.CAMERA,
    default: PERMISSIONS.ANDROID.CAMERA,
  })

  const currentStatus = await check(permission)

  if (currentStatus === RESULTS.GRANTED || currentStatus === RESULTS.LIMITED) {
    return currentStatus
  }

  return request(permission)
}

export async function capturePhoto(): Promise<SelectedMediaAsset | null> {
  const options: CameraOptions = {
    mediaType: 'photo',
    saveToPhotos: false,
    cameraType: 'back',
  }

  const response = await launchCamera(options)
  return mapAssetToSelectedMedia(response.assets?.[0])
}

export async function pickImageFromLibrary(): Promise<SelectedMediaAsset | null> {
  const options: ImageLibraryOptions = {
    mediaType: 'photo',
    selectionLimit: 1,
  }

  const response = await launchImageLibrary(options)
  return mapAssetToSelectedMedia(response.assets?.[0])
}
