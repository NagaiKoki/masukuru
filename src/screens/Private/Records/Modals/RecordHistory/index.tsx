import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useFocusEffect } from '@react-navigation/native';
// import types
import { RecordItemType } from '../../../../../types/Record'
// import components
import HeaderButton from '../../../../../common/Button/HeaderButton'
import RecordHistoryList from '../../../../../components/Records/Histories/List'
// import constants
import { COLORS } from '../../../../../constants/Styles'
// import selectors
import { useSelectRecordActions } from '../../../../../selectors/record'
// import utils
import { hapticFeedBack } from '../../../../../utilities/Haptic'

const RecordHistoryScreen = ({ navigation }) => {
  const [selectedRecords, setSelectedRecords] = useState<RecordItemType[]>([])
  const { addRecordItemsFromHistory } = useSelectRecordActions()

  const handleSubmit = () => {
    hapticFeedBack('medium')
    addRecordItemsFromHistory(selectedRecords)
    navigation.goBack()
  }

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
          return <HeaderButton text="追加する" onPress={handleSubmit} />
          }
        },
      })
    }, [selectedRecords]
  ))

  const handleSelectedRecords = (record: RecordItemType) => {
    const { id } = record
    if (selectedRecords.some(record => record.id === id)) {
      const records = selectedRecords.filter(record => record.id !== id)
      setSelectedRecords(records)
    } else {
      const records = [...selectedRecords, record]
      setSelectedRecords(records)
    }
  }

  return (
    <Container>
      <RecordHistoryList selectedRecords={selectedRecords} handleSelectedRecords={handleSelectedRecords} />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  background: ${COLORS.BASE_WHITE};
`

export default RecordHistoryScreen