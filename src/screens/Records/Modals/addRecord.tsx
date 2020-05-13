import React, { useCallback } from 'react';
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../../constants/Styles'

const AddRecordScreen = ({ navigation }) => {
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: '記録を追加する',
        headerStyle: {
          backgroundColor: COLORS.BASE_MUSCLEW
        },
        headerTintColor: COLORS.BASE_WHITE,
        headerBackTitleVisible: false,
      })
    }, [])
  )

  return (
    <AddRecordContainer>
      
    </AddRecordContainer>    
  )
}

export default AddRecordScreen

const AddRecordContainer = styled.ScrollView``