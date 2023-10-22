import { StyleSheet, Text, View, Image, Button, TextInput,Alert } from "react-native";
import { useState,useEffect } from "react";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
export default function Register({navigation}) {
  const [name, setName] = useState("");
  const [VechicleNumber, setVechicleNumber] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const[user,setUser]=useState(null)
  const onChangeNameHandler = (name) => {
    setName(name);
  };
  const onChangeVechiclenumberHandler = (VechicleNumber) => {
    setVechicleNumber(VechicleNumber);
  };
  const onChangePhonenumberHandler = (phoneNumber) => {
    setphoneNumber(phoneNumber);
  };
  const onChangeAddressHandler = (address) => {
    setAddress(address);
  };
  const onChangeEmailHandler = (email) => {
    setEmail(email);
  };

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

  const handleSubmit = async () => {
    const data={
      ownername:name,
      vehicalno:VechicleNumber,
      phoneno:phoneNumber,
      address:address,
      email:email,
      registedred_by:user
    };
    if (!name.trim() || !VechicleNumber.trim() || !phoneNumber.trim() || !address.trim() || !email.trim()) {
      Alert.alert('Invalid Registration', 'No fields can be empty');
      return;
    }

    try {

      axios.post("http://192.168.213.101:5000/register",data)
      .then(response=>{
        if (response.status === 422) {
          Alert.alert('Invalid Registration', 'Please check your input');
        } else {
          Alert.alert('Success', 'data saved');
          navigation.navigate("Home")
          // Perform navigation logic here
        }
      })
      .catch(error=>{
        console.error(error)
      })
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred');
    }
  };

  return (
    <View style={StyleSheet.container}>
      <Text style={styles.heading}> Vechicle Registration</Text>
      <View style={styles.Container}>
        <Text>Enter your name</Text>
        <TextInput
        style={styles.textInput}
          placeholder="abcd"
          value={name}
          onChangeText={onChangeNameHandler}
        />
      </View>
      <View style={styles.Container}>
        <Text>Enter your VechicleNumber</Text>
        <TextInput
        style={styles.textInput}
          placeholder="AB01CD2345"
          value={VechicleNumber}
          onChangeText={onChangeVechiclenumberHandler}
        />
      </View>
      <View style={styles.Container}>
        <Text>Enter your phoneNumber</Text>
        <TextInput
        style={styles.textInput}
          placeholder="xxxxxxxxxx"
          value={phoneNumber}
          onChangeText={onChangePhonenumberHandler}
        />
      </View>
      <View style={styles.Container}>
        <Text>Enter your Address</Text>
        <TextInput
        style={styles.textInput}
          placeholder="abcd"
          value={address}
          onChangeText={onChangeAddressHandler}
        />
      </View >
      <View style={styles.Container}>
        <Text>Enter your email</Text>
        <TextInput
        style={styles.textInput}
          placeholder="abcd@gmail.com"
          value={email}
          onChangeText={onChangeEmailHandler}
        />
      </View>
      <View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cotainer: {
    backgroundColor: "#282c34",
  },
  Container: {
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    textAlign:'center'
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "80%",
    padding: 7,
    margin: 10,
    borderRadius: 20,
    borderColor: "black",
    alignSelf: "center",
  },
  
});
