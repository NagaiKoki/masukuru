import React from 'react'
import MaterialIconsIcons from 'react-native-vector-icons/MaterialIcons';
// import constants
import { COLORS } from '../../constants/Styles';
// import config
import { db } from '../../config/firebase'
// import utils
import truncateText from '../../utilities/truncateText'

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
    <MaterialIconsIcons name="group" 
                    size={23} 
                    onPress={() => { navigation.navigate('groupInfo', { currentGroupId: currentGroupId }) }} 
                    style={{ paddingRight: 20, color: COLORS.BASE_WHITE }}
    />
  ),
  headerTitle: groupName ? truncateText(groupName, 15) : 'ホーム'
});
}