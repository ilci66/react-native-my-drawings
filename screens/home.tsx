import  React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Appearance, ScrollView } from 'react-native';

import { Card, Button, Icon } from 'react-native-elements'
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
      <ScrollView>
        
      <Card>
            <Card.Title>HELLO WORLD</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0 }}
              source={{
                uri:
                  'https://awildgeographer.files.wordpress.com/2015/02/john_muir_glacier.jpg',
              }}
            />
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
            <Button
              icon={
                <Icon
                  name="code"
                  color="#ffffff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="VIEW NOW"
            />
          </Card>
          
      <Card>
            <Card.Title>HELLO WORLD</Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0 }}
              source={{
                uri:
                'https://imgur.com/gLFiC4o',
              }}
            />
            <Text style={{ marginBottom: 10 }}>
              The idea with React Native Elements is more about component
              structure than actual design.
            </Text>
            <Button
              icon={
                <Icon
                  name="code"
                  color="#ffffff"
                  iconStyle={{ marginRight: 10 }}
                />
              }
              buttonStyle={{
                borderRadius: 0,
                marginLeft: 0,
                marginRight: 0,
                marginBottom: 0,
              }}
              title="VIEW NOW"
            />
          </Card>
      </ScrollView>
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
