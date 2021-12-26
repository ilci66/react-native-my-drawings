import { Text, View } from '../components/Themed';
import  React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Appearance, ScrollView, Image, FlatList } from 'react-native';
import customBtn from '../constants/CustomStyles';
import { useForm, useController } from 'react-hook-form';
import MultiSelect from 'react-native-multiple-select';


export default function Detailed ({ navigation, route }) {
  console.log("params ==>",route.params)

  const ip = "192.168.1.6" 

  const { createdAt, title, shape, updatedAt, url, description } = route.params;
  const [ isLoadingObjects, setIsLoadingObjects ] = useState<boolean>(true)
  const [ objects, setObjects ] = useState<undefined | object[]>(undefined)
  const [ selectedObjects, setSelectedObjects ] = useState<[]>([])
  
  const onSelectedObjectsChange = (selectedObject: any) => {
    setSelectedObjects(selectedObject)
  }
 
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
    {/* <ScrollView style={{marginBottom: 50}}> */}
      <View style={{flexDirection: 'row',flex:1, marginLeft:80}}>
        <View style={{}}>  
          <Image
            style={shape === "h" ? styles.imageHorizontal : shape === "r" ? styles.imageRect : styles.imageVertical}
            source={{ uri: `${url}.jpg` }}
          />
        </View>
        <View style={{paddingRight: 90, paddingLeft: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
          <Text style={{fontSize: 14, marginTop: 10}}>{description}</Text>
        </View>
      </View>

      {isLoadingObjects && <Text>Loading Objects..</Text>}
      { objects !== undefined && <MultiSelect
        hideTags
        items={objects}
        uniqueKey='id'
        // don't yet know the purpose of this one 
        // ref={(component) => { multiSelect = component }}
        onSelectedItemsChange={onSelectedObjectsChange}
        selectedItems={selectedObjects}
        selectText="Pick Drawn Objects"
        // the list is not too large yet
        // searchInputPlaceholderText="Search Items..."
        onChangeInput={(text)=> console.log(text)}
        tagRemoveIconColor="#CCC"
        tagBorderColor="#CCC"
        tagTextColor="#CCC"
        selectedItemTextColor="#CCC"
        selectedItemIconColor="#CCC"
        itemTextColor="#000"

      />}
    {/* </ScrollView> */}

    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    paddingTop: 100
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
