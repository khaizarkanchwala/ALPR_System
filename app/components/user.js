import React, { useState,useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import { View, Button, Image, Platform,Text,StyleSheet } from 'react-native';
export default function User({navigation}){
    return(
        <View style={styles.container}>
      <Text style={styles.title}></Text>
      <Image source={require("../assets/policelogo.png")} style={{ width: 400, height: 400 }}/>
      <Button  
      onPress={()=> navigation.navigate("LoginScreen")}
      color="" title="login" />
      <Text></Text>
      <Button 
      onPress={()=> navigation.navigate("Check_Challans")}
      color="" title="Check challan" />
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
      color: 'white',
      marginTop: 50,
    },
  });