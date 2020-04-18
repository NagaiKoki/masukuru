import React, { useEffect } from 'react';
import { View } from 'react-native';
import MenuItem from './MenuItem';
import { MenuType } from '../../types/menu';
import styled from 'styled-components';

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
    menuList.length == 0?
    <NoneMenuListText>
      直近の活動が表示されます。
    </NoneMenuListText>
    :
    <View>
      {MenuListItem}
    </View>
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