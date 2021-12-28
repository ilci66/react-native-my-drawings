import { Text, View } from '../components/Themed';
import  React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Appearance, ScrollView, Image, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import customBtn from '../constants/CustomStyles';
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from '@expo/vector-icons';


export default function Detailed ({ navigation, route }) {
  console.log("params ==>",route.params)

  const ip = "192.168.1.4" 

  const { createdAt, title, shape, updatedAt, url, description } = route.params;
  const [ isLoadingObjects, setIsLoadingObjects ] = useState<boolean>(true)
  const [ objects, setObjects ] = useState(undefined)
  const [ typesArray, setTypesArray ] = useState<[] | string[]>([]);
  const [ selectedTypes, setSelectedTypes ] = useState<[] | string[]>([]);
  
  const arrToList = (arr: string[]) => {
    return <View>

    </View>
  }

  useEffect(() => {
    fetch(`http://${ip}:3002/objects`)
      .then(res => res.json())
      .then(async data => {
        await setObjects(data)
        await setIsLoadingObjects(false)
        // if(typeOptions) await selectComponent(typeOptions);
        await setTypesArray(data.map((ele:{type:string}) => {
          return ele.type[0].toLocaleUpperCase().concat(ele.type.slice(1).toLocaleLowerCase());
        }));
        console.log("just to make sure it's getting data ==>", setObjects)
        console.log('got all the types')
      })
      
  }, []);

  return(      
    <View style={styles.container}>
      <View 
        style={shape == 'h' ? styles.vImgCon : styles.hImgCon}
      >
        <Image
          style={shape === "h" ? styles.imageHorizontal : shape === "r" ? styles.imageRect : styles.imageVertical}
          source={{ uri: `${url}.jpg` }}
        />
        <View style={{marginRight: 80, paddingLeft: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
          <Text style={{fontSize: 14, marginTop: 10}}>{description}</Text>
        </View>
      </View>
      <ScrollView  style={{backgroundColor: 'lightgray', flex:1, marginBottom:60, width:'90%', padding:10, marginTop: 20}}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {isLoadingObjects && <Text>Loading Objects..</Text>}
          <Text style={styles.title}>Edit the objects drawn</Text>
          {/* { objects !== undefined && <Text>objects are not undefined</Text>} */}
          { typesArray && selectedTypes.length < 3 ? <View style={{marginTop:20}}>
            <SelectDropdown
              data={typesArray}
              onSelect={(selectedItem, index) => {
                setSelectedTypes([...selectedTypes, selectedItem])
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => {
                // console.log("selected item ==> ", selectedItem)
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // console.log("item ==> ", item)
                return item
              }}
            /></View> : <Text>Currently {selectedTypes.length} types chosen, maximum types per drawing is 2</Text>
          }
        </View>
        <View>{selectedTypes.length > 0 && <Text>{selectedTypes.length}</Text>}</View>
        <View style={{flex:1, backgroundColor:'lime',flexDirection: 'row', justifyContent: 'space-around', paddingTop: 5, paddingBottom: 5, marginTop: 20}}>
          {/* <Icon name='cancel'/> */}
          {selectedTypes.length > 0 &&  
          selectedTypes.map(type => <View key={type} style={{flex:1, alignItems: 'center', justifyContent: 'center',margin:10, backgroundColor: 'red'}}><Text style={{fontSize: 15, alignSelf:'center', padding:20}}>{type}<Icon name='cancel'/></Text></View>)}
          
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
  vImgCon: {
    flexDirection: 'row',
    flex:0, 
    marginLeft:80
  },
  hImgCon: {
    flexDirection: 'row',
    flex:0, 
    marginLeft:80, 
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
