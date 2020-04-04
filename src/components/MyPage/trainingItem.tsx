import React from 'react';
import styled from 'styled-components';
import { convertTimestampToString } from '../../lib/timestamp'
import { COLORS } from '../../constants/Styles';
// import type
import { MenuType } from '../../types/menu';

interface Props {
  list: MenuType
  key: number
}

const TrainingItem = (props: Props) => { 
  const { list } = props
  let listSet : number = list.set
  let listName : string = list.name
  let createdAt : string = convertTimestampToString(list.createdAt)
  let amountArray = []
  let weightArray = []
  
  for (let number = 1; number <= listSet; number++) {
    let amountValue = list[`amount${number}`];
    let weightValue = list[`weight${number}`];
    amountArray.push({ key: number, value: amountValue })
    weightArray.push({ key: number, value: weightValue })
  }

  return (
    <ItemWrapper>
      <ItemTimestampText>{createdAt}</ItemTimestampText>

      <ItemColumn>
        <ItemLabel>種目</ItemLabel> 
        <ItemText>:   {listName}</ItemText>
      </ItemColumn>

      <ItemColumn>
        <ItemLabel>セット数</ItemLabel> 
        <ItemText>:   {listSet}回</ItemText>
      </ItemColumn>
  
      {amountArray.map((amount) => (
        <ItemColumn>
          <ItemLabel>回数({amount.key}回目)</ItemLabel>
          <ItemText>:   {amount.value}回</ItemText>
         </ItemColumn>
      ))}

      {weightArray.map((weight) => (
        <ItemColumn>
          <ItemLabel>重さ({weight.key}回目)</ItemLabel>
          <ItemText>:   {weight.value}kg</ItemText>
         </ItemColumn>
      ))}
    </ItemWrapper>
  )
}

export default TrainingItem;

const ItemWrapper = styled.View`
  padding: 20px 15px;
`

const ItemTimestampText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 20px;
  padding-bottom: 20px;
`

const ItemColumn = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 7px 0;
`

const ItemLabel = styled.Text`
  width: 100px;
  padding-right: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`

const ItemText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
`

const TrainingListItemText = styled.Text`
  
`