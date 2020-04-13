import React, { useState } from 'react';
import styled from 'styled-components';
import UserImage from '../../components/Image/userImage'
import { db } from '../../config/firebase';
// import type
import { MenuType } from '../../types/menu';

interface Props {
  item: MenuType
}

const MenuItem = (props: Props) => {
  const [userImgUrl, setUserImgUrl] = useState('')
  const { item } = props
  const { uid } = item

  db.collection('users').doc(uid).get().then(doc => {
    if (!doc.exists) return;
    setUserImgUrl(doc.data().imageUrl)
  })

  return (
    <RecentActivitiesMenuFlatListView>
      <UserImage uri={userImgUrl} width={30} height={30} borderRadius={50} />
      <RecentActivitiesMenuFlatListName>
        {item.name} を行いました！
      </RecentActivitiesMenuFlatListName>
    </RecentActivitiesMenuFlatListView>
  )
}

export default MenuItem;

const RecentActivitiesMenuFlatListView = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: 15px;
  align-items: center;
`

const RecentActivitiesMenuFlatListName = styled.Text`
  margin-left: 20px;
`