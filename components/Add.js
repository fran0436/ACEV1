import React, { Component } from 'react';
import { Container, Content, Form, Item, Input, Picker, Icon, Textarea, Button, ListItem, Label } from 'native-base';
import { View, ScrollView, Image, StyleSheet, Text, TouchableOpacity, Animated, Keyboard, KeyboardAvoidingView  } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';
import { ImagePicker, Permissions, Camera } from 'expo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
var s = require('./styles');

//import Camera from 'react-native-camera';

const ref = React.createRef();
const front = React.createRef();
const http = "http://10.70.152.198:3000/"    
const options = {
    title: 'Choose Image',
    takePhotoButtonTitle: 'Take Photo',
    chooseFromLibraryButtonTitle: 'Choose From Gallery'
  };

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
          carArea: "front",
          imageSource: null,
          location: null,
          long: null,
          lat: null,
          images: [],
        };
      }

      componentWillMount(){
        
      }
      pass = (position) => {
        this.setState({
          lat: position.coords.latitude,
          long: position.coords.longitude
        });
        console.log(this.state.lat);
        console.log(this.state.long);
        console.log(Date.now())

        fetch('https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyD-NU9g6gKIAc2cZu1xQ6LwiKISOs0Ia58&address=' + `${this.state.lat}` + ',' + `${this.state.long}`  )
        .then((response) => response.json())
        .then((responseJson) => {
         console.log(responseJson.results[0])
         this.setState({
           location:`${responseJson.results[0].address_components[2].long_name},${responseJson.results[0].address_components[4].long_name}`
         })

          });
      }
      fail = (err) => {
        console.log('ERROR', err);
      }
      getLocation = () => {
        console.log("load");
        let opts = { enableHighAccuracy: false, maximumAge: 120000, timeOut: 20000 };
    
        navigator.geolocation.getCurrentPosition(this.pass, this.fail, opts);
       
    
      }


