import React, { useState } from 'react';
import styled from 'styled-components';
import { convertTimestampToString } from '../../lib/timestamp';
import { COLORS } from '../../constants/Styles';
import UserImage from '../../components/Image/userImage'
import { db } from '../../config/firebase';
// import type
import { MenuType } from '../../types/menu';

interface Props {
  list: MenuType
}

const MenuItem = (props: Props) => { 
  const [userImgUrl, setUserImgUrl] = useState('')
  const { list } = props
  const { uid } = list

  // user取得
  db.collection('users').doc(uid).get().then(doc => {
    if (!doc.exists) return;
    setUserImgUrl(doc.data().imageUrl)
  })

  // record表示
  let listSet : number = list.set
  let createdAt : string = list.createdAt !== '' ? convertTimestampToString(list.createdAt) : 'たった今'
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

      <ItemContentWrapper>
        <ItemUserWrapper>
          <UserImage uri={userImgUrl} width={30} height={30} borderRadius={60} />
        </ItemUserWrapper>

        <ItemRecordWrapper>

          <ItemColumn>
            <ItemLabel>セット数</ItemLabel> 
            <ItemText>:   {listSet}回</ItemText>
          </ItemColumn>

          {amountArray.map((amount, index) => (
            <ItemColumn key={index}>
              <ItemLabel>回数({amount.key}回目)</ItemLabel>
              <ItemText>:   {amount.value}回</ItemText>
            </ItemColumn>
          ))}

          {weightArray.map((weight, index) => (
            <ItemColumn key={index}>
              <ItemLabel>重さ({weight.key}回目)</ItemLabel>
              <ItemText>:   {weight.value}kg</ItemText>
            </ItemColumn>
          ))}
          
          </ItemRecordWrapper>

      </ItemContentWrapper>

    </ItemWrapper>
  )
}

export default MenuItem;

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

const ItemContentWrapper = styled.View`
  flex-direction: row;
  width: 90%;
  margin: 10px auto;
`

const ItemUserWrapper = styled.View`
  margin-right: 50px;
`

const ItemRecordWrapper = styled.View``

const TrainingListItemText = styled.Text`
  
`