import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { View } from 'react-native';
import MenuItem from './MenuItem';
import { MenuType } from '../../types/menu';

interface Props {
  currentGroupId?: string
  menuList: MenuType[]
  GetMenuList: any;
}

const MenuList = (props: Props) => {
  const { menuList, currentGroupId, GetMenuList }  = props;

  useEffect(() => {
    GetMenuList(currentGroupId)
  }, [])

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