import React from 'react';
import './ImageURLInput.css';

const width=document.documentElement.clientWidth;
let classWidth;
if (width>768){
  	classWidth='urlInput pa4 br3 w-50 shadow-5 flex justify-center';
}else{
	classWidth='urlInput pa3 br3 w-100 shadow-5 flex justify-center';
}

const ImageURLInput=({onImageChange,onDetect})=>{
	return(
		<div>
			<p className='f3'>
				This Travel model recognizes specific features of residential, hotel, and travel-related properties.Give it a try.
			</p>
			<div className='flex justify-center pa4 pt1'>
				<div className={classWidth}>
					<input className='tc f5 pa2 w-100 center' type='text' placeholder='Enter Image Address' onChange={onImageChange} onKeyPress={onDetect}/>
					<div className='pl3'>
						<button className='tc f5 pa2 grow link black bg-gold' onClick={onDetect}>Detect</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImageURLInput;