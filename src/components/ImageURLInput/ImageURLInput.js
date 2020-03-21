import React from 'react';
import './ImageURLInput.css';

const ImageURLInput=({onImageChange,onDetect})=>{
	return(
		<div>
			<p className='f3'>
				This Travel model recognizes specific travel-related properties.Give it a try.
			</p>
			<div className='flex justify-center'>
				<div className='urlInput pa4 br3 w-50 shadow-5 flex justify-center'>
					<input className='tc f5 pa2 w-100 center' type='text' onChange={onImageChange}/>
					<div className='pl3'>
						<button className='tc f5 pa2 grow link black bg-gold' onClick={onDetect}>Detect</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImageURLInput;