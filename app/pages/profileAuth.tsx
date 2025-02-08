import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../config/firebaseConfig'; // Adjust the import path as needed
import ProfileComp from '@/components/ProfileComp';


const Main = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasAuth, setAuth] = useState(false);

  //useEffect(() => {
    //const unsubscribe = onAuthStateChanged(auth, (user) => {
   //   setUser(user);
   //   setLoading(false);
  //    setAuth(true);
  /// });

  // return () => unsubscribe();
 // }, []);
   


  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return <View>
        <ProfileComp/>;
    </View>
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
