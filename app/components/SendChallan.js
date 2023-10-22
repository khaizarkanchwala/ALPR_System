import { StyleSheet, Text, View , Image,Button,Alert} from 'react-native';
import React,{ useState,useEffect } from 'react';
import axios from 'axios';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
// import AnimatedLoader from 'react-native-animated-loader'
const options=["RedLightJump","Withouthelmet","Wrongside","OverSpeeding","RashDriving"]
const SendChallan = ({navigation}) => {
  const route = useRoute();
  const [selectedOption, setSelectedOption] = useState("");
  const [loading,setLoading]=useState(0);
  const {no}=route.params
  const {url}=route.params
  const {image}=route.params
  const[user,setUser]=useState(null);
  const onChangeNameHandler = (offence) => {
    setSelectedOption(offence);
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
  const handleSubmit= async()=>{
    // setLoading(1)
    const data={
        vehicalno:no,
        offence:selectedOption,
        offence_proof:url,
        challan_booked_by:user,
      };
    if(selectedOption===""){
        Alert.alert('Invalid Submit', 'Please select offence');
        return;
    }
    try {
      setLoading(1)
        const res=await axios.post("http://192.168.213.101:5000/raisechallan",data)
        console.log(res.status)
          if (res.status===200) {
            setLoading(0)
            Alert.alert('Success', 'Challan sent');
            navigation.navigate("Home")
          } else {
            Alert.alert('Invalid ', 'Vehical Info Not Found');
            navigation.navigate("Register")
            // Perform navigation logic here
          }
      } catch (error) {
        setLoading(0)
        console.log(error.response.status)
        // console.error('Error:', error);
        Alert.alert('Error', 'Vehical Info Not Found');
        navigation.navigate("Register")
      }
  }
  if(!loading){
  return (
    <View style={styles.container}>
        
        {image && (
        <Image source={{ uri: image }} style={{ width: 300, height: 300 }} />
      )}
      <SelectDropdown
      data={options}
      onSelect={onChangeNameHandler}
      />
      <Text style={styles.title}>{no}</Text>
      <View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </View>
  );
    }
    else{
      return (
        <View style={styles.container}>
          <Text>Loading...</Text>
        </View>
      )
    }
};
  
export default SendChallan;
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 50,
  },
});