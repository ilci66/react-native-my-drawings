import { Text, View } from '../components/Themed';
import  React, { useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity, Appearance, ScrollView, Image, FlatList } from 'react-native';
import customBtn from '../constants/CustomStyles';

export default function Detailed ({ navigation, route }) {
  console.log("params ==>",route.params)
  const { createdAt, title, shape, updatedAt, url, description } = route.params;

  return(
    <View style={styles.container}>
      <Text>wassap</Text>
    </View>
  )

};


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
