import React from 'react';
import { ReactComponent as PikaImg } from './img/pika.svg';
import './pikaBall.css';

export default class Pika extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() { 
       
    }
    render(){
        const myStyle = {
            bottom: this.props.y+"px",
            left: this.props.x+"px",
            width: this.props.size,
            height: this.props.size,
        }
        return (
            <PikaImg className="object" style={myStyle} />
        )
    }

   
};
