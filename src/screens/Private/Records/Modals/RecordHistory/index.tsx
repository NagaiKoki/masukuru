import React, { useCallback } from 'react'
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native';
// import components
import HeaderButton from '../../../../../common/Button/HeaderButton'
import RecordHistoryList from '../../../../../components/Records/Histories/List'
// import constants
import { COLORS } from '../../../../../constants/Styles'

const RecordHistoryScreen = ({ navigation }) => {

  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerTitle: 'トレーニング履歴',
        headerStyle: {
          backgroundColor: COLORS.BASE_MUSCLEW
        },
        headerTintColor: COLORS.BASE_WHITE,
        headerBackTitleVisible: false,
        headerRight: () => {{ 
          return <HeaderButton text="追加する" onPress={() => {}} />
          }
        },
      })
    }, []
  ))

  return (
    <Container>
      <RecordHistoryList />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background: ${COLORS.BASE_WHITE};
`

export default RecordHistoryScreen