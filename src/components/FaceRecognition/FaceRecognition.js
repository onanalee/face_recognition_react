import React from 'react';



const FaceRecognition = ({ imageUrl }) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img className="resultImage" src={imageUrl}></img>
            </div>
        </div>
    );
}

export default FaceRecognition;