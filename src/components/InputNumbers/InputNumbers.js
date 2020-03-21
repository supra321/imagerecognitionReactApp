import React from 'react';

const InputNumbers=({name,rank})=>{
	return(
		<div className='w-60 justify-center'>
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