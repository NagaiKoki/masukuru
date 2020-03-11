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

const LoginScreen = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(user => {
      setUserName('');
      setEmail('');
      setPassword('');
      alert('success');
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
              placeholder="名前"
              autoCapitalize={'none'}
              autoCorrect={ false }
              onChangeText={ useName => setUserName(userName) }
            />
          </Item>
          <Item>
            <Input 
              placeholder='メールアドレス'
              autoCapitalize={'none'}
              autoCorrect={ false }
              onChangeText={ useEmail => setUserName(useEmail) }
            />
          </Item>

          <Item>
            <Input 
              placeholder='パスワード'
              autoCapitalize={'none'}
              secureTextEntry
              onChangeText={ password => setUserName(password) }
            />
          </Item>

          <Button block onPress={ () => handleSignUp() }>
            <Text>登録する</Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

export default LoginScreen;