import React,{Component} from 'react';
import ParticlesBg from 'particles-bg'; 
// import Clarifai from 'clarifai';     { not required when using fetch() method }
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import './App.css';

  // const app = new Clarifai.App({
  //  apiKey: '494fee376124444d946897b232f03025'  { not required when using fetch() method }
  // });
// const ApiFunction = (imageURL)=> {
//   const PAT = '25d5385e3b4940948d48dc7b448ecbbd';
//   const USER_ID = 'rahul01';       
//   const APP_ID = 'facerecognitionbrain01';
//   // const MODEL_ID = 'face-detection';  
//   const IMAGE_URL = imageURL;

//   const raw = JSON.stringify({
//     "user_app_id": {
//         "user_id": USER_ID,
//         "app_id": APP_ID
//     },
//     "inputs": [
//         {
//             "data": {
//                 "image": {
//                     "url": IMAGE_URL
//                 }
//             }
//         }
//     ]
//   });


//     const requestOptions = {
//         method: 'POST',
//         headers: {
//           'Accept': 'application/json',
//           'Authorization': 'Key ' + PAT
//         },
//         body: raw
//     };
//     return requestOptions;
// }
const initialState = {
  input: '',
  imageURL: '',
  box: {},
  route: 'signin',
  isSignedIn : false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box)=> {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event)=> {
    this.setState({input : event.target.value}); 
  }
  
  onButtonSubmit = () => {
    this.setState({imageURL : this.state.input})
    // fetch("https://api.clarifai.com/v2/models/face-detection/outputs", ApiFunction(this.state.input)) //why imageURL not working?
      fetch('https://fine-lime-scallop-shoe.cyclic.app/imageurl', {
          method: 'post',
          headers: {'Content-Type' : 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
      .then(response =>  response.json())
      .then(response => {
        if (response){
          fetch('https://fine-lime-scallop-shoe.cyclic.app/image', {
            method: 'put',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, {entries: count}))
          })
          .catch(console.log)
        }
        this.displayFaceBox(this.calculateFaceLocation(response))
        
      }) 
      .catch(error => console.log('error', error)); 
  }
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState)
    } else if (route === 'home'){
      this.setState({isSignedIn : true})
    }
    this.setState({route : route})
  }

  render() {
    const {box, isSignedIn, route, imageURL, user} = this.state;
    return (
      <div className="App">
        <ParticlesBg type="cobweb" num="150" color="#C8C8C8" bg={true}/>
        <Navigation isSignedIn= {isSignedIn} onRouteChange={this.onRouteChange}/>
        { route === 'home'
          ?<div>
            <Logo />
            <Rank name= {user.name} entries= {user.entries}/>
            <ImageLinkForm 
            onInputChange= {this.onInputChange} 
            onButtonSubmit = {this.onButtonSubmit}
            />
            <FaceRecognition box= {box} imageURL= {imageURL}/>
          </div>
          : ( 
            route === 'signin'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            )  
        }
      </div>
    );
  }
}

export default App;
// this.displayFaceBox(this.calculateFaceLocation(result)))