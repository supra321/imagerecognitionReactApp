import React,{Component} from 'react';
import Particles from 'react-particles-js';
import defaultImage from './defaultImage.jpg';
import ImageURLInput from './components/ImageURLInput/ImageURLInput';
import InputNumbers from './components/InputNumbers/InputNumbers';
import Logo from './components/Logo/Logo';
import SignOut from './components/Navigation/SignOut';
import LogIn from './components/Navigation/LogIn';
import SignUp from './components/Navigation/SignUp';
import TravelRecognition from './components/TravelRecognition/TravelRecognition';
import TravelData from './components/TravelRecognition/TravelData';
import './App.css';

const width=document.documentElement.clientWidth;
const height=document.documentElement.clientHeight;
let canvas_area=width*height/1000;
let num_nb;
let flex='flex';
if (width>768){
  num_nb = (Math.round(Math.sqrt(width * 15)))*2;
}else{
  flex=null;
  num_nb = Math.round(Math.sqrt(width * 3));
}
const particleProperties={
  "particles": {
    "number": {
      "value": num_nb,
      "density": {
        "enable": true,
        "value_area": canvas_area
      }
    }
  }
}

const initialState={
  imageInput: '',
  imageURL: defaultImage,
  imageData: [],
  navigationStatus: 'login',
  isSignedIn: false,
  error:false,
  user:{
    id: '',
    name: '',
    email: '',
    /*password: '',*/
    rank: 0,
    joined:''
  }
}

class App extends Component{
  constructor (){
    super()
    this.state=initialState;
  }
  loadUser=(userData)=>{
    this.setState({user:{
      id: userData.id,
      name: userData.name,
      email: userData.email,
      /*password: userData.password,*/
      rank: userData.rank,
      joined:userData.joined
    }})
  }
  onImageChange=(event)=>{
    this.setState({imageInput: event.target.value});
  }
  onDetect=(event)=>{
    if(event.key === 'Enter' || event.type ==='click'){
      this.setState({imageURL: this.state.imageInput});
      fetch('https://imagerecognitionapi.herokuapp.com/imageurl',{
        method:'post',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
          imageInput:this.state.imageInput
        })
      })
      .then(response=>response.json())
      .then(response=>{
        this.setState({imageData: response.outputs[0].data.concepts,error:false});
        if(response){
          fetch('https://imagerecognitionapi.herokuapp.com/rank',{
            method:'put',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify({
              id:this.state.user.id
            })
          })
          .then(response=>response.json())
          .then(ranking=>{this.setState(Object.assign(this.state.user,{rank:ranking}))})
          .catch(err=>this.setState({error:true}));
          }
        }
      )
      .catch(err=>this.setState({error:true}));
    }
  }
  onNavigationStatusChange=(status)=>{
    status==='home'?this.setState({isSignedIn: true}):this.setState(initialState);
    this.setState({navigationStatus: status});
  }
  render() {
    const{imageURL,imageData,navigationStatus,isSignedIn}=this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particleProperties} />
        <SignOut isSignedIn={isSignedIn} onNavigationStatusChange={this.onNavigationStatusChange} />
        {navigationStatus==='login'?<LogIn onNavigationStatusChange={this.onNavigationStatusChange} loadUser={this.loadUser}/>:
          (navigationStatus==='signup'?<SignUp onNavigationStatusChange={this.onNavigationStatusChange} loadUser={this.loadUser}/>:
            <div>
              <div className={flex}>
                <Logo />
                <InputNumbers name={this.state.user.name} rank={this.state.user.rank}/>
              </div>
              <ImageURLInput onImageChange={this.onImageChange} onDetect={this.onDetect}/>
              {this.state.error?<p>An unexpected error occured</p>:null}
              <div className={flex}>
                <TravelRecognition imageURL={imageURL}/>
                <TravelData imageData={imageData}/>
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default App;
