import React, { Component } from 'react'
import Spinner from './XOsX.gif';

export default class Loading extends Component {
     render() {
          return (
          <div className="text-center">
               <img src={Spinner} alt="loading..." height={'150px'}/>
          </div>
     )}
}