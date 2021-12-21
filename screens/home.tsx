import  React, { useEffect } from 'react';
import { StyleSheet, Pressable, TouchableOpacity, Appearance, ScrollView } from 'react-native';
import customBtn from '../constants/CustomStyles';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { RootTabScreenProps } from '../types';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {

  const colorScheme = Appearance.getColorScheme();

  const updateDrawing = () => {
    console.log('I wanna update the drawing')
  }

  const getDrawings = () => {
    return fetch('192.168.1.4:3002/drawings')
      .then(res => res.json())
      .then(data => console.log(data))
  }
 
  useEffect(() => {
    console.log('fetch data when the app loads')
  //   fetch('192.168.1.4:3002/drawings')
  //     .then(res => res.json())
  //     .then(data => console.log(data))
  }, [])


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home</Text>
      <Text>Drawings will be displayed as cards with the option toupdate the object information</Text>
      <Text>Might add a filter option at the top of the page for object types, not sure yet</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <TouchableOpacity onPress={updateDrawing} style={colorScheme == 'dark' ? customBtn.btnDark: customBtn.btnLight}>
        <Text style={colorScheme == 'dark' ? customBtn.btnTextDark: customBtn.btnTextLight}>asdasd </Text>
      </TouchableOpacity>
      {/* <EditScreenInfo path="/screens/TabOneScreen.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
