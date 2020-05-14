import React, { useCallback } from 'react';
import styled from 'styled-components'
import { StackScreenProps } from '@react-navigation/core';
import { useFocusEffect } from '@react-navigation/native';
import { COLORS } from '../../../constants/Styles'
// import components
import AddRecordForm from '../../../components/Records/AddRecordForm'

const AddRecordScreen = ({route,  navigation}) => {
  const { onChangeTrainingName } = route.params.params

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
      <AddRecordForm 
        onChangeTrainingName={onChangeTrainingName}
      />
    </AddRecordContainer>    
  )
}

export default AddRecordScreen

const AddRecordContainer = styled.ScrollView`
  flex: 1;
  background-color: ${COLORS.BASE_BACKGROUND};
`