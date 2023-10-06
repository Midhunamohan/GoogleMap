import React,{useEffect , useState} from 'react';
import { PermissionsAndroid, StyleSheet,Text,View ,Dimensions,SafeAreaView} from 'react-native';
import MapView, { PROVIDER_GOOGLE,Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


const GOOGLE_PLACES_API_KEY ='AIzaSyBgU-X0R47BG8OqoHh49GBgJHf3hu9-f-Y';

const screenWidth = Dimensions.get('window').width;

const App =() => {

  const [location , setLocation] =useState({latitude: 0 , longitude: 0}); 

  async function getPermission(){
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
  }

  useEffect(()=>{
   getPermission().then(()=>{

    Geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        setLocation({latitude: position.coords.latitude , longitude: position.coords.longitude})
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );


   })
  },[]);

  return(

    <SafeAreaView style={styles.container}>
    
 <MapView
       provider={PROVIDER_GOOGLE} // remove if not using Google Maps
       style={styles.map}
       region={{
         latitude: location.latitude,
         longitude: location.longitude,
         latitudeDelta: 0.015,
         longitudeDelta: 0.0121,
       }}
     >
  
  <Marker
    coordinate={{ latitude: location.latitude, longitude: location.longitude}}
 />

    </MapView>

   <GooglePlacesAutocomplete
        
    style={styles.searchbar}
        placeholder="Type a place"
       styles={styles.searchbar}
       autoFocus={false}
       listViewDisplayed='auto' 
       minLength={2}
        onPress={(data, details = null) => {
          console.log(data);
          console.log(details);
          // console.log(details?.geometry?.location)
          setLocation({latitude:details?.geometry?.location.lat, longitude:details?.geometry?.location.lng})
        }}
        // getDefaultValue={() => {
        //   return ''; // text input default value
        // }}

        query={{key: GOOGLE_PLACES_API_KEY, language:'en', types: '(cities)',}}
        fetchDetails={true}
        
        onFail={error => console.log(error)}
        onNotFound={() => console.log('no results')}
        listEmptyComponent={() => (
          <View style={{flex: 1,position:'absolute',backgroundColor:'#FFFFFF'}}> 
            <Text style={{fontSize:15,color:'black',margin:45}}>No results were found</Text>
          </View>
        )}
        // currentLocation={true}
        nearbyPlacesAPI='GooglePlacesSearch'
        debounce={200}
       
      /> 


    </SafeAreaView>
 
  );


}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor:'#000'
  
  },
  map: {
    flex: 1,
    left:0,
    right:0,
    top:0,
    bottom:0,
    position:'absolute'
  },
  searchbar:{
    description:{
      fontweight:'bold',
    },
    predefinedPlacesDescriptions:{
      color:'#1faadb'
    },
    textInputContainer:{
      backgroundColor:'rgba(0,0,0)',
      top:50,
      width:screenWidth - 10,
      borderWidth:0,
    },
    textInput:{
      marginLeft:0,
      marginRight:0,
      height:38,
      color:'#5d5d5d',
      fontSize:16, 
   
    },
    listView:{
      backgroundColor:'rgba(192,192,192,0.9)',
      top:23

    }
  }
});
export default App;






