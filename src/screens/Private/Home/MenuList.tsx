import { Dispatch, SetStateAction } from 'react'
import React, { useEffect } from 'react';
import { View } from 'react-native';
import MenuItem from './MenuItem';
import { MenuType } from '../../../types/menu';
import styled from 'styled-components';

interface Props {
  currentGroupId?: string
  menuList: MenuType[]
  setMenuList: Dispatch<SetStateAction<MenuType[]>>
  requestGroupMenuList: any;
}

const MenuList = (props: Props) => {
  const { menuList, setMenuList, currentGroupId, requestGroupMenuList }  = props;

  // useEffect(() => {
  //   requestGroupMenuList(setMenuList, currentGroupId)
  // }, [])

  const MenuListItem =
    menuList.map((item, index) => (
      <MenuItem key={index} item={item}/>  
  ))

  return (
    menuList.length ?
    <View>
      {MenuListItem}
    </View>
    :
    <NoneMenuListText>
      直近の活動が表示されます。
    </NoneMenuListText>
  )
}

export default MenuList;

const NoneMenuListText = styled.Text`
  text-align: center;
  margin-top: 50px;
  font-size: 15px;
  font-weight: bold;
  color: #808080;
`