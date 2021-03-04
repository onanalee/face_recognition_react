import React from 'react';
import brain from './brain.png';
import './Logo.css';


const Logo = () => {
    return (
        <div className='Logo'>
           <img className="brain" src={brain}/>
        </div>
    );
}

export default Logo;