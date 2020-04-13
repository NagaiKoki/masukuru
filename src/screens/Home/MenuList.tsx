import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import MenuItem from './MenuItem';
import firebase from 'firebase'
import { MenuType } from '../../types/menu';
import { db } from '../../config/firebase';


interface Props {
  currentGroupId?: string
  menuList: MenuType[]
  setMenuList: Dispatch<SetStateAction<MenuType[]>>
}

const MenuList = (props: Props)=> {
  const { menuList, setMenuList, currentGroupId }  = props;

  useEffect(() => {
    GetMenuList(currentGroupId)
  }, [])

  const GetMenuList = (GroupId) => {
    let list = []
    db.collectionGroup('menus').where('groupId', '==', GroupId).orderBy('createdAt', 'desc').limit(3)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        list.push({name: doc.data().name, uid: doc.data().uid, id: doc.id})})
      setMenuList(list)
    })
    .catch(function(error) {
      console.log("Error getting documents: ", error);
    })
  }

  const MenuListItem =
    menuList.map((item, index) => (
      <MenuItem key={index} item={item}/>  
  ))

  return (
    <View>
      {MenuListItem}
    </View>
  )
}

export default MenuList;