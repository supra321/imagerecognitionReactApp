import React from 'react';

const screenWidth=document.documentElement.clientWidth;
let classWidth,height,width;
if (screenWidth>768){
  	classWidth='mt2 w-50 justify-center';
  	width='500px';
  	height='350px';
}else{
	classWidth='mt2 w-100 pa4 justify-center';
	width='300px'
	height='200px';
}

const TravelRecognition=({imageURL})=>{
	return(
		<div className={classWidth}>
			<img src={imageURL} alt={'Wrong Url!!!.Try Again'} width={width} height={height}/>
		</div>
	);
}

export default TravelRecognition;