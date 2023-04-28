import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { fetchChatRooms } from '../../data/firebaseApi';
import { async } from '@firebase/util';
import { AuthContext } from '../../contextProvider/AuthProvider';
import ChatRoomTile from './ChatRoomTile';
import AnimatedLoader from 'react-native-animated-loader';
import { ItemListLoader } from '../../sharedCmponents/ItemListLoader';
import UserAvatar from 'react-native-user-avatar';
import { auth, signOut } from '../../data/firebaseInit';
const ChatRoomeList = ({ navigation }) => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      setLoading(true);
      //fetching room of a specific user
      await fetchChatRooms(userData, setChatRoomList);
      setLoading(false);
    })();
  }, [userData]);

  return (
    <>
      <View style={styles.header}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            alignItems: 'baseline',
          }}
        >
          <UserAvatar size={50} name={userData?.name} />
          <Text style={styles.nameText}>{userData?.name}</Text>
        </View>
        <TouchableHighlight
          activeOpacity={0.8}
          underlayColor='#fff'
          onPress={async () => await signOut(auth)}
        >
          <Text style={styles.nameText}>Logout</Text>
        </TouchableHighlight>
      </View>
      {loading ? (
        <View>
          <ItemListLoader />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          {chatRoomList && chatRoomList.length > 0 ? (
            <FlatList
              data={chatRoomList}
              renderItem={({ item }) => (
                <ChatRoomTile room={item} navigation={navigation} />
              )}
              keyExtractor={(room) => room?.roomId}
            />
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Text style={{ fontSize: 20, color: '#246bfd' }}>
                No Rooms Availlable
              </Text>
            </View>
          )}
        </SafeAreaView>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginVertical: 100,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    backgroundColor: '#246bfd',
    width: '100%',
  },
  nameText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
});
export default ChatRoomeList;
