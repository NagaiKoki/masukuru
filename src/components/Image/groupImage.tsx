import React from 'react';
import { Image } from 'react-native';
import styled from 'styled-components';

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
      <React.Fragment>
        <Image source={ urls[0] ? { uri: urls[0] } : require('../../assets/profileDefaultImage.png') } 
             style={{ width: width, 
             height: height / 2, 
             borderBottomLeftRadius: 60,
             borderBottomRightRadius: 60,
             resizeMode: 'cover', 
             alignSelf: 'center' }} 
       />
       <Image source={ urls[1] ? { uri: urls[1] } : require('../../assets/profileDefaultImage.png') } 
            style={{ width: width, 
                    height: height / 2, 
                    borderBottomLeftRadius: 60,
                    borderBottomRightRadius: 60,
                    resizeMode: 'cover', 
                    alignSelf: 'center' }} 
       />
      </React.Fragment>
    )
  } else if (length === 3) {
    return (
      <MeshWrapper>
        <Image source={ urls[0] ? { uri: urls[0] } : require('../../assets/profileDefaultImage.png') } 
          style={{ width: width / 2, 
                  height: height, 
                  borderTopLeftRadius: 60,
                  borderBottomLeftRadius: 60,
                  resizeMode: 'cover', 
                  alignSelf: 'center' }} 
        />
       <TwoMeshWrapper>
        <Image source={ urls[1] ? { uri: urls[1] } : require('../../assets/profileDefaultImage.png') } 
          style={{ width: width / 2, 
                  height: height / 2, 
                  borderTopRightRadius: 60,
                  resizeMode: 'cover', 
                  alignSelf: 'center' }} 
        />
        <Image source={ urls[2] ? { uri: urls[2] } : require('../../assets/profileDefaultImage.png') } 
          style={{ width: width / 2, 
                  height: height / 2, 
                  borderBottomRightRadius: 60,
                  resizeMode: 'cover', 
                  alignSelf: 'center' }} 
        />
       </TwoMeshWrapper>
      </MeshWrapper>
    )
  } else if (length >= 4) {
    return (
      <MeshWrapper>
        <TwoMeshWrapper>
          <Image source={ urls[0] ? { uri: urls[0] } : require('../../assets/profileDefaultImage.png') } 
            style={{ width: width / 2, 
                    height: height / 2, 
                    borderTopLeftRadius: 60,
                    resizeMode: 'cover', 
                    alignSelf: 'center' }} 
          />
          <Image source={ urls[1] ? { uri: urls[1] } : require('../../assets/profileDefaultImage.png') } 
          style={{ width: width / 2, 
                  height: height / 2, 
                  borderBottomLeftRadius: 60,
                  resizeMode: 'cover', 
                  alignSelf: 'center' }} 
        />
        </TwoMeshWrapper>
       <TwoMeshWrapper>
        <Image source={ urls[2] ? { uri: urls[2] } : require('../../assets/profileDefaultImage.png') } 
          style={{ width: width / 2, 
                  height: height / 2, 
                  borderTopRightRadius: 60,
                  resizeMode: 'cover', 
                  alignSelf: 'center' }} 
        />
        <Image source={ urls[3] ? { uri: urls[3] } : require('../../assets/profileDefaultImage.png') } 
          style={{ width: width / 2, 
                  height: height / 2, 
                  borderBottomRightRadius: 60,
                  resizeMode: 'cover', 
                  alignSelf: 'center' }} 
        />
       </TwoMeshWrapper>
      </MeshWrapper>
    )
  }
}

const MeshWrapper = styled.View`
  border-radius: 60px;
  flex-direction: row;
`

const TwoMeshWrapper = styled.View``

