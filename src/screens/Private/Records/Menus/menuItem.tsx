import React, { useState } from 'react';
import styled from 'styled-components';
import { convertTimestampToString } from '../../../../lib/timestamp';
import { COLORS } from '../../../../constants/Styles';
import UserImage from '../../../../components/Image/userImage'
import firebase, { db } from '../../../../config/firebase';
// import type
import { MenuType } from '../../../../types/menu';

interface Props {
  list: MenuType
  index: number
  navigation: any
}

const MenuItem = (props: Props) => { 
  const [user, setUser] = useState(null)
  const { list, navigation, index } = props
  const { uid } = list
  const currentUserId = firebase.auth().currentUser.uid

  React.useEffect(() => {
    // user取得
    db.collection('users').doc(uid).get().then(doc => {
      if (!doc.exists) return;
      setUser(doc.data())
    })   
  }, [])

  // record表示
  let listSet : number = list.set
  let createdAt : string = list.createdAt !== '' ? convertTimestampToString(list.createdAt, undefined) : 'たった今'
  let amountArray = []
  let weightArray = []
  
  for (let number = 1; number <= listSet; number++) {
    let amountValue = list[`amount${number}`];
    let weightValue = list[`weight${number}`];
    amountArray.push({ key: number, value: amountValue })
    weightArray.push({ key: number, value: weightValue })
  }

  const UserWrapper = () => {
    if (!user) return;
    return (
      <ItemUserWrapper onPress={ () => user.uid === currentUserId ? navigation.navigate('マイページ') : navigation.navigate('UserPage', { user: user })}>
          <UserImage uri={user.imageUrl} width={35} height={35} borderRadius={60} />
          <ItemUserName>{user.name}</ItemUserName>
        </ItemUserWrapper>
    )
  }

  return (
    <ItemWrapper>
      <ItemBorder index={index} />
      <ItemTimestampText>{createdAt}</ItemTimestampText>

      <ItemContentWrapper>
          {UserWrapper()}
        <ItemRecordWrapper>

          <ItemColumn>
            <ItemLabel>セット数</ItemLabel> 
            <ItemText>:   {listSet}回</ItemText>
          </ItemColumn>

          {amountArray.map((amount, index) => (
            <ItemColumn key={index}>
              <ItemLabel>回数（{amount.key}セット目）</ItemLabel>
              <ItemText>:   {amount.value}回</ItemText>
            </ItemColumn>
          ))}

          {weightArray.map((weight, index) => (
            <ItemColumn key={index} value={weight.value}>
              <ItemLabel>重さ（{weight.key}セット目）</ItemLabel>
              <ItemText>:   {weight.value}kg</ItemText>
            </ItemColumn>
          ))}
          
          </ItemRecordWrapper>

      </ItemContentWrapper>

    </ItemWrapper>
  )
}

export default MenuItem;

const ItemWrapper = styled.View<{ index: number }>`
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

const ItemColumn = styled.View<{ value: number }>`
  flex-direction: row;
  align-items: center;
  padding: 7px 0;
  display: ${props => props.value === 0 ? 'none' : "flex"};
`

const ItemLabel = styled.Text`
  padding-right: 10px;
  font-size: 15px;
  font-weight: bold;
  text-align: right;
  width: 150px;
`

const ItemText = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 16px;
`

const ItemContentWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  margin: 10px auto;
`

const ItemUserWrapper = styled.TouchableOpacity`
  margin-right: 20px;
  width: 20%;
`

const ItemUserName = styled.Text`
  color: ${COLORS.BASE_BLACK};
  font-size: 12px;
  text-align: center;
  margin-top: 5px;
`

const ItemRecordWrapper = styled.View`
  align-self: center;
  width: 80%;
`

const TrainingListItemText = styled.Text`
  
`