import React from 'react';
import './ImageLinkForm.css';


export default function ImageLinkForm({onInputChange, onButtonSubmit}) {
	return (
		<div>
			<p className= 'f3'>
				{'This Magic Brain will detect faces in your pictures. Give it a try'}
			</p>
			<div className= 'center'>
				<div className= 'center pa4 br3 shadow-5 form'>
					<input className= 'f4 pa2 w-70 center'
						type= 'text' 
						placeholder= 'Enter image URL here'
						onChange= {onInputChange} />
					<button 
					className= 'w-30 grow f4 link ph3 pv2 dib white bg-light-purple' 
					onClick= {onButtonSubmit}> Detect</button>
				</div>
			</div>
		</div>
	);
}