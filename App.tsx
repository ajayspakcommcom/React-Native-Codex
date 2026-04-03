import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import MaestroWorkspaceHarness from './src/mid-level/testing/maestro/01_MaestroWorkspaceHarness'

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <MaestroWorkspaceHarness />
    </SafeAreaProvider>
  )
}

export default App
