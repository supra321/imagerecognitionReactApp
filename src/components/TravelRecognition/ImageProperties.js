import React from 'react';

const ImageProperties=({name,value})=>{
	return(
		<div>
			<div className='overflow-hidden'>
				<p className='fl f4'>{name}</p>
				<p className='fr f4'>{value}%</p>
			</div>
			<hr className='mv0 b--white'/>
		</div>
	);
}

export default ImageProperties;