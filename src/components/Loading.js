import React from 'react';
import Spinner from './XOsX.gif';

const Loading = ()=> {
     return (
          <div className="text-center">
               <img src={Spinner} alt="loading..." height={'70px'}/>
          </div>
     )
}
export default Loading;