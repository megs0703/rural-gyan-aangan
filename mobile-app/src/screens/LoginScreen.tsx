import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

export default function LoginScreen(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={{flex:1, padding:20, justifyContent:'center'}}>
      <Text style={{fontSize:22, fontWeight:'bold', marginBottom:12}}>शिक्षा सेतु</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={{borderWidth:1, padding:8, marginBottom:8}} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={{borderWidth:1, padding:8, marginBottom:12}} />
      <Button title="Sign In" onPress={() => { /* wire auth to backend */ }} />
    </View>
  )
}
