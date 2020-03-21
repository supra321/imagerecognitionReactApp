import React,{Component} from 'react';

class SignUp extends Component{
	constructor(props){
		super(props);
		this.state={
			SignUpName: '',
			SignUpEmail:'',
			SignUpPassword:''
		}
	}
	onNameChange=(event)=>{
		this.setState({SignUpName: event.target.value})
	}
	onEmailChange=(event)=>{
		this.setState({SignUpEmail: event.target.value})
	}
	onPasswordChange=(event)=>{
		this.setState({SignUpPassword: event.target.value})
	}
	onSubmitSignUp=()=>{
		fetch('https://imagerecognitionapi.herokuapp.com/signup',{
			method: 'post',
			headers: {'Content-Type':'application/json'},
			body: JSON.stringify({
				name:this.state.SignUpName,
				email:this.state.SignUpEmail,
				password:this.state.SignUpPassword
			})
		})
		.then(response=>response.json())
		.then(user=>{
			if(user.id){
				this.props.loadUser(user);
				this.props.onNavigationStatusChange('home');
			}
			else{
				console.log('400: Bad Request');
			}
		})
	}
	render(){
		return(
			<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5">
				<main className="pa4 black-80">
				  <div className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      <legend className="f2 fw6 ph0 mh0">Sign Up</legend>
					      <div className="mt3">
					        <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="text" name="name"  id="name" onChange={this.onNameChange} />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
					        <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onEmailChange} />
					      </div>
					      <div className="mv3">
					        <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
					        <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password"  id="password" onChange={this.onPasswordChange} />
					      </div>
					    </fieldset>
					    <div className="">
					      <input className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" type="submit" value="Log in" onClick={this.onSubmitSignUp} />
					    </div>
				  </div>
				</main>
			</article>
		);
	}
}

export default SignUp;