import React from 'react';

const navigation = ({onRouteChange, isSignedIn}) =>{
	if (isSignedIn){
		return(
			<nav style = {{display :'flex', justifyContent :'flex-end'}}>
				<p onClick= {() => onRouteChange('signout')} className = 'pa3 f3 dim underline black pointer'>Sign Out</p>
			</nav>
		);
	} else {
		return(
			<nav style = {{display :'flex', justifyContent :'flex-end'}}>
				<p onClick= {() => onRouteChange('signin')} className = 'pa3 f3 dim underline black pointer'>Sign In</p>
				<p onClick= {() => onRouteChange('register')} className = 'pa3 f3 dim underline black pointer'>Register</p>
			</nav>
		);
	}
}

export default navigation;