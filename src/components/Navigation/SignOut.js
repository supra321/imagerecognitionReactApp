import React from 'react';
import ProfileIcon from '../Profile/ProfileIcon';

const SignOut=({onNavigationStatusChange,isSignedIn,toggleModal})=>{
	return(!isSignedIn?
		<nav className='flex justify-end'>
			<p className='f4 pa2 dim link black underline pointer' onClick={()=>onNavigationStatusChange('login')}><strong>Log In</strong></p>
			<p className='f4 pa2 dim link black underline pointer' onClick={()=>onNavigationStatusChange('signup')}><strong>Sign Up</strong></p>
		</nav>:
		<nav className='flex justify-end'>
			<ProfileIcon onNavigationStatusChange={onNavigationStatusChange} toggleModal={toggleModal}/>
		</nav>
	)
}

export default SignOut;