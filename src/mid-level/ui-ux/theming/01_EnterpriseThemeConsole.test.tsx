import React from 'react'
import * as ReactNative from 'react-native'

import EnterpriseThemeConsole from './01_EnterpriseThemeConsole'
import { fireEvent, renderScreen, screen } from '../../testing/shared/test-utils'
import {
  getPersistedThemePreference,
  setPersistedThemePreference,
} from './themeStorage'

jest.mock('./themeStorage', () => ({
  getPersistedThemePreference: jest.fn(),
  setPersistedThemePreference: jest.fn(),
}))

const mockedGetPersistedThemePreference =
  getPersistedThemePreference as jest.MockedFunction<
    typeof getPersistedThemePreference
  >
const mockedSetPersistedThemePreference =
  setPersistedThemePreference as jest.MockedFunction<
    typeof setPersistedThemePreference
  >

describe('EnterpriseThemeConsole', () => {
  beforeEach(() => {
    jest.spyOn(ReactNative, 'useColorScheme').mockReturnValue('dark')
    mockedGetPersistedThemePreference.mockReturnValue('system')
  })

  afterEach(() => {
    jest.restoreAllMocks()
    mockedGetPersistedThemePreference.mockReset()
    mockedSetPersistedThemePreference.mockReset()
  })

  it('resolves the system theme and persists manual overrides', () => {
    renderScreen(<EnterpriseThemeConsole />)

    expect(
      screen.getByText(
        'Preference: system | Resolved mode: dark | System mode: dark',
      ),
    ).toBeTruthy()

    fireEvent.press(screen.getByText('light'))

    expect(mockedSetPersistedThemePreference).toHaveBeenCalledWith('light')
    expect(
      screen.getByText(
        'Preference: light | Resolved mode: light | System mode: dark',
      ),
    ).toBeTruthy()
  })
})
