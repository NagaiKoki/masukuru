import React from 'react'
import Icon from 'react-native-vector-icons/EvilIcons';
import { COLORS } from '../../constants/Styles';

type Props = {
  iconName: string
  type: 'left' | 'right'
  onPress: () => void
}

const HeaderIconButton = (props: Props) => {
  const { iconName, type, onPress } = props
  
  return (
    <Icon name={iconName} 
      size={24} 
      onPress={onPress} 
      style={{ marginLeft: type === 'left' ? 20 : 0, marginRight: type === 'right' ? 20 : 0, color: COLORS.BASE_WHITE }}
    />
  )
}

export default HeaderIconButton