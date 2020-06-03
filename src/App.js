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
import Modal from './components/Modal/Modal';
import Profile from './components/Profile/Profile';
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
  isProfileOpen: false,
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
  componentDidMount(){
    const token=window.localStorage.getItem('token');
    if(token){
      fetch('https://imagerecognitionapi.herokuapp.com/login',{
        method: 'post',
        headers:{
          'Content-Type':'application/json',
          'Authorization':token
        }
      }).then(response=>response.json())
      .then(data=>{
        if(data.id){
          fetch(`https://imagerecognitionapi.herokuapp.com/profile/${data.id}`,{
            method: 'get',
            headers:{
              'Content-Type':'application/json',
              'Authorization':token
            }
          })
          .then(response=>response.json())
          .then(user=>{
            if(user.id){
              this.loadUser(user);
              this.onNavigationStatusChange('home');
            }
          }).catch(err=>console.log('Unable to load Profile!!!'));
        }
      }).catch(err=>console.log('Unable to Authorize JWT token!!!'));
    }
  }
  onImageChange=(event)=>{
    this.setState({imageInput: event.target.value});
  }
  onDetect=(event)=>{
    if(event.key === 'Enter' || event.type ==='click'){
      this.setState({imageURL: this.state.imageInput});
      fetch('https://imagerecognitionapi.herokuapp.com/imageurl',{
        method:'post',
        headers:{
          'Content-Type': 'application/json',
          'Authorization':window.localStorage.getItem('token')
        },
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
            headers:{
              'Content-Type': 'application/json',
              'Authorization':window.localStorage.getItem('token')
            },
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
  toggleModal=()=>{
    this.setState(prevState=>Object.assign({},prevState,{isProfileOpen: !prevState.isProfileOpen}));
  }
  render() {
    const{imageURL,imageData,navigationStatus,isSignedIn,isProfileOpen}=this.state;
    return (
      <div className="App">
        <Particles className='particles' params={particleProperties} />
        <SignOut isSignedIn={isSignedIn} onNavigationStatusChange={this.onNavigationStatusChange} toggleModal={this.toggleModal}/>
        {navigationStatus==='login'?<LogIn onNavigationStatusChange={this.onNavigationStatusChange} loadUser={this.loadUser}/>:
          (navigationStatus==='signup'?<SignUp onNavigationStatusChange={this.onNavigationStatusChange} loadUser={this.loadUser}/>:
            <div>
              <div className={flex}>
                <Logo />
                {isProfileOpen?
                  <Modal>
                    <Profile toggleModal={this.toggleModal} user={this.state.user} loadUser={this.loadUser}/>
                  </Modal>:null
                }
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
