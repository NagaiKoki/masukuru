import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, ScrollView, Button, View } from 'react-native';
import { requestMenuList } from '../../apis/requestMenuList';
// import MenuItem from './menuItem';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';
import firebase from 'firebase'
import { MenuType } from '../../types/menu';
import UserImage from '../../components/Image/userImage'
import { db } from '../../config/firebase';

interface Props {
  list: any
}

const MenuList = (props: Props)=> {
  let { list } = props;

  const MenuListItems = 
    list.map((item) => (
      db.collection('users').doc(item.uid).get().then(doc => {
        if (!doc.exists) return;
        item.imageUrl = (doc.data().imageUrl)
      })
    ))
  
  console.log(list)
  console.log(MenuListItems)

  return (
    <RecentActivitiesMenuFlatList
      data={list}
      extraData={list}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => 
        <RecentActivitiesMenuFlatListView>
          <UserImage uri={item.imageUrl} width={30} height={30} borderRadius={50} />
          <RecentActivitiesMenuFlatListName>
            {item.name} を行いました！
          </RecentActivitiesMenuFlatListName>
        </RecentActivitiesMenuFlatListView>
      }
    />
  )
}

const RecentActivitiesMenuFlatList = styled.FlatList`
`

const RecentActivitiesMenuFlatListView = styled.View`
  flex-direction: row;
  margin-top: 10px;
  margin-left: 15px;
  align-items: center;
`

const RecentActivitiesMenuFlatListName = styled.Text`
  margin-left: 20px;
`

export default MenuList;