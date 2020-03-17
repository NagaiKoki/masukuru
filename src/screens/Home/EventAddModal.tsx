import React from 'react';
import Modal from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';

const EventAddModal = () => {
  return (
    <ModalContainer>
      <EventModal 
        animationType="slide"
        transparent={true}
        visible={true}>
      >
        <ModalView>
          <ModalTitle>
            トレーニングを追加する
          </ModalTitle>
        </ModalView>
      </EventModal>
    </ModalContainer>
  );
}

const ModalContainer = styled.View`
  flex: 1;
  height: 150px;
  background-color: #FFF;
`

const EventModal = styled.Modal`
`

const ModalView = styled.View`
`

const ModalTitle = styled.Text`
`

export default EventAddModal