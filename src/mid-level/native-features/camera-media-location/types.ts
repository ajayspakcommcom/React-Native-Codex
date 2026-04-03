export interface SelectedMediaAsset {
  uri: string
  fileName: string
  type: string
  fileSize?: number
}

export interface CurrentLocationSnapshot {
  latitude: number
  longitude: number
  accuracy: number | null
}
