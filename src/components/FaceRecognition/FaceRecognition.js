import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, boxes }) => {
	return (
		<div className="center ma">
			<div className="absolute mt2">
				<img id="inputimage" src={imageUrl} alt="" width="500px" height="auto" />
				{ boxes.map(box => <div className="bounding-box" key={box.id} style={{top: box.top_row, left: box.left_col, bottom: box.bottom_row, right: box.right_col}}></div>) }
			</div>
		</div>
	)
}

export default FaceRecognition;