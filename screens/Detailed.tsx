import { Text, View } from '../components/Themed';
import  React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Appearance, ScrollView, Image, FlatList } from 'react-native';
import customBtn from '../constants/CustomStyles';
import { useForm, useController } from 'react-hook-form';

export default function Detailed ({ navigation, route }) {
  console.log("params ==>",route.params)
  const { createdAt, title, shape, updatedAt, url, description } = route.params;

  return(
    <View style={styles.container}>
      <View>
        <Image
          style={shape === "h" ? styles.imageHorizontal : shape === "r" ? styles.imageRect : styles.imageVertical}
          source={{ uri: `${url}.jpg` }}
        />
      </View>
      <View>
        

        
      </View>
      <Text style={{fontSize: 20, fontWeight: 'bold', marginTop: 40}}>{title}</Text>
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
    width: 300,
    height: 300,
  },
  imageVertical:{
    width: 300,
    height:500
  },
  imageHorizontal:{
    width:300,
    height:200,
  }
});
