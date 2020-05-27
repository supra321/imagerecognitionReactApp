import React from 'react';

const width=document.documentElement.clientWidth;
let classWidth;
if (width>768){
  	classWidth='w-60 justify-center';
}else{
	classWidth='w-100 pa4 justify-center';
}

const InputNumbers=({name,rank})=>{
	return(
		<div className={classWidth}>
			<div className='f2 white'>
				{`${name}, Your Number of Inputs is `}
			</div>
			<div className='f1 white'>
				{rank}
			</div>
		</div>
	);
}

export default InputNumbers;