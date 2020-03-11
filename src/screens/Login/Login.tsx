import React, { useState } from 'react'
import { View } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Form,
  Item,
  Input,
  Button,
  Text
} from 'native-base';
import firebase from '../../config/firebase';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(res => {
      navigation.navigate('LoginLoading');
    }).catch(error => alert(error));
  }

  return (
    <Container>
      <Header>
        <Body>
          <Title>新規登録</Title>
        </Body>
      </Header>

      <Content>
        <Form>
          <Item>
            <Input 
              placeholder='メールアドレス'
              autoCapitalize={'none'}
              autoCorrect={ false }
              onChangeText={ email => setEmail(email) }
            />
          </Item>

          <Item>
            <Input 
              placeholder='パスワード'
              autoCapitalize={'none'}
              secureTextEntry
              onChangeText={ password => setPassword(password) }
            />
          </Item>

          <Button block onPress={ () => handleLogin() }>
            <Text>登録する</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default LoginScreen;