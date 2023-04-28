import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

export default function MessegeTile({ messegeData, isRommieMessege }) {
  console.log(isRommieMessege, messegeData, 'isRommieMessege');
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
    justifyContent: 'center',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 150,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  myMessegeContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 150,
    backgroundColor: '#246bfd',
    borderRadius: 10,
    marginLeft: '58%',
    marginTop: 20,
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
