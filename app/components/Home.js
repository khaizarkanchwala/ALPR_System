import { StatusBar } from "expo-status-bar";
import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Home({navigation}) {
  const[user,setUser]=useState(null);
  const getToken=async()=>{
    try{
      const token=await AsyncStorage.getItem('access_token');
      return token
    }catch(error){
      console.log('error')
      return null;
    }
  }
  useEffect(()=>{
    const fetchToken=async ()=>{
      const token=await getToken();
    if(token!=null){
      fetch('http://192.168.213.101:5000/protected',{
        method:"GET",
        headers:{
          Authorization:`Bearer ${token}`,
        }
      })
      .then(response => response.json())
      .then((data)=>{
        setUser(data.name)
        if(data.status===200){
          // alert('welocome '+user)
        }
        else{
          navigation.navigate("LoginScreen")
        }
      })
      .catch((error)=>{
        console.error(error)
      })
    }else{
      navigation.navigate("LoginScreen")
    }
  }
  fetchToken();
  })
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {user}</Text>
      <Image source={require("../assets/policelogo.png")} style={{ width: 400, height: 400 }}/>
      <Button  
      onPress={()=> navigation.navigate("Register")}
      color="" title="Register" />
      <Text></Text>
      <Button 
      onPress={()=> navigation.navigate("BookChallan")}
      color="" title="Book Challan" />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#282c34",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {},
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#282c95',
    marginTop: 50,
  },
});