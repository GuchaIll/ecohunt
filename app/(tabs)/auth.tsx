import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = () => {
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('User signed up:', user);

        // Optionally, you can add the user to Firestore
        db.collection('users').doc(user.uid).set({
          email: user.email,
          createdAt: new Date(),
        })
        .then(() => {
          console.log('User added to Firestore');
        })
        .catch((error) => {
          console.error('Error adding user to Firestore:', error);
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Error signing up:', errorCode, errorMessage);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={handleSignUp} />
    </View>
  );
}