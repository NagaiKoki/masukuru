import React from 'react'
import { COLORS } from '../../constants/Styles';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { db } from '../../config/firebase'

export const getHeaderNav= async (currentGroupId: string, navigation: any) => {
  let groupName;
  await db.collection('groups').doc(currentGroupId).get().then(snap => {
    if (snap.data() && snap.data().groupName) {
      groupName = snap.data().groupName
    } 
  })

// グループ編集遷移
navigation.setOptions({
  headerRight: () => (
    <EvilIcons name="gear" 
               size={26} 
               onPress={() => { navigation.navigate('groupInfo', { currentGroupId: currentGroupId }) }} 
               style={{ paddingRight: 20, color: COLORS.BASE_WHITE }}
    />
  ),
  headerTitle: groupName ? groupName : 'ホーム'
});
}