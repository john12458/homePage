import React from 'react';
import VolleyballCourt from './volleyballCourt.js'
import './pikaBall.css';
import { Link } from 'react-router-dom';
export default function Container(){
    return(
        <div className="container">
            <span style={{position:"fixed",top:80,left:20,color:"white"}}>Develop...</span>
            <span style={{position:"fixed",top:150,left:20,color:"white"}}>P1:<br/>W A S D</span>
            <span style={{position:"fixed",top:250,left:20,color:"white"}}>P2:<br/>上下左右</span>
            <Link style={{position:"fixed",top:10,left:20,color:"white"}} to="/"> Back</Link>
            <VolleyballCourt />
        </div>
    )
}