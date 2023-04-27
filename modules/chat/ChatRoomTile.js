import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contextProvider/AuthProvider';
import { fetchUserData } from '../../data/firebaseApi';
import UserAvatar from 'react-native-user-avatar';
export default function ChatRoomTile({ room, navigation }) {
  console.log(navigation, 'navigation');
  console.log(room, 'inTile');
  const { userData } = useContext(AuthContext);
  const [rommieData, setRommieData] = useState(); //other person info in room
  useEffect(() => {
    (async () => {
      const roomieId =
        userData?.id === room?.users[0] ? room?.users[1] : room?.users[0];
      console.log(roomieId, 'roomieId');
      let rommieData = await fetchUserData(roomieId);
      setRommieData(rommieData);
    })();
  }, []);
  return (
    <TouchableHighlight
      activeOpacity={0.8}
      underlayColor='#fff'
      onPress={() =>
        navigation.push('ChatRoomDetails', {
          roomId: room?.roomId,
          roomieName: rommieData?.name,
        })
      }
    >
      <View style={[styles.roomContainer, styles.shadowProp]}>
        <UserAvatar size={70} name={rommieData?.name} />
        <View>
          <Text style={styles.nameText}>{rommieData?.name}</Text>
          <Text style={styles.secondryText}>Write your first messege</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}
const styles = StyleSheet.create({
  roomContainer: {
    paddingHorizontal: 20,
    paddingVertical: 20,

    borderRadius: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 40,
    backgroundColor: 'white',
    marginTop: 20,
  },
  nameText: {
    fontSize: 20,
    fontWeight: '600',
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  secondryText: {
    color: '#0e59f0',
    fontSize: 14,
    marginTop: 10,
  },
});
