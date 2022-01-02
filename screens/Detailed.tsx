import { Text, View } from '../components/Themed';
import  React, { useEffect, useState } from 'react';  
import { StyleSheet, TouchableOpacity, Appearance, ScrollView, Image, FlatList, Alert, BackHandler } from 'react-native';
import { Icon } from 'react-native-elements';
import customBtn from '../constants/CustomStyles';
import SelectDropdown from 'react-native-select-dropdown'
import { FontAwesome } from '@expo/vector-icons';
import { RootStackScreenProps } from '../types';



export default function Detailed ({ navigation, route }) {
  console.log("params ==>",route.params)

  const ip = "192.168.1.151" 

  const { createdAt, title, shape, updatedAt, url, description, id } = route.params;
  let type1:string;
  let type2:string;
  if(route.params.objects.length === 2) [type1,type2] = [route.params.objects[0].type, route.params.objects[1].type]
  if(route.params.objects.length === 1) type1 = route.params.objects[0].type
  
  const [ isLoadingObjects, setIsLoadingObjects ] = useState<boolean>(true)
  const [ objects, setObjects ] = useState<{type:string,id:number|string}[] | undefined>(undefined)
  const [ typesArray, setTypesArray ] = useState<[] | string[]>([]);
  const [ selectedTypes, setSelectedTypes ] = useState<[] | {type:string, id:string|number}[]>([]);
  const [ errorMessage, setErrorMessage ] = useState<undefined | string>(undefined)
  const colorScheme = Appearance.getColorScheme();

  const handleBack = () => {
    navigation.goBack();
    return true;
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, []);

  const sendTypes = async (id:number, types:string[]) => {
    console.log("id ==>",id, types)
    if(types.length === 0) return console.log("no types chosen")
    else if(types[0] === types[1]) return console.log("types are identical")
    await fetch(`http://${ip}:3002/drawing/${id}`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(types)
      } 
    )
    .then(res => res.json())
    .then(data => {
      
      Alert.alert(
        "Good Job!", 
        "Types are successfuly edited",
        [
          {
            text: "Stay Here",
            onPress: () => {console.log("Cancel Pressed",)},
            style: "cancel"
          },
          { 
            text: "I Wanna Edit More Drawings", 
            onPress: () => {console.log("OK Pressed"); handleBack()}, 
            style: "destructive"
          }
        ]
      );
      // console.log("no errors")
      // Alert.alert()
      // console.log(data)
    })
    .catch(e => console.log("error when updating types ==>", e))
  }

  const removeType = (index:number) => {
    // console.log("selected ==>",selectedTypes, selectedTypes.length, "index ==>",index)
    if(selectedTypes.length === 2){
      // console.log("length is 2")
      if(index === 0) {
        // console.log("index is 0"); 
        return setSelectedTypes([...selectedTypes.slice(1,2)])
      }
      else if(index === 1) {
        // console.log("index is 1"); 
        return setSelectedTypes([...selectedTypes.slice(0,1)])
      }
    }else if(selectedTypes.length === 1){
      setSelectedTypes([])
    }
  }

  useEffect(() => {
    fetch(`http://${ip}:3002/objects`)
      .then(res => res.json())
      .then(async data => {
        await setObjects(data)
        await setIsLoadingObjects(false)
        // if(typeOptions) await selectComponent(typeOptions);
        // console.log("data ===>", data)
        await setTypesArray(data.map((ele:{type:string}) => {
          return ele.type[0].toLocaleUpperCase().concat(ele.type.slice(1).toLocaleLowerCase());
        }));
        // console.log("just to make sure it's getting data ==>", setObjects)
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
          <Text style={{marginTop:10, fontWeight:'bold'}} >Type: {!type1 ? "No types given yet": type1.toUpperCase()}{type2 && `, ${type2.toUpperCase()}`}</Text>
        </View>
      </View>
      <ScrollView style={{flex:1, marginBottom:0, width:'90%', padding:10, marginTop: 20}}>
        <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}>
          {isLoadingObjects && <Text>Loading Objects..</Text>}
          <Text style={styles.title}>Edit the objects drawn</Text>
          {/* { objects !== undefined && <Text>objects are not undefined</Text>} */}
          { !isLoadingObjects && selectedTypes.length < 2? <View style={{marginTop:20}}>
            <SelectDropdown
              // data={typesArray}
              data={objects!.map(obj => obj.type)}
              onSelect={(selectedItem, index) => {
                // console.log("FILTERED ID ==>",objects?.filter(obj => obj.type == selectedItem)[0].id)
                let si = objects?.filter(obj => obj.type == selectedItem)[0].id
                let st = {type: selectedItem, id: si}
                setSelectedTypes([...selectedTypes, st])
                // console.log("st ==>", st, "selected types ===>",selectedTypes.length)

                // console.log(selectedItem, index)
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
                  {selectedTypes.map((obj, i) => <View key={i} style={styles.chosenTypeContainer}>
                    <TouchableOpacity style={colorScheme == 'dark' ? customBtn.btnDark: customBtn.btnLight} onPress={() => { removeType(i) }}>
                      <Text style={colorScheme == 'dark' ? customBtn.btnTextDark: customBtn.btnTextLight}>{obj.type}</Text>
                    </TouchableOpacity>
                  </View>)}
                </View>
              </View>
          }
        </View>
        <View>
          <TouchableOpacity style={colorScheme == 'dark' ? customBtn.btnDark: customBtn.btnLight} onPress={() => sendTypes(id,selectedTypes )}>
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
