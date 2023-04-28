import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  FlatList,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import { Ionicons } from '@expo/vector-icons';
import UserAvatar from 'react-native-user-avatar';
import {
  fetchMessegesByRoomId,
  addNewMessegeInRoom,
  updateLastMessegeExchagened,
} from '../../data/firebaseApi';
import { AuthContext } from '../../contextProvider/AuthProvider';
import uuid from 'react-native-uuid';
import MessegeTile from './MessegeTile';
export default function ChatRoomDetails({ route, navigation }) {
  const [messegeText, setMessegeText] = useState('');
  const [isMessegeInputFocused, setIsMessegeInputFocused] = useState(false);
  const [messegeList, setMessegeList] = useState([]);
  const { userData } = useContext(AuthContext);
  console.log(userData, 'messegeList');
  useEffect(() => {
    (async () => {
      try {
        //fetching all messege in a room
        const messeges = await fetchMessegesByRoomId(
          route?.params?.roomId,
          setMessegeList
        );

        setMessegeList(messeges);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [route?.params?.roomId]);
  const sendMessege = async () => {
    const messegeData = {
      messegeText: messegeText,
      senderId: userData.id,
      sendAt: new Date(),
      id: uuid.v1(),
    };
    setMessegeText('');
    setMessegeList((prevList) => [...prevList, messegeData]);
    await addNewMessegeInRoom(route?.params?.roomId, messegeData);
    await updateLastMessegeExchagened(route?.params?.roomId, messegeData);
  };
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor='#fff'
          onPress={() => navigation.pop()}
        >
          <Ionicons name='arrow-back' size={24} color='white' />
        </TouchableHighlight>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'baseline',
          }}
        >
          <UserAvatar size={50} name={route?.params?.roomieName} />
          <Text style={styles.nameText}>{route?.params?.roomieName}</Text>
        </View>
      </View>
      <View>
        {messegeList && messegeList.length > 0 ? (
          <FlatList
            data={messegeList}
            renderItem={({ item }) => (
              <MessegeTile
                messegeData={item}
                isRommieMessege={!(userData?.id === item?.senderId)}
              />
            )}
            keyExtractor={(messege) => messege?.id}
          />
        ) : null}
      </View>
      <View style={styles.bottom}>
        <TextInput
          type='text'
          placeholder='Type your Messege'
          onChangeText={(text) => setMessegeText(text)}
          style={[
            styles.inputStyle,
            isMessegeInputFocused ? styles.focusedInput : {},
          ]}
          value={messegeText}
          onFocus={() => setIsMessegeInputFocused(true)}
        />

        <TouchableHighlight
          style={{
            backgroundColor: '#246bfd',
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 10,
            opacity: messegeText ? 1 : 0.6,
          }}
          onPress={() => sendMessege()}
        >
          <Ionicons name='md-send-sharp' size={25} color='white' />
        </TouchableHighlight>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 30,
    backgroundColor: '#246bfd',
    width: '100%',
  },
  container: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputStyle: {
    borderRadius: 10,

    borderWidth: 1,
    borderColor: '#e3e1e1',
    width: 300,
    backgroundColor: '#fbf8f8',
    maxWidth: 320,
    height: 50,
    marginTop: 20,
    paddingLeft: 15,
    fontSize: 15,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: '#246bfd',
  },
  bottom: {
    position: 'absolute',
    bottom: 10,
    paddingLeft: 25,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  nameText: {
    color: 'white',
    fontSize: 18,
  },
});
