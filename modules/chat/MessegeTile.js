import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function MessegeTile({ messegeData, isRommieMessege }) {
  console.log(isRommieMessege, 'isRommieMessege');
  return (
    <View
      style={
        isRommieMessege
          ? styles.roomieMessegeContainer
          : styles.myMessegeContainer
      }
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
        }}
      >
        <Text
          style={
            isRommieMessege ? styles.roomieMessegetext : styles.myMessegetext
          }
        >
          {messegeData?.messegeText}
        </Text>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  roomieMessegeContainer: {
    display: 'flex',
    flexDirection: 'row',

    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 200,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  myMessegeContainer: {
    display: 'flex',
    flexDirection: 'row',

    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 200,
    backgroundColor: '#246bfd',
    borderRadius: 10,
    position: 'absolute',
  },
  roomieMessegetext: {
    color: '#246bfd',
    fontSize: 16,
    fontWeight: '400',
  },
  myMessegetext: {
    color: 'white',
    fontSize: 16,
    fontWeight: '400',
  },
});
