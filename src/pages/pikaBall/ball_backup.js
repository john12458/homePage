
import React from 'react';
import './pikaBall.css';

export default class Ball extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            y: 500,
            x: 100,    
            speedx:-7,
            speedy:10,
        }
        this.limitValidate= this.limitValidate.bind(this);
    }
    limitValidate(){
        const {x} = this.state;
        const {y} = this.state;
        if(x>=1081.6-72|| x<=0) this.setState((pre,prop)=>({speedx:pre.speedx * -1}))
        if(y>=700-72  || y<=0)  this.setState((pre,prop)=>({speedy:pre.speedy * -1}))
        
	}
    componentDidMount() { 
        window.addEventListener('mouseup', this._onDragLeave);
        window.addEventListener('dragenter', this._onDragEnter);
        window.addEventListener('dragover', this._onDragOver);
        window.addEventListener('drop', this._onDrop);
        const gravityPush = setInterval(() => {
            this.limitValidate();
            this.setState((pre,prop)=>({y:pre.y-this.state.speedy}))
            this.setState((pre,prop)=>({x:pre.x-this.state.speedx}))
        }, 500);
      
    }
    render(){
        const style ={
            width:"4.5em",
            height:"4.5em",
            borderRadius:"50%",
            background:"black",
            border:"1px solid black",
            bottom : this.state.y+"px",
            left : this.state.x+"px",
        }
        return (
            <div className="object" style={style} onDrag={()=>this.onDrag()}></div>
        )
    }

   
};
