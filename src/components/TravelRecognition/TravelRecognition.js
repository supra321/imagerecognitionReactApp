import React from 'react';

const TravelRecognition=({imageURL})=>{
	return(
		<div className='mt2 w-50 justify-center'>
			<img src={imageURL} alt={'Wrong Url!!!.Try Again'} width='500px' height='350px'/>
		</div>
	);
}

export default TravelRecognition;