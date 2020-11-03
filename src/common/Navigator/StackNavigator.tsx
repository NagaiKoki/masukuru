import React from 'react'
import { TypedNavigator } from '@react-navigation/core'

type Props = {
  Stack: TypedNavigator
  initialRouteName: string
  children: React.ReactElement
}

const StackNavigator = (props: Props) => {
  const { Stack, initialRouteName, children } = props

  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      {children}
    </Stack.Navigator>
  )
}

export default StackNavigator