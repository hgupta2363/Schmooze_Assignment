import { createContext, useEffect, useState } from 'react';
import { auth, onAuthStateChanged } from '../data/firebaseInit';
import { fetchUserData } from '../data/firebaseApi';
import AnimatedLoader from 'react-native-animated-loader';
import { ItemListLoader } from '../sharedCmponents/ItemListLoader';
export const AuthContext = createContext({
  user: null,
});

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({});
  const [fetchingUserData, setFetchingUserData] = useState(false);
  const [deviceToken, setDeviceToken] = useState('');

  useEffect(() => {
    (async () => {
      if (user) {
        console.log(user, 'user');
        setFetchingUserData(true);

        const userInfo = await fetchUserData(user.uid);
        console.log(userInfo);
        setUserData(userInfo);
        setFetchingUserData(false);
      }
    })();
  }, [user]);
  useEffect(() => {
    const unsubscribeFromAuthStatuChanged = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return unsubscribeFromAuthStatuChanged;
  }, []);

  return (
    <>
      {fetchingUserData ? (
        <ItemListLoader />
      ) : (
        <AuthContext.Provider
          value={{
            isLoggedIn: user ? true : false,
            userData: userData,
            userId: user?.uid,
            deviceToken: deviceToken,
            setDeviceToken: setDeviceToken,
          }}
        >
          {children}
        </AuthContext.Provider>
      )}
    </>
  );
};
export default AuthContextProvider;
