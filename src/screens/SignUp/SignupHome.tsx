import React from 'react'
import { View, Text, Button } from 'react-native';

const SignupHomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text>マスクルー</Text>
      <Button 
        title="新規登録する"
        onPress={ () => navigation.navigate('Signup') }
      />
    </View>
  )
}

export default SignupHomeScreen;