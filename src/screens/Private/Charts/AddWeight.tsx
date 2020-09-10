import React, { useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign'
// import constants
import { COLORS } from '../../../constants/Styles'

const AddWeightScreen = ({ navigation }) => {

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerLeft: () => {
          return (
            <Icon name="close" 
              size={24} 
              onPress={() => navigation.goBack()}
              style={{ paddingLeft: 20, color: COLORS.BASE_WHITE }}
            />
          )
        }
      })
    }, [])
  )

  return (
    <Container>

    </Container>
  )
}

export default AddWeightScreen

const Container = styled.View``