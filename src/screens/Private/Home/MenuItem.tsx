import React, { useState } from 'react';
import styled from 'styled-components';
import UserImage from '../../../components/Image/userImage'
import { db } from '../../../config/firebase';
// import type
import { MenuType } from '../../../types/menu';
import { COLORS } from '../../../constants/Styles';

interface Props {
  item: MenuType
}

const MenuItem = (props: Props) => {
  const [userName, setUserName] = useState('')
  const [userImgUrl, setUserImgUrl] = useState('')
  const { item } = props
  const { uid } = item

  db.collection('users').doc(uid).get().then(doc => {
    if (!doc.exists) return;
    setUserImgUrl(doc.data().imageUrl)
    setUserName(doc.data().name)
  })

  return (
    <RecentActivitiesMenuFlatListView>
      <UserImage uri={userImgUrl} width={30} height={30} borderRadius={50} />
      <RecentActivitiesMenuFlatListName>
        {userName}が{item.name}を{item.set}セット行いました！
      </RecentActivitiesMenuFlatListName>
    </RecentActivitiesMenuFlatListView>
  )
}

export default MenuItem;

const RecentActivitiesMenuFlatListView = styled.View`
  flex-direction: row;
  margin-top: 13px;
  margin-left: 15px;
  width: 80%;
  align-items: center;
`

const RecentActivitiesMenuFlatListName = styled.Text`
  margin-left: 20px;
  letter-spacing: 1px;
  font-size: 14px;
  color: ${COLORS.BASE_BLACK};
`