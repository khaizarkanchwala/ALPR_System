import React, { useState } from 'react';
import { View, TextInput, Button,StyleSheet,Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
const LoginScreen = ({navigation}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const route = useRoute();
    const storegeToken=async(token)=>{
        try{
            await AsyncStorage.setItem('access_token',token);
            return token
        }catch(error){
            console.log(error)
            return null
        }
    }
    const handleLogin =async () => {
        // Send login request to the Flask backend
        // You can use libraries like axios or fetch for making API requests

        // Example using fetch:
        fetch('http://192.168.213.101:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username,
                password,
            }),
        })
            .then(response => response.json())
            .then(data => {
                // Handle the login response from the backend
                if(data.status===200){
                    const saveToken=async()=>{
                        const token=data.access_token
                        await storegeToken(token);
                        console.log('Token stored successfully')
                    }
                    saveToken();
                    Alert.alert('LOGIN SUCESSFUL','Welcome')
                    navigation.navigate("Home")
                }
                else if(data.status===401 || data.status===402){
                    Alert.alert("INVALID CREDENTIALS",'username or password is wrong')
                }
            })
            .catch(error => {
                console.error('Error:', error);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
            style={styles.input}
                placeholder="Username"
                placeholderTextColor="#888"
                value={username}
                onChangeText={setUsername}
            />
            <TextInput
            style={styles.input}
                placeholder="Password"
                placeholderTextColor="#888"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <Button title="Login" onPress={handleLogin} />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
      backgroundColor: '#282c34',
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 4,
      marginBottom: 16,
      paddingHorizontal: 10,
      color:'#ddd'
    },
  });
  
export default LoginScreen;