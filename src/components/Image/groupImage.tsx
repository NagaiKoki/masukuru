import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';
import { COLORS } from '../../constants/Styles';

interface GroupImageProps {
  url: string
  width: number
  height: number
}

interface UnsettingGroupImage {
  urls: string[]
  width: number
  height: number
}

export const GroupImage = (props: GroupImageProps) => {
  const { url, width, height } = props
  return (
    <Image source={{ uri: url }} style={{ width: width, height: height, borderRadius: 60, resizeMode: 'cover', alignSelf: 'center' }} />
  )
}

export const UnSettingGroupImage = (props: UnsettingGroupImage) => {
  const { urls, width, height } = props;
  const length = urls.length

  if (length === 1) {
    return (
      <Image source={ urls[0] ? { uri: urls[0] } : require('../../assets/profileDefaultImage.png') } 
                      style={{ width: width, 
                      height: height, 
                      borderRadius: 60, 
                      resizeMode: 'cover', 
                      alignSelf: 'center' }} 
      />
    )
  } else if (length === 2) {
    return (
      <MeshWrapper>
        <LeftTwoMeshWrapper>
          <Image source={ urls[0] ? { uri: urls[0] } : require('../../assets/profileDefaultImage.png') } 
              style={{ width: width / 2, 
              height: height, 
              borderTopLeftRadius: 60,
              borderBottomLeftRadius: 60,
              resizeMode: 'cover', 
              alignSelf: 'center' }} 
        />
        </LeftTwoMeshWrapper>
        <RigthTwoMeshWrapper>
          <Image source={ urls[1] ? { uri: urls[1] } : require('../../assets/profileDefaultImage.png') } 
              style={{ width: width / 2, 
                      height: height, 
                      borderTopRightRadius: 60,
                      borderBottomRightRadius: 60,
                      resizeMode: 'cover', 
                      alignSelf: 'center' }} 
          />
        </RigthTwoMeshWrapper>
      </MeshWrapper>
    )
  } else if (length === 3) {
    return (
      <MeshWrapper>
        <LeftTwoMeshWrapper>
          <Image source={ urls[0] ? { uri: urls[0] } : require('../../assets/profileDefaultImage.png') } 
            style={{ width: width / 2, 
                    height: height, 
                    borderTopLeftRadius: 60,
                    borderBottomLeftRadius: 60,
                    resizeMode: 'cover', 
                    alignSelf: 'center' }} 
          />
        </LeftTwoMeshWrapper>
       <Wrapper>
         <RightTopMeshWrapper>
          <Image source={ urls[1] ? { uri: urls[1] } : require('../../assets/profileDefaultImage.png') } 
            style={{ width: width / 2, 
                    height: height / 2, 
                    borderTopRightRadius: 60,
                    resizeMode: 'cover', 
                    alignSelf: 'center' }} 
          />
         </RightTopMeshWrapper>
         <RightBottomMeshWrapper>
          <Image source={ urls[2] ? { uri: urls[2] } : require('../../assets/profileDefaultImage.png') } 
            style={{ width: width / 2, 
                    height: height / 2, 
                    borderBottomRightRadius: 60,
                    resizeMode: 'cover', 
                    alignSelf: 'center' }} 
          />
         </RightBottomMeshWrapper>
       </Wrapper>
      </MeshWrapper>
    )
  } else if (length >= 4) {
    return (
      <MeshWrapper>
        <Wrapper>
          <LeftTopMeshWrapper>
            <Image source={ urls[0] ? { uri: urls[0] } : require('../../assets/profileDefaultImage.png') } 
              style={{ width: width / 2, 
                      height: height / 2, 
                      borderTopLeftRadius: 60,
                      resizeMode: 'cover', 
                      alignSelf: 'center' }} 
            />
          </LeftTopMeshWrapper>
          <LeftBottomMeshWrapper>
            <Image source={ urls[1] ? { uri: urls[1] } : require('../../assets/profileDefaultImage.png') } 
                  style={{ width: width / 2, 
                      height: height / 2, 
                      borderBottomLeftRadius: 60,
                      resizeMode: 'cover', 
                      alignSelf: 'center' }} 
            />
          </LeftBottomMeshWrapper>
        </Wrapper>
        <Wrapper>
          <RightTopMeshWrapper>
            <Image source={ urls[2] ? { uri: urls[2] } : require('../../assets/profileDefaultImage.png') } 
              style={{ width: width / 2, 
                      height: height / 2, 
                      borderTopRightRadius: 60,
                      resizeMode: 'cover', 
                      alignSelf: 'center' }} 
            />
          </RightTopMeshWrapper>
          <RightBottomMeshWrapper>
            <Image source={ urls[3] ? { uri: urls[3] } : require('../../assets/profileDefaultImage.png') } 
              style={{ width: width / 2, 
                      height: height / 2, 
                      borderBottomRightRadius: 60,
                      resizeMode: 'cover', 
                      alignSelf: 'center' }} 
            />
          </RightBottomMeshWrapper>
        </Wrapper>
      </MeshWrapper>
    )
  } else {
    return (
      <Image source={require('../../assets/profileDefaultImage.png')} 
        style={{ width: width, height: height, resizeMode: 'cover', alignSelf: 'center', borderRadius: 60 }} 
      />
    )
  }
}

const MeshWrapper = styled.View`
  border-radius: 60px;
  flex-direction: row;
`

const Wrapper = styled.View``

const RigthTwoMeshWrapper = styled.View`
  border-left-color: ${COLORS.BASE_BLACK};
  border-left-width: 0.5px;
`

const LeftTwoMeshWrapper = styled.View`
  border-right-color: ${COLORS.BASE_BLACK};
  border-right-width: 0.5px;
`

const LeftTopMeshWrapper = styled.View`
  border-right-color: ${COLORS.BASE_BLACK};
  border-bottom-color: ${COLORS.BASE_BLACK};
  border-right-width: 0.5px;
  border-bottom-width: 0.5px;
`

const LeftBottomMeshWrapper = styled.View`
  border-top-color: ${COLORS.BASE_BLACK};
  border-right-color: ${COLORS.BASE_BLACK};
  border-right-width: 0.5px;
  border-top-width: 0.5px;
`

const RightTopMeshWrapper = styled.View`
  border-left-color: ${COLORS.BASE_BLACK};
  border-bottom-color: ${COLORS.BASE_BLACK};
  border-left-width: 0.5px;
  border-bottom-width: 0.5px;
`

const RightBottomMeshWrapper = styled.View`
  border-left-color: ${COLORS.BASE_BLACK};
  border-top-color: ${COLORS.BASE_BLACK};
  border-left-width: 0.5px;
  border-top-width: 0.5px;
`
