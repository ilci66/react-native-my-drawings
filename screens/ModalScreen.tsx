import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, StyleSheet, FlatList } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function ModalScreen() {

  const objectives = [
    {key:1, o:"Practise react native."},
    {key:2, o:"Edit / update my drawings."},
    {key:3, o:"Test my drawings api."},
  ]

  return (
    <View style={styles.container}>
      <Text style={{paddingTop:40, fontSize:20, fontWeight:'bold'}}>About the app</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {/* <Text style={{padding: 40}}>Creating this app mainly to understand the workings of react native </Text> */}
      <View style={styles.darkerContainer}>
        <Text style={{fontWeight:'bold', marginBottom:40,}}>I created this simple app to:</Text>
        <FlatList 
          data={objectives}
          renderItem={({item}) => <Text style={{marginBottom:20}}>{item.o}</Text>}
        />
      </View>

      {/* <EditScreenInfo path="/screens/ModalScreen.tsx" /> */}

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  darkerContainer: {
    flex: 1,
    // backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    // marginBottom:370
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
