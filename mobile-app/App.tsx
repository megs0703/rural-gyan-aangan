import React from 'react';
import { Text, View } from 'react-native';

export default function App(){
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text style={{fontSize:18, fontWeight:'bold'}}>शिक्षा सेतु Mobile - Starter</Text>
      <Text style={{marginTop:8}}>Run `npx create-expo-app` locally to initialize the full project.</Text>
    </View>
  )
}
