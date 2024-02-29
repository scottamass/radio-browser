import React from 'react';

function Stationcard({onClick,name}) {

   
      return (
    <div className='card-body' onClick={onClick}>
       <h2>{name}</h2>
    </div>
         

    
      )
      
    }
    
    export default Stationcard
