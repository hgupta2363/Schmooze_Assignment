import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contextProvider/AuthProvider';
import { fetchUserData } from '../../data/firebaseApi';
import UserAvatar from 'react-native-user-avatar';
export default function ChatRoomTile({ room, navigation }) {
  const { userData } = useContext(AuthContext);
  const [rommieData, setRommieData] = useState(); //other person info in room
  let date = room?.lastMessegeAt?.toDate()?.toDateString() ?? '';
  let time = room?.lastMessegeAt?.toDate()?.toLocaleTimeString() ?? '';
  useEffect(() => {
    (async () => {
      //here each room consist 2 person so 1 person is whoever loggedin second user we are calling roomie

      const roomieId =
        userData?.id === room?.users[0] ? room?.users[1] : room?.users[0];
      console.log(roomieId, 'roomieId');
      //roomie is also user so we can fetch this info from schoomzeUser collection
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
          <Text style={styles.secondryText}>
            {room?.lastMessegeExchanged
              ? room?.lastMessegeExchanged
              : 'Write your first Messege '}
          </Text>
        </View>
        {date && time ? (
          <View>
            <Text style={styles.dateText}>{date}</Text>
            <Text style={styles.timeText}>{time}</Text>
          </View>
        ) : null}
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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
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
    color: 'gray',
    fontSize: 14,
    marginTop: 10,
  },
  dateText: {
    marginBottom: 8,
    fontSize: 12,
    color: 'gray',
  },
  timeText: {
    marginBottom: 8,
    fontSize: 12,
    color: 'gray',
  },
});
