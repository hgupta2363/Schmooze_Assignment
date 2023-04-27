import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginSignUpScreen from './modules/auth/LoginSignupScreen';
import OtpScreen from './modules/auth/OtpScreen';
import { AuthContext } from './contextProvider/AuthProvider';
import ChatRoomeList from './modules/chat/ChatRoomeList';
import ChatRoomDetails from './modules/chat/ChatRoomDetails';
const Stack = createStackNavigator();

const AuthStackScreen = (
  <Stack.Navigator>
    <Stack.Screen
      name='loginSignUpScreen'
      component={LoginSignUpScreen}
      options={{ title: 'Login' }}
    />
  </Stack.Navigator>
);
const HomeStackScreen = (
  <Stack.Navigator>
    <Stack.Screen name='chatRoomeList' component={ChatRoomeList} />
  </Stack.Navigator>
);

export default function RootNavigation() {
  const { isLoggedIn } = useContext(AuthContext);
  return (
    <NavigationContainer>
      {!isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            name='loginSignUpScreen'
            component={LoginSignUpScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name='chatRoomeList'
            component={ChatRoomeList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name='ChatRoomDetails'
            component={ChatRoomDetails}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
