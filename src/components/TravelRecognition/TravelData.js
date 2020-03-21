import React from 'react';
import ImageProperties from './ImageProperties'
import Scroll from '../Scroll/Scroll';

const TravelData=({imageData})=>{
	return(
		<div className='w-50 justify-center pa6 pt0'>
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