import React from 'react'
import {
  render,
  type RenderOptions,
  type RenderAPI,
} from '@testing-library/react-native'

export * from '@testing-library/react-native'

export function renderScreen(
  screen: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
): RenderAPI {
  return render(screen, options)
}
