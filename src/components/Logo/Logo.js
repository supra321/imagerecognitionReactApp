import React from 'react';
import Tilt from 'react-tilt'
import icon from './luggage.png'
import './Logo.css';

const Logo=()=>{
	return(
		<div className='w-20'>
			<div className='ml4'>
				<Tilt className="Tilt br3 shadow-1" options={{ max : 35 }} style={{ height: 100, width: 100 }} >
 				<div className="Tilt-inner"><img className='pad' src={icon} alt='logo' /></div>
			</Tilt>
			</div>
		</div>
	);
}

export default Logo;