import React from 'react';
import './pikaBall.css';

export default class Ball extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() { 
      
    }
    render(){
        const style ={
            width:"4.5em",
            height:"4.5em",
            borderRadius:"50%",
            background:"black",
            border:"1px solid black",
            bottom : this.props.ball.y+"px",
            left : this.props.ball.x+"px",
        }
        return (
            <div className="object" style={style} ></div>
        )
    }

   
};
