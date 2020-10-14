import React from 'react';
import { ReactComponent as PikaImg } from './img/pika.svg';
import './pikaBall.css';
import Jump from './img/enemyJump.png'
import Normal from './img/enemyImage.png'

export default class Pika extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() { 
       
    }
    render(){
        const {player} = this.props;
        const myStyle = {
            bottom: player.y+"px",
            left: player.x+"px",
            width: player.size,
            height: player.size,
            transform: player.transform,
        }
        const imgsrc=[Normal,Jump];
        return (
        
            <div  className="object" style={myStyle} >
                {/* <PikaImg/> */}
                <img src={imgsrc[this.props.imgOrder]}  />;
            </div>
            
        )
    }

   
};
