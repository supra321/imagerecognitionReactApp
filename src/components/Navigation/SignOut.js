import React from 'react';

const SignOut=({onNavigationStatusChange,isSignedIn})=>{
	return(!isSignedIn?
		<nav className='flex justify-end'>
			<p className='f4 pa2 dim link black underline pointer' onClick={()=>onNavigationStatusChange('login')}><strong>Log In</strong></p>
			<p className='f4 pa2 dim link black underline pointer' onClick={()=>onNavigationStatusChange('signup')}><strong>Sign Up</strong></p>
		</nav>:
		<nav className='flex justify-end'>
			<p className='f4 pa2 dim link black underline pointer' onClick={()=>onNavigationStatusChange('login')}><strong>Sign Out</strong></p>
		</nav>
	)
}

export default SignOut;