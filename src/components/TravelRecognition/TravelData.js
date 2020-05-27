import React from 'react';
import ImageProperties from './ImageProperties'
import Scroll from '../Scroll/Scroll';

const width=document.documentElement.clientWidth;
let classWidth;
if (width>768){
  	classWidth='w-50 justify-center pa6 pt0 pb2';
}else{
	classWidth='w-100 justify-center pa4 pt0 pb2';
}

const TravelData=({imageData})=>{
	return(
		<div className={classWidth}>
			<div className='overflow-hidden'>
				<p className='fl f5 underline'><strong>PREDICTED CONCEPT</strong></p>
				<p className='fr f5 underline'><strong>PROBABILITY</strong></p>
			</div>
			<Scroll>
			{	
				imageData.map(i=>{
					return(
						<ImageProperties key={i.id} name={i.name} value={(i.value*100).toFixed(3)} />
					) 
				})
			}
			</Scroll>
		</div> 
	);
}

export default TravelData;