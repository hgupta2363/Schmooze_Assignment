import { View, Text, SafeAreaView, StyleSheet, FlatList } from 'react-native';
import React, { useEffect, useContext, useState } from 'react';
import { fetchChatRooms } from '../../data/firebaseApi';
import { async } from '@firebase/util';
import { AuthContext } from '../../contextProvider/AuthProvider';
import ChatRoomTile from './ChatRoomTile';
import AnimatedLoader from 'react-native-animated-loader';
import { ItemListLoader } from '../../sharedCmponents/ItemListLoader';
const ChatRoomeList = ({ navigation }) => {
  const [chatRoomList, setChatRoomList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useContext(AuthContext);
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchChatRooms(userData, setChatRoomList);
      setLoading(false);
    })();
  }, [userData]);
  console.log(chatRoomList, 'chatRoomList');
  return (
    <>
      {loading ? (
        <View>
          <ItemListLoader />
        </View>
      ) : (
        <SafeAreaView style={styles.container}>
          {chatRoomList && chatRoomList.length > 0 && (
            <FlatList
              data={chatRoomList}
              renderItem={({ item }) => (
                <ChatRoomTile room={item} navigation={navigation} />
              )}
              keyExtractor={(room) => room?.roomId}
            />
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
});
export default ChatRoomeList;
