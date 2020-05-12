
import React, { Dispatch, SetStateAction } from 'react'
import { Alert } from 'react-native'
import firebase from 'firebase';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
// import lib
import { factoryRandomCode } from '../lib/randomTextFactory'

export const ImageUpload = async (setProgress: Dispatch<SetStateAction<string>>, setUri: Dispatch<SetStateAction<string>>, user?: firebase.User, groupId?: string) => {
    let ImageName: string;
    console.log(user)
    console.log(groupId)
    if (!!user) {
      ImageName = `profile_image_${factoryRandomCode(20)}`;
    } else if (groupId) {
      ImageName = `group_image_${factoryRandomCode(20)}`;
    }

    if (IsCameraEnable) {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        base64: false,
      });
      
      try  {
        if (!result.cancelled) {
          // visual studio codeの影響でエラーをはく。
          // TSの問題はないので一旦無視
          const localUri = await fetch(result.uri); 
          const localBlob = await localUri.blob();
          const filename = ImageName;
          const storageRef = firebase.storage().ref().child("image/" + filename);
    
          const uploadTask = storageRef.put(localBlob);
          uploadTask.on('state_changed', (snapshot) => {
            let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress + '%');
          }, (error) => {
            console.log(error);
            alert(error);
          }, () => {
            uploadTask.snapshot.ref.getDownloadURL().then(downLoadURL => {
              setProgress('');
              setUri(downLoadURL);
            })
          })
        }
      } catch(error) {
        console.log(error);
        alert(error);
      }
    }
  }
  
  // カメラロールの許可判定
    const IsCameraEnable = async () => {
      if (Constants.platform.ios) {
        const { status } = await Permissions.askAsync(Permissions.CAMERA);
        if (status !== 'granted') {
          Alert.alert("カメラロールを許可してください。");
          return false;
        } else {
          return true;
        };
      };
    }
  