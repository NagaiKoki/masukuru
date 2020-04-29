import React from 'react';
import { StyleSheet, ActivityIndicator  } from 'react-native'

interface LoadingProps {
  size: "small" | "large"
}

const Loading = (props: LoadingProps) => {
  const { size } = props

  return (
    <ActivityIndicator size={size} style={[styles.loading]} />
  )
}

export default Loading;

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignSelf: 'center',
    alignItems: 'center'
  }
})