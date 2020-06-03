import React,{Component} from 'react';
import './Navigation.css';

class LogIn extends Component{
	constructor(props){
		super(props);
		this.state={
			logInEmail:'',
			logInPassword:'',
			incorrectCombination:false
		}
	}
	onEmailChange=(event)=>{
		this.setState({logInEmail: event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({logInPassword: event.target.value})
	}
	saveAuthToken=(token)=>{
		window.localStorage.setItem('token',token);
	}
	onSubmitLogIn=(event)=>{
		if(event.key === 'Enter' || event.type ==='click'){
			fetch('https://imagerecognitionapi.herokuapp.com/login',{
				method: 'post',
				headers: {'Content-Type':'application/json'},
				body: JSON.stringify({
					email:this.state.logInEmail,
					password:this.state.logInPassword
				})
			})
			.then(response=>response.json())
			.then(data=>{
				if(data.userId){
					this.saveAuthToken(data.token);
					fetch(`https://imagerecognitionapi.herokuapp.com/profile/${data.userId}`,{
						method: 'get',
			            headers:{
			              'Content-Type':'application/json',
			              'Authorization':data.token
			            }
					})
					.then(response=>response.json())
					.then(user=>{
					if(user.id){
					  this.props.loadUser(user);
					  this.props.onNavigationStatusChange('home');
					}
					}).catch(err=>console.log('Unable to load Profile!!!'));
				}
				else{
					this.setState({incorrectCombination:true});
					console.log('Wrong Combination');
				}
			}).catch(err=>this.setState({incorrectCombination:true}));
		}
	}
	render(){
		const{onNavigationStatusChange}=this.props;
		return(
			<article className="width br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
				<main className="pa4 black-80">
				  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0">Log In</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input className="hover-black pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange} onKeyPress={this.onSubmitLogIn} />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input className="hover-black b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange} onKeyPress={this.onSubmitLogIn} />
					      </div>
					    </fieldset>
					    {this.state.incorrectCombination?<p>Incorrect Email or Password.Try Again.</p>:null}
					    <div className="">
					      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Log in" onClick={this.onSubmitLogIn} />
					    </div>
					    <div className="lh-copy mt3">
					      <p className="f6 link dim black db pointer" onClick={()=>onNavigationStatusChange('signup')}>Sign up</p>
					    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default LogIn;