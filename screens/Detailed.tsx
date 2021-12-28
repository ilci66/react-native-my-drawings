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
  const colorScheme = Appearance.getColorScheme();
  
  const sendTypes = (id:number) => {
    fetch(`http://${ip}:3002/drawing/${id}`)
  }

  const removeType = (index:number) => {
    console.log("selected ==>",selectedTypes, "index ==>",index)
    if(index === 0) setSelectedTypes([...selectedTypes.shift()])
    setSelectedTypes([...selectedTypes.slice(0,1)])
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
      <ScrollView style={{flex:1, marginBottom:0, width:'90%', padding:10, marginTop: 20}}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {isLoadingObjects && <Text>Loading Objects..</Text>}
          <Text style={styles.title}>Edit the objects drawn</Text>
          {/* { objects !== undefined && <Text>objects are not undefined</Text>} */}
          { typesArray && selectedTypes.length < 2 ? <View style={{marginTop:20}}>
            <SelectDropdown
              data={typesArray}
              onSelect={(selectedItem, index) => {
                setSelectedTypes([...selectedTypes, selectedItem])
                console.log(selectedItem, index)
              }}
              buttonTextAfterSelection={(selectedItem, index) => selectedItem }
              rowTextForSelection={(item, index) =>  item }
            /></View> : <Text style={{marginTop: 15}}>Maximum types per drawing is 2</Text>
          }
        </View>
        <View style={{flex:1,flexDirection: 'column', justifyContent: 'center', alignItems:'center', paddingTop: 5, paddingBottom: 5, marginTop: 20}}>
          {selectedTypes.length > 0 && <Text style={{fontSize:14, fontWeight:'bold'}}>
            Press on the type you wanna remove
          </Text>}
          {
            selectedTypes.length > 0 &&  
              <View style={{flex:1, flexDirection:'column'}}> 
                <View style={{flex:1}}>
                  {selectedTypes.map((type, i) => <View key={i} style={styles.chosenTypeContainer}>
                    <TouchableOpacity style={colorScheme == 'dark' ? customBtn.btnDark: customBtn.btnLight} onPress={() => { removeType(i) }}>
                      <Text style={colorScheme == 'dark' ? customBtn.btnTextDark: customBtn.btnTextLight}>{type}</Text>
                    </TouchableOpacity>
                  </View>)}
                </View>
              </View>
          }
        </View>
        <View>
          <TouchableOpacity style={colorScheme == 'dark' ? customBtn.btnDark: customBtn.btnLight} onPress={() => console.log('wanna submit')}>
            <Text style={colorScheme == 'dark' ? customBtn.btnTextDark: customBtn.btnTextLight}><Icon size={28} name='send' color='white'/></Text>
          </TouchableOpacity>
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
  chosenTypeContainer:{
    flex:1, 
    alignItems: 'center', 
    justifyContent: 'center',
    margin:10, 
  },
  chosenTypeText: {
    fontSize: 15, 
    alignSelf:'center', 
    padding:20
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
