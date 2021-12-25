import  React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Appearance, ScrollView, Image, FlatList } from 'react-native';

import { Card, Button, Icon } from 'react-native-elements'
import customBtn from '../constants/CustomStyles';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

import { RootTabScreenProps, Drawings } from '../types';

export default function Home({ navigation }: RootTabScreenProps<'Home'>) {

  const ip = "172.31.64.1" 

  const colorScheme = Appearance.getColorScheme();

  const [ loading, setLoading ] = useState<boolean | null>(true)
  
  const [ drawingData, setDrawingData ] = useState<Drawings>(undefined)

  const updateDrawing = async (data :any) => {
    
    console.log('Update the drawing with this ==>', data)
  }

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

          <Text style={{ marginBottom: 10 }}>
            {drawing.description}
          </Text>
          {/* <TouchableOpacity 
            onPress={getDrawings} 
            style={colorScheme == 'dark' ? customBtn.btnDark: customBtn.btnLight}
          >
          <Text style={colorScheme == 'dark' ? customBtn.btnTextDark: customBtn.btnTextLight}>
            Edit
          </Text>
          </TouchableOpacity> */}
          <TouchableOpacity 
            style={colorScheme == 'dark' ? customBtn.btnDark: customBtn.btnLight}
            onPress={() => navigation.navigate('Detailed', drawing)}
          >
          <Text style={colorScheme == 'dark' ? customBtn.btnTextDark: customBtn.btnTextLight}>
            Edit
          </Text>
          </TouchableOpacity>
          {/* <Button
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
          /> */}
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
        await setDrawingData(data)
        await setLoading(false)
        console.log("just to make sure it's getting data ==>",data[0].title)
        console.log('got all the drawings')
      })
  }
 
  useEffect(() => {
    getDrawings()
  }, [])


  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Home</Text>
      <Text>
        Drawings will be displayed as cards with the option toupdate the object information
      </Text> */}
      {/* <Text>
        Might add a filter option at the top of the page for object types, not sure yet
      </Text> */}
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* <TouchableOpacity 
        onPress={getDrawings} 
        style={colorScheme == 'dark' ? customBtn.btnDark: customBtn.btnLight}
      >
        <Text 
          style={colorScheme == 'dark' ? customBtn.btnTextDark: customBtn.btnTextLight}>
            asdasd 
        </Text> */}
      {/* </TouchableOpacity> */}
      {loading && <Text>loading...</Text>}
      {loading == false && mapDrawingsToCards()}
      {/* <Text>sdasd</Text> */}
      {/* {drawingData!==undefined ? mapDrawingsToCards() : null} */}
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
    width: 300,
    height:500,
    // marginRight: 10
  },
  imageHorizontal:{
    width:300,
    height:200,
    // marginRight:10
  }
});
