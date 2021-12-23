import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Gallery from 'react-native-image-gallery';
import { Drawings, DrawingUrls } from '../types';
// import { getDrawings } from '../utils';
import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { isLoading } from 'expo-font';

export default function Carousel() {

  // const [ loading, setLoading ] = useState<boolean | null>(true)
  
  const [ drawingData, setDrawingData ] = useState<Drawings>(undefined)

  const [ drawingUrls, setDrawingUrls ] = useState<DrawingUrls>(undefined)
  
  const getDrawingUrls = () => {
    // setLoading(true)
    fetch('http://192.168.1.4:3002/drawings')
      .then(res => res.json())
      .then(async data => {
        // await setDrawingData(data)
        // await setLoading(false)
        // console.log("just to make sure it's getting data ==>",data[0].title)
        // console.log('got all the drawings')
        // let urls = await data.map((drawing: { url: string; }) => { 
        //   // console.log({ source: {uri: `${drawing.url}.jpg`} })
        //   return { source: {uri: `${drawing.url}.jpg`} }
        // })
        // console.log("urls ==>", urls)
        // await setDrawingUrls(urls)
        setDrawingUrls(data.map((drawing: { title:string, url: string; }) => { 
          // console.log({ source: {uri: `${drawing.url}.jpg`} })
          console.log(drawing.title)
          return { caption: `${drawing.title}`, source: {uri: `${drawing.url}.jpg`} }
        }))
        console.log(drawingUrls)
      })
  }

  useEffect(() => {
    getDrawingUrls();
  }, [])

  return (
    <View style={styles.container}>
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      {/* {loading && <Text>loading...</Text>} */}
      {/* <Gallery
        style={{ flex: 1, backgroundColor: 'black' }}
        images={[
          { source: { uri: 'http://i.imgur.com/XP2BE7q.jpg' } },
          { source: { uri: 'http://i.imgur.com/5nltiUd.jpg' } },
          { source: { uri: 'http://i.imgur.com/6vOahbP.jpg' } },
          { source: { uri: 'http://i.imgur.com/kj5VXtG.jpg' } }
        ]}
      /> */}
      {drawingUrls ? <Gallery 
        style={{ flex: 1, backgroundColor: 'gray' }}
        images={drawingUrls}
      />: <Text>isLoading...</Text>}
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
