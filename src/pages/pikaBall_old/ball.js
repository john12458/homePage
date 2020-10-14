import React from 'react';
import './pikaBall.css';
import Volleyball from './img/volleyball.png';

export default class Ball extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() { 
      
    }
    render(){
        const style ={
            width:this.props.ball.size,
            height:this.props.ball.size,
            borderRadius:"50%",
            border:"1px solid black",
            bottom : this.props.ball.y+"px",
            left : this.props.ball.x+"px",
        }
        return (
            <div className="object" style={style} >
                 <img src={Volleyball} width='100%'  />;
            </div>
        )
    }

   
};
