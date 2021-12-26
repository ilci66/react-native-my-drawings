import { Text, View } from '../components/Themed';
import  React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Appearance, ScrollView, Image, FlatList } from 'react-native';
import customBtn from '../constants/CustomStyles';
import Select, { SelectItem } from '@redmin_delishaj/react-native-select';


export default function Detailed ({ navigation, route }) {
  console.log("params ==>",route.params)

  const ip = "192.168.1.6" 

  const { createdAt, title, shape, updatedAt, url, description } = route.params;
  const [ isLoadingObjects, setIsLoadingObjects ] = useState<boolean>(true)
  const [ objects, setObjects ] = useState<undefined | SelectItem[]>(undefined)
  const [ selectedObjects, setSelectedObjects ] = useState<[]>([])
 
  useEffect(() => {
    fetch(`http://${ip}:3002/objects`)
      .then(res => res.json())
      .then(async data => {
        await setObjects(data)
        await setIsLoadingObjects(false)
        console.log("just to make sure it's getting data ==>",data)
        console.log('got all the drawings')
      })
  }, [])

  return(      
    <View style={styles.container}>
      <View style={{flexDirection: 'row',flex:1, marginLeft:80}}>
          <Image
            style={shape === "h" ? styles.imageHorizontal : shape === "r" ? styles.imageRect : styles.imageVertical}
            source={{ uri: `${url}.jpg` }}
          />
        <View style={{paddingRight: 90, paddingLeft: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
          <Text style={{fontSize: 14, marginTop: 10}}>{description}</Text>
        </View>
      </View>
      <ScrollView  style={{backgroundColor: 'lightgray', flex:1, marginBottom:60, width:'90%', padding:10}}>
        <View>
        {isLoadingObjects && <Text>Loading Objects..</Text>}
        <Text>sdasd</Text>
        { objects !== undefined && <Text>there be objects yo!</Text>}
        </View>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 100,
    flexDirection:'column'
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
    width: 150,
    height: 150,
  },
  imageVertical:{
    width: 150,
    height:250
  },
  imageHorizontal:{
    width:150,
    height:100,
  }
});