componentDidMount(){

  this.getLocation()
  const { navigation } = this.props
  const data = navigation.getParam('data', 'NO DATA')
  this.setState({
    vehicleData:data
  })
  console.log("YOOOO",data,"end here")
 

  }
  postConcealment(){
    console.log("reference", this.state.reference, "title", this.state.title, "description", this.state.description, "userID", this.state.userId, "area", this.state.carArea)
    const { navigate } = this.props.navigation
    let id = this.state.vehicleData[0]._id
    let vehicleDataKeys = Object.keys(this.state.vehicleData[0])
    let checkForArea = vehicleDataKeys.filter(vechicleArea => vechicleArea === this.state.carArea)
    let checkForAreaIndex = checkForArea[0]
    let countFound ;
    if(this.state.vehicleData[0][checkForAreaIndex].concealment[0].discovered.length){
    if(this.state.vehicleData[0][checkForAreaIndex].concealment[0].discovered.length !=0){
      countFound = this.state.vehicleData[0][checkForAreaIndex].concealment[0].discovered.length
  }else{
    countFound=1;
  }
}
    console.log("YOOO id", id)
    let countofdiscoveredFound = countFound + 1

}
postConcealment=() => {
  console.log("reference",this.state.reference,"title",this.state.title,"description",this.state.description,"userID",this.state.userId,"area",this.state.carArea)
  const {navigate} = this.props.navigation
  let id=this.state.vehicleData[0]._id
  let vehicleDataKeys=Object.keys(this.state.vehicleData[0])
  let checkForArea=vehicleDataKeys.filter(vechicleArea=>vechicleArea===this.state.carArea)
  let checkForAreaIndex=checkForArea[0]
  let countFound=this.state.vehicleData[0][checkForAreaIndex].concealment[0].discovered.length
  console.log("YOOO id",id)
  let countofdiscoveredFound=countFound + 1

  


  // let bodytype=this.state.vehicleData[0].bodytype
  // let make=this.state.vehicleData[0].make
  // let model=this.state.vehicleData[0].model
  // // let year=this.state.vehicleData[0].year
  // let data=
  //   `title=${this.state.title}&description=${this.state.description}&location=Ottawa%2C%20ON&date=2017&referenceNo=${this.state.reference}&countFound=1&discovered=%7B%22location%22%3A%22ottawa%22%2C%22userId%22%3A%22234231rwds4%22%2C%22referenceNo%22%3A%224421321%22%7D&discovered=%7B%22location%22%3A%22ottawa%22%2C%22userId%22%3A%22234231rwds4%22%2C%22referenceNo%22%3A%224421321%22%7D`

    console.log(this.state.location)

    let data = {
      title: this.state.title,
      description: this.state.description,
      location: this.state.location,
      date: 2019,
      referenceNo: this.state.reference,
     countFound:1,
      discovered: `{"location":"${this.state.location}","userId":${this.state.userId},"referenceNo":${this.state.reference}}`
    }



    var XHR = new XMLHttpRequest();
    var urlEncodedData = "";
    var urlEncodedDataPairs = [];
    var name;
  
    // Turn the data object into an array of URL-encoded key/value pairs.
    for(name in data) {
        console.log(name);
      urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
    }
  
    // Combine the pairs into a single string and replace all %-encoded spaces to 
    // the '+' character; matches the behaviour of browser form submissions.
    urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');
  
  

  



console.log("posthittttt badllllyyy")

    // Set up our request
    XHR.open('POST', `${http}concealments/${this.state.carArea}/${id}`);
  
    // Add the required HTTP header for form data POST requests
    XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    XHR.setRequestHeader('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTkwNGQ2NzE5MTE0MTIxYTAzMzBhZSIsImlhdCI6MTU1NDg0ODAzNSwiZXhwIjoxNTU0OTM0NDM1fQ.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTkwNGQ2NzE5MTE0MTIxYTAzMzBhZSIsImlhdCI6MTU1NDg0ODAzNSwiZXhwIjoxNTU0OTM0NDM1fQ.X4az6qapnIGTlzag_6heV61t4WFGGAiwtTf_TkuWCl4');
  
  
    // Finally, send our data.
    XHR.send(urlEncodedData)
    // this.postImages(this.state.carArea, id)
  }

  postImages=(carArea, id)=>{

    let dataForm = new FormData();
        // // data.append('name', 'testName'); // you can append anyone.
        // data.append('file', {
        //   uri:uri,
        //   type: 'image/jpg', // or photo.type
        //   name: uri
        // });
            
        this.state.images.forEach((photo) => {
          dataForm.append('photo', {
          uri: photo.uri,
          type: 'image/jpeg', // or photo.type
          name: photo.uri
        });  
      });

        fetch(`${http}concealments/upload/${carArea}/${id}`, {
          method: 'post',
          headers: {
            "Content-Type": "application/json",
            'x-access-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTkwNGQ2NzE5MTE0MTIxYTAzMzBhZSIsImlhdCI6MTU1NDc1OTUwNiwiZXhwIjoxNTU0ODQ1OTA2fQ.eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTkwNGQ2NzE5MTE0MTIxYTAzMzBhZSIsImlhdCI6MTU1NDg0NzAwMSwiZXhwIjoxNTU0OTMzNDAxfQ.TFV9qEZ2uzGK2HF5kw_JqG_2RJUSYf9i_SnbPqSenbA",
            "Content-Type": "multipart/form-data",
        },
          body: dataForm
        }).then(res => {
          // console.log(res)
        });

    // navigate('Result')
  }
  static navigationOptions = {
    headerStyle: {
      backgroundColor: "#fff"
    },
    headerTintColor: "#000",
    headerTitleStyle: {
      color: "#000",
    },
    headerTitle: "Add a concealment method",
  }

  onValueChange2 = (value) => {
    console.log("value", value)
    this.setState({
      carArea: value
    });
  }

  cameraPressed = async (ev) => {
    console.log('camera')
    // permissions returns only for location permissions on iOS and under certain conditions, see Permissions.LOCATION
    const { status: st, permissions } = await Permissions.askAsync(Permissions.CAMERA);
    const { status: stR } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    let id = this.state.vehicleData[0]._id
    console.log(st, stR);
    console.log(permissions);
    if (st === 'granted' && stR === 'granted') {
      console.log("granted");
      const { cancelled, uri, base64 } = await ImagePicker.launchCameraAsync({ allowsEditing: true, mediaTypes: "Images", aspect: [1,1], quality: 0.3 });
      console.log("uri", uri);

      if (!cancelled) {

        //var imageList = this.state.images === null ? [] : this.state.images;

        var imageList = this.state.images
        imageList.push(uri)
        console.log("imagesList", imageList)
        this.setState({ images: imageList })
        console.log("yo", this.state.images);
        // const data = new FormData();
        // data.append('name', 'testName'); // you can append anyone.
        // data.append('file', {
        //   uri: uri,
        //   type: 'image/jpeg', // or photo.type
        //   name: 'testPhotoName'
        // });// number 123456 is immediately converted to a string "123456"

        // var request = new XMLHttpRequest();
        // request.open('POST', `${http}concealments/upload/${this.state.carArea}/${id}`);
        // request.setRequestHeader('Content-Type', 'multipart/form-data');

        // // Add the required HTTP header for form data POST requests
        // request.setRequestHeader('x-access-token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTkwNGQ2NzE5MTE0MTIxYTAzMzBhZSIsImlhdCI6MTU1NDc1OTUwNiwiZXhwIjoxNTU0ODQ1OTA2fQ.jMcy7ARN999OFfoEHflrzxaOPLY59LGd8r15Lvj_eM4');

        // request.send(data);
        // console.log("uriiiiiiiiiii",uri);
        // const data = new FormData();
        // // data.append('name', 'testName'); // you can append anyone.
        // data.append('file', {
        //   uri:uri,
        //   type: 'image/jpg', // or photo.type
        //   name: uri
        // });
        // fetch(`${http}concealments/upload/${this.state.carArea}/${id}`, {
        //   method: 'post',
        //   headers: {
        //     "Content-Type": "application/json",
        //     'x-access-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVjYTkwNGQ2NzE5MTE0MTIxYTAzMzBhZSIsImlhdCI6MTU1NDc1OTUwNiwiZXhwIjoxNTU0ODQ1OTA2fQ.jMcy7ARN999OFfoEHflrzxaOPLY59LGd8r15Lvj_eM4",
        //     "Content-Type": "multipart/form-data",
        // },
        //   body: data
        // }).then(res => {
        //   // console.log(res)
        // });

        // c
        // fetch(`${http}concealments/upload/${this.state.carArea}/${id}`, {
        //   method: 'post',
        //   body: data
        // }).then(res => {
        //   console.log(res)
        // });

      }


    } else {
      throw new Error('Camera permission not granted');
    }
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <KeyboardAwareScrollView
        style={{ backgroundColor: '#4c69a5' }}
        resetScrollToCoords={{ x: 0, y: 100 }}
        contentContainerStyle={styles.container}
        scrollEnabled={true}
        extraScrollHeight={1000}
      >
        <Container style={styles.container}>
          <Content>
            <Form>
              <View style={{flexDirection:"row", alignItems:"center"}}>
                <Text>Car Area</Text>
                <Item>
                  <Picker
                    mode="dropdown"
                    //iosIcon={<Icon name="arrow-down" style={{ color: "#FFF" }} />}
                    placeholderStyle={{ color: "#FFF" }}
                    placeholderIconColor="#FFF"
                    selectedValue={this.state.carArea}
                    onValueChange={this.onValueChange2}>

                    <Picker.Item label="Front/Engine" value="front" />
                    <Picker.Item label="Center/Cabin" value="center" />
                    <Picker.Item label="Wheels/Undercarriage" value="undercarriage" />
                    <Picker.Item label="Rear/Trunk" value="rear" />
                  </Picker>
                </Item>
              </View>
              
              <Item floatingLabel>
                <Label style={styles.listLabelText}>Title</Label>
                <Input style={styles.inputFields} onChange={(ev) => { this.setState({ title: ev.nativeEvent.text }) }} />
              </Item>
              <Item floatingLabel>
                <Label style={styles.listLabelText}>Description</Label>
                <Input style={styles.inputFields} onChange={(ev) => { this.setState({ description: ev.nativeEvent.text }) }} />
              </Item>
              <Item floatingLabel>
                <Label style={styles.listLabelText}>Employee Number</Label>
                <Input style={styles.inputFields} onChange={(ev) => { this.setState({ userId: ev.nativeEvent.text }) }} />
              </Item>
              <Item floatingLabel last>
                <Label style={styles.listLabelText}>Reference Number (optional)</Label>
                <Input style={styles.inputFields} onChange={(ev) => { this.setState({ reference: ev.nativeEvent.text }) }} />
              </Item>

            </Form>
            <Button iconLeft large block style={{ backgroundColor: "grey", marginTop: 10 }} onPress={this.cameraPressed.bind(this)} >
              <Ionicons name='md-camera' size={24} color="white" />
            </Button>

            <View style={styles.imageContainer}>
              {this.state.images &&

                this.state.images.map((image, i) => (

                  <Image key={i} source={{ uri: image }} style={{ height: 80, width: 80, marginTop: 10, marginLeft: 10 }} />

                ))}
            </View>

            <TouchableOpacity onPress={() => { navigate("Result"), this.postConcealment() }} style={s.largeButton}>
              <Text style={s.largeButtonText}>SUBMIT</Text>
            </TouchableOpacity>
            <Container style={{ display: "none" }}>
              <Button onPress={() => { navigate('Result') }} ref={ref} title="Press Me" >

              </Button>
            </Container>
          </Content>
        </Container>
      </KeyboardAwareScrollView>
    );
  }


}

const styles = StyleSheet.create({
    container: {
      backgroundColor: "#fff",
    },

    view: {
        flex: 1
    },

    buttonSavedStyle:{
        marginTop: 20,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: "auto",
        marginRight: "auto",
        backgroundColor: "#4AA7D1",
        height: 60,
        width: 300 
    
      },
      formItem:
      {
          borderColor: '#375B79',
          borderBottomColor: '#0D2847',
          marginTop: 5
      },

      listLabel: {
        marginTop: 1,
        backgroundColor: 'transparent',
        textAlign: 'center',
        justifyContent: "center",
        alignItems: "center",
        
        },
        
        listLabelText:{

        },

        inputFields:{

        },
        
        imageContainer:{
          flex:1,
          flexDirection:'row',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
        },
  })

  