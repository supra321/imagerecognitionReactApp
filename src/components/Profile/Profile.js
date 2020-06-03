import React,{Component} from 'react';
import icon from './profile-icon.png'

class Profile extends Component{
	constructor(props){
		super(props);
		this.state={
			name: this.props.user.name,
			email: this.props.user.email,
			rank: this.props.user.rank,
			password: '',
			errorUpdate:false
		}
	}
	onFormChange=(event)=>{
		switch(event.target.name){
			case 'user-name':
				this.setState({name: event.target.value});
				break;
			case 'user-email':
				this.setState({email: event.target.value});
				break;
			case 'user-password':
				this.setState({password: event.target.value});
				break;
			default:
				return;
		}
	}
	onProfileUpdate=(formData,event)=>{
		if(event.key === 'Enter' || event.type === 'click'){
			fetch(`https://imagerecognitionapi.herokuapp.com/profile/${this.props.user.id}`,{
				method:'post',
				headers:{
					'Content-Type': 'application/json',
					'Authorization':window.localStorage.getItem('token')
				},
				body:JSON.stringify({formInput:formData})
			}).then(resp=>{
				if(resp.status === 200 || resp.status === 304){
					this.props.loadUser(Object.assign({},this.props.user,formData));
					this.props.toggleModal();
				}
			}).catch(err=>this.setState({errorUpdate:true}));
		}
	}
	render(){
		const {user,toggleModal}=this.props;
		const {name,email,rank,password}=this.state;
		const {onFormChange}=this;
		return (
			<div className="tc bg-white-80 fixed h-100 w-100 top-0 left-0 flex items-center justify-center">
				<article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 center shadow-5 bg-white flex">
					<main className="pa4 black-80 w-80 center">
						<img
							src={icon}
							className="h3 w3 dib" alt="avatar" />
						<h1>{name}</h1>
						<h4>{`Images Submitted: ${rank}`}</h4>
						<p>{`Member Since: ${new Date(user.joined).toLocaleString()}`}</p>
						<hr/>
						<label className="mt2 fw6" htmlFor="user-name">Name:</label>				
				        <input 
				        	onChange={onFormChange}
				        	onKeyPress={(event)=>this.onProfileUpdate({name,email,password},event)}
					        className="pa2 ba w-100"
					        placeholder={name}
					        type="text" 
					        name="user-name"  
					        id="name" 
				        />
				        <label className="mt2 fw6" htmlFor="user-email">Email:</label>
				        <input 
				        	onChange={onFormChange}
				        	onKeyPress={(event)=>this.onProfileUpdate({name,email,password},event)}
					        className="pa2 ba w-100"
					        placeholder={email}
					        type="email" 
					        name="user-email"  
					        id="email" 
				        />
				        <label className="mt2 fw6" htmlFor="user-password">Password:</label>
				        <input 
				        	onChange={onFormChange}
				        	onKeyPress={(event)=>this.onProfileUpdate({name,email,password},event)}
					        className="pa2 ba w-100" 
					        placeholder={password}
					        type="password" 
					        name="user-password"  
					        id="password" 
				        />
				    	{this.state.errorUpdate?<p>Could Not Update.Try Again.</p>:null}
				    	<div className="mt4 flex justify-between">
				    		<button className="b pa2 grow pointer hover-white w-40 bg-light-blue b--black-20"
				    			onClick={(event)=>this.onProfileUpdate({name,email,password},event)}
				    		>
				    			Update
				    		</button>
				    		<button className="b pa2 grow pointer hover-white w-40 bg-light-red b--black-20"
				    			onClick={toggleModal}
				    		>
				    			Cancel
				    		</button>
				    	</div>				
					</main>
					<div className="f1 b pointer hover-gray:hover pointer:hover" onClick={toggleModal}>
						&times;
					</div>
				</article>
			</div>
		);
	}
}

export default Profile;