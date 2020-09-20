import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../../constants/Styles';

interface Props {
  handleOnClick: () => void
}

const CloseButton = (props: Props) => {
  const { handleOnClick } = props

  return (
    <Wrapper onPress={handleOnClick}>
      <Icon name="close" size={25} styles={{ color: COLORS.BASE_BLACK }} />
    </Wrapper>
  )
}

export default CloseButton

const Wrapper = styled.TouchableOpacity`
`