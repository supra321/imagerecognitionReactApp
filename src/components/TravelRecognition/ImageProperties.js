import React from 'react';

const ImageProperties=({name,value})=>{
	return(
		<div className='overflow-hidden'>
			<p className='fl f4'>{name}</p>
			<p className='fr f4'>{value}%</p>
			<hr/>
		</div>
	);
}

export default ImageProperties;