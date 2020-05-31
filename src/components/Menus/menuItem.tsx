import React from 'react';
import styled from 'styled-components';
import { convertTimestampToString } from '../../lib/timestamp'
import { COLORS } from '../../constants/Styles';
// import type
import { MenuType } from '../../types/menu';

interface Props {
  list: MenuType
  index: number
}

const MenuItem = (props: Props) => { 
  const { list, index} = props
  let listSet : number = list.set
  let listName : string = list.name
  let createdAt : string = convertTimestampToString(list.createdAt, undefined)
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
      <ItemBorder index={index} />
      <ItemTimestampText>{createdAt}</ItemTimestampText>

      <ItemColumn>
        <ItemLabel>種目</ItemLabel> 
        <ItemText>:   {listName}</ItemText>
      </ItemColumn>

      <ItemColumn>
        <ItemLabel>セット数</ItemLabel> 
        <ItemText>:   {listSet}回</ItemText>
      </ItemColumn>
  
      {amountArray.map((amount, index) => (
        <ItemColumn key={index} value={amount.value}>
          <ItemLabel>回数({amount.key}セット目)</ItemLabel>
          <ItemText>:   {amount.value}回</ItemText>
         </ItemColumn>
      ))}

      {weightArray.map((weight, index) => (
        <ItemColumn key={index}  value={weight.value}>
          <ItemLabel>重さ({weight.key}セット目)</ItemLabel>
          <ItemText>:   {weight.value}kg</ItemText>
         </ItemColumn>
      ))}
    </ItemWrapper>
  )
}

export default MenuItem;

const ItemWrapper = styled.View`
  padding: 0px 15px 20px 15px;
`

const ItemBorder = styled.View`
  padding-top: 20px;
  width: 95%;
  align-self: center;
  border-top-color: ${props => props.index !== 0 ? COLORS.BASE_BORDER_COLOR : COLORS.BASE_WHITE};
  border-top-width: 1px;
`

const ItemTimestampText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-weight: bold;
  font-size: 20px;
  margin-left: 10px;
  padding-bottom: 20px;
`

const ItemColumn = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 7px 0;
  display: ${props => props.value === 0 ? 'none' : "flex"};
`

const ItemLabel = styled.Text`
  width: 150px;
  padding-right: 10px;
  font-size: 16px;
  font-weight: bold;
  text-align: right;
`

const ItemText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
`