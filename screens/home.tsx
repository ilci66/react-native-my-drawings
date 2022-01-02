import  React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Appearance, ScrollView, Image, FlatList } from 'react-native'; 

import { Card, Button, Icon } from 'react-native-elements'
import customBtn from '../constants/CustomStyles';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { RootTabScreenProps, Drawings } from '../types';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {

  const ip = "192.168.1.151" 
  const colorScheme = Appearance.getColorScheme();
  const [ loading, setLoading ] = useState<boolean | null>(true)
  const [ drawingData, setDrawingData ] = useState<Drawings>(undefined)

  const mapDrawingsToCards = () => {
    if(setDrawingData !== undefined) {
      return <ScrollView 
      // fixed the very slow scrolling 
      removeClippedSubviews={true}>  
      {drawingData!.map((drawing, i) => {
        return(
          <Card containerStyle={{ alignItems: 'center', justifyContent: 'center'}} key={i}>
          <Card.Title>{drawing.title}</Card.Title>
          <Card.Divider />
          {drawing.shape == "h" && <Card.Image style={styles.imageHorizontal}source={{ uri: `${drawing.url}.jpg` }} />}
          {drawing.shape == "v" && <Card.Image style={styles.imageVertical}source={{ uri: `${drawing.url}.jpg` }} />}
          {drawing.shape == "r" && <Card.Image style={styles.imageRect}source={{ uri: `${drawing.url}.jpg` }} />}

          <Text style={{ marginBottom: 10 }}>{drawing.description}</Text>
          <Card.Divider />
          <View style={{ alignItems:'center',justifyContent:'center', marginBottom:10}}>
            <Text style={{fontWeight:'bold'}}>
              {drawing.objects.map((obj:{type:string}) => (obj.type).toUpperCase() + "     ")}
            </Text>
          </View>
          <TouchableOpacity 
            style={colorScheme == 'dark' ? customBtn.btnDark: customBtn.btnLight}
            onPress={() => navigation.navigate('Detailed', drawing)}
          >
          <Text style={colorScheme == 'dark' ? customBtn.btnTextDark: customBtn.btnTextLight}>
            Edit Types
          </Text>
          </TouchableOpacity>
          </Card>
        )
      })}</ScrollView>
    }
  }

  const getDrawings = () => {
    setLoading(true)
    fetch(`http://${ip}:3002/drawings`)
      .then(res => res.json())
      .then(async data => {
        console.log("check if it actually recieves objects",Object.keys(data[0]))
        // getting the object types finally
        console.log("first drawing ==>",  data[0].objects[0].type)
        await setDrawingData(data)
        await setLoading(false)
        // console.log("just to make sure it's getting data ==>",data[0].title)
        // console.log('got all the drawings')
      })
  }
 
  useEffect(() => {
    getDrawings()
  }, [])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => getDrawings());
    return unsubscribe
  }, [navigation])

  return (
    <View style={styles.container}>
      {loading && <Text>loading...</Text>}
      {loading == false && mapDrawingsToCards()}
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
  imageRect: {
    width: 300,
    height: 300,
    // marginRight: 10,
  },
  imageVertical:{
    width:300,
    height:500,
    // marginRight: 10
  },
  imageHorizontal:{
    width:350,
    height:200,
    // marginRight:10
  }
});
