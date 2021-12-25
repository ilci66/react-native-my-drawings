import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Gallery from 'react-native-image-gallery';
import { Drawings, DrawingUrls } from '../types';
// import { getDrawings } from '../utils';
// import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';

export default function Carousel() {
  const ip = "172.18.64.1" 

  // const [ loading, setLoading ] = useState<boolean | null>(true)

  const [ index, setIndex ] = useState<number>(0)
  const [ drawingData, setDrawingData ] = useState<Drawings>(undefined)
  const [ drawingUrls, setDrawingUrls ] = useState<DrawingUrls>(undefined)
  
  // const onChangeImage = (i:number) => setIndex(i)

  const caption = () => {
    return (
      <View style={{ bottom: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 15, fontStyle: 'italic' }}>
          { (drawingUrls![index] && drawingUrls![index].caption) || '' } 
        </Text>
      </View>
    )
  }

  const galleryCount = () => {
    return (
      <View style={{ top: 0, height: 65, backgroundColor: 'rgba(0, 0, 0, 0.7)', width: '100%', position: 'absolute', justifyContent: 'center' }}>
        <Text style={{ textAlign: 'right', color: 'white', fontSize: 15, fontStyle: 'italic', paddingRight: '10%' }}>{ index + 1 } / { drawingUrls!.length }</Text>
      </View>
  );
  }

  const getDrawingUrls = () => {
    // setLoading(true)
    fetch(`http://${ip}:3002/drawings`)
      .then(res => res.json())
      .then(data => {
        // console.log(data)
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
          console.log("title ==>",drawing.title)
          return { caption: `${drawing.title}`, source: {uri: `${drawing.url}.jpg`} }
        }))
        console.log(drawingUrls)
      })
  }

  useEffect(() => {
    getDrawingUrls();
    console.log("get the drawings")
  }, [])

  return (
    <View style={{flex:1}}>
      {drawingUrls && 
      <>
        <Gallery 
          style={{ flex: 1, backgroundColor: '#999999' }}
          images={drawingUrls}
          onPageSelected={(i) => setIndex(i)}
          initialPage={0}
        />
        {caption()}
        {galleryCount()}
      </>}
      {!drawingUrls && <Text>Loading...</Text>}
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
