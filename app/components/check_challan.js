import React, { useState,useEffect } from 'react';
import { StatusBar } from "expo-status-bar";
import {DataTable} from 'react-native-paper'
import { View, Button, Image, Platform,Text,StyleSheet, TextInput,Alert } from 'react-native';
export default function Check_Challans({navigation}){
  const [lpnumber, setLpnumber] = useState("");
  const [dataList,setDatalis]=useState([])
  const onChangeLpNumber =(lpnumber)=>{
    setLpnumber(lpnumber);
  }
  const handleSubmit = async () => {
    const datalis={
        licenseno:lpnumber,
      };
    if(!lpnumber){
        Alert.alert("Please select image");
        return;
    }
    try{
        const response=await fetch("http://192.168.213.101:5000/checkchallans",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
              },
              body:JSON.stringify(datalis)
        });
        const data=await response.json()
        const status=data.status
        if(status===402){
            Alert.alert("No Challans on your vehicalno:"+lpnumber)
            // navigate('/check')
        }
        else{
        setDatalis(data)
        // console.log(dataList)
        }
    }
        catch(error){
            console.error("Error while uploading:",error);
            alert(error)
        }
      } 
    return(
        <View style={styles.container}>
          <Text style={styles.heading}> Check Challan</Text>
      
         <View style={styles.Container}>
         <TextInput
        style={styles.textInput}
        placeholderTextColor="black"
          placeholder="AB01CD2345"
          onChangeText={onChangeLpNumber}
        />
         </View>
         <View>
            <Text>
                
            </Text>
        <Button title="Submit" 
        onPress={handleSubmit} 
        />
      </View>
         <DataTable style={styles.container}>
      <DataTable.Header style={styles.tableHeader}>
        <DataTable.Title>Vehical No</DataTable.Title>
        <DataTable.Title>Owner Name</DataTable.Title>
        <DataTable.Title>Offence</DataTable.Title>
        <DataTable.Title>Date and time</DataTable.Title>
      </DataTable.Header>
      {dataList.map(item=>{
          return(<View key={item.id}><DataTable.Row>
            <DataTable.Cell>{item.lc_number}</DataTable.Cell>
            <DataTable.Cell>{item.ownername}</DataTable.Cell>
            <DataTable.Cell>{item.offence}</DataTable.Cell>
            <DataTable.Cell>{item.datetime_of_offence}</DataTable.Cell>
            </DataTable.Row></View>)
                            })}
    </DataTable>
      

      
      
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
    Container: {
      backgroundColor: "white",
     
    },
    button: {},
    title: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'white',
      marginTop: 50,
    },
    
    heading: {
      fontSize: 32,
      textAlign:'center',
      color:'black',
    },
    textInput: {
      borderWidth: 1,
      borderColor: "black",
      width: "90%",
      padding: 7,
      margin: 10,
      borderRadius: 20,
      borderColor: "black",
      alignSelf: "center",
      
    },
    container: {
        padding: 15,
      },
      tableHeader: {
        backgroundColor: '#DCDCDC',
      },
      button: {
        height:40,
        width:110,
    },
  });