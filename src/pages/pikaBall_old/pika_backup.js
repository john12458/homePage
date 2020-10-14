import React from 'react';
import { ReactComponent as PikaImg } from './img/pika.svg';
import './pikaBall.css';

function diff(locate,distance,objLen,type){
    switch(type){
        case "vertical":
            if(distance >= 0){
                return parseInt(locate || 0) + distance < document.body.clientHeight - parseInt(objLen || 0)*16 ;
            }else return parseInt(locate || 0) + distance >	0 ;
        case "horizontal":
            if(distance <= 0){
                return parseInt(locate || 0) + distance < document.body.clientWidth - parseInt(objLen || 0)*16 ;
            }else return parseInt(locate || 0) + distance >	0 ;
        default:
            return false;
    }
    
};
/**
 * if (diff(left, -32, width, "horizontal")) {
                    leftCopy = parseInt(left || 0) + -100 + 'px';
                    this.setState({left:leftCopy});
                }
 * 
 */
const GRAVITY = 0.98;
export default class Pika extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            y:0,
            x:0,
            speed :0,                
            jump:false,
        }
        this.move = this.move.bind(this);
        this.jump = this.jump.bind(this);
    }
    jump(){
        this.setState((pre,prop)=>({speed:-25,jump:true}))
        const grabityPush = setInterval(() => {
            console.log("interval start");
            if(this.state.y>=0){
                console.log("down...");
                this.setState((pre,prop)=>({speed:pre.speed+GRAVITY}))
                this.setState((pre,prop)=>({y:pre.y-this.state.speed}))
            }else{
                this.setState({y:0,gravitySpeed:0,jump:false});
                clearInterval(grabityPush);
            } 
        }, 10);
    }
    move(e){
        // notice : Object.assign just can use the Object which of json is only one layer
        console.log(e.keyCode);
        switch (e.keyCode) {
            //	Down
            case 40:
                
                break;
            // Up
            case 38:   
                if(this.state.jump==false)
                    this.jump();
                break;
            // left
            case 37:
                this.setState((pre,prop)=>({x:pre.x-32}))
                break;
            //	right
            case 39:
                this.setState((pre,prop)=>({x:pre.x+32}))
                break;
            //  Enter
            case 13:
            default:
                break;
        }

    }

    componentDidMount() { 
         document.addEventListener("keydown", this.move.bind(this)); 
    }
    render(){
        const myStyle = {
            bottom: this.state.y+"px",
            left: this.state.x+"px",
            width: this.props.size,
            height: this.props.size,
        }
        return (
            <PikaImg className="object" style={myStyle} onKeyDown={(e) => this.move(e)} />
        )
    }

   
};
