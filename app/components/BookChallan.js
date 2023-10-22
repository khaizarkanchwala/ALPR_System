import React, { useState,useEffect } from 'react';
import { View, Button, Image, Platform,Text,StyleSheet } from 'react-native';
import {DataTable} from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
const UploadImage=({navigation})=>{
  const [vehicalno,setVehicalno]=useState("")
  const [image,setImage]=useState("")
  const [path,setImagepath]=useState("")
  const [total,setTotal]=useState(0)
  const [loading,setLoading]=useState(0);
  const[user,setUser]=useState(null);
  let arr=Array.apply(null,{length:total}).map(Number.call,Number)
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
  const handleImageUpload=async()=>{
    const permissionResult=await ImagePicker.requestMediaLibraryPermissionsAsync();
    if(permissionResult.granted===false){
      alert('Permission is required to move forward!!');
      return;
    }
    const ImagePickerResult=await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if(!ImagePickerResult.canceled){
      const formData=new FormData();
      formData.append('image',{
        uri:ImagePickerResult.assets[0].uri,
        type:'image/jpeg',
        name:'image.jpg',
      });
      setLoading(1)
      fetch('http://192.168.213.101:5000/upload',{
        method:'POST',
        headers:{
          'Content-Type':'multipart/form-data',
        },
        body: formData,
      })
      .then(response=> response.json())
      .then(data=>{
        setLoading(0)
        setVehicalno(data.output);
        setImagepath(data.upload_image);
        setTotal(data.detectno);
        setImage(ImagePickerResult.assets[0].uri)
        console.log(data.upload_image)
        console.log(data.output);
      })
      .catch(error=>{
        console.log(error);
      })
    }
  }

  const handleImageCapture=async()=>{
    const permissionResult=await ImagePicker.requestCameraPermissionsAsync();
    if(permissionResult.granted===false){
      alert('Permission is required to move forward!!');
      return;
    }
    const ImagePickerResult=await ImagePicker.launchCameraAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if(!ImagePickerResult.canceled){
      const formData=new FormData();
      formData.append('image',{
        uri:ImagePickerResult.assets[0].uri,
        type:'image/jpeg',
        name:'image.jpg',
      });
      setLoading(1)
      fetch('http://192.168.213.101:5000/upload',{
        method:'POST',
        headers:{
          'Content-Type':'multipart/form-data',
        },
        body: formData,
      })
      .then(response=> response.json())
      .then(data=>{
        setLoading(0)
        setVehicalno(data.output);
        setImagepath(data.upload_image);
        setTotal(data.detectno);
        setImage(ImagePickerResult.assets[0].uri)
        console.log(data.upload_image)
        console.log(data.output);
      })
      .catch(error=>{
        console.log(error);
      })
    }
  }
  if(!loading){
  return(
    <View style={styles.container1}>
    <View style={{marginVertical:10}}>
    <Button style={styles.button} title='Select Image' onPress={handleImageUpload}/>
    </View>
    <View style={{marginVertical:10}}>
    <Button style={styles.button} title='Capture Image' onPress={handleImageCapture}/>
    </View>
    {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      )}
      <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>vehicalno</DataTable.Title>
        <DataTable.Title>select</DataTable.Title>
      </DataTable.Header>
      {arr.map(item=>{
          return(<View key={vehicalno[item]}><DataTable.Row>
            <DataTable.Cell>{vehicalno[item]}</DataTable.Cell>
            <DataTable.Cell><Button  
      onPress={()=> navigation.navigate("SendChallan",{no:vehicalno[item],url:path,image:image})}
      color="" title="select" /></DataTable.Cell>
            </DataTable.Row></View>)
                            })}
    </DataTable>
    </View>
  )
  }
  else{
    return (
      <View style={styles.container1}>
        <Text>Detecting...</Text>
        <Text>This may take a few seconds</Text>
      </View>
    )
  }
}
export default UploadImage

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  container1: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
  button: {
    height:40,
    width:110,
},
});