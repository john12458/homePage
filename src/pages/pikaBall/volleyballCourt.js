import React from 'react';
import Pika from './pika.js';
import Ball from './ball.js';
import './pikaBall.css';
const GRAVITY = 0.98;
export default class VollryballCourt extends React.Component {
  		constructor(props){
		super(props);
		this.state={
			dimensions:{
				width:0,
				height:0,
			},
			player1:{
				x:0,
				y:0,
				speed:0
			},
			ball:{
				y: 500,
				x: 100,    
				speedx:10,
				speedy:10,
			}
		
		};
		this._keyDown =this._keyDown.bind(this);
		this.gravityPush = this.gravityPush.bind(this);
		this.limitValidate= this.limitValidate.bind(this);	
	}	
	_keyDown(e){
			switch (e.keyCode) {
					//	Down
					case 40:
							console.log(this.state.dimensions.width)
							break;
					// Up
					case 38:   
					this.setState((pre,props)=>{
						pre.player1.speed = -25;
						const player1 = pre.player1;
						return {player1}
					})
					break;
					// left
					case 37:
							this.setState((pre,props)=>{
								pre.player1.x += -32;
								const player1 = pre.player1;
								return {player1}
							})
							break;
					//	right
					case 39:
							this.setState((pre,props)=>{
								pre.player1.x += 32;
								const player1 = pre.player1;
								return {player1}
							})
							break;
					//  Enter
					case 13:
					default:
							break;
			}
	}

	gravityPush(){
		if(this.state.player1.y>=0){
			if(this.state.player1.speed!==0){
				this.setState((pre,prop)=>{
					let p1 = pre.player1 
					pre.player1.speed=p1.speed+GRAVITY;
					pre.player1.y=p1.y-p1.speed;
					const player1={...pre.player1}
					return {player1}
				})
			}
		}else{
			this.setState((pre,prop)=>{
				let preCopy = Object.assign({},pre.player1);
				preCopy.y=0;
				preCopy.speed=0;
				const player1={...preCopy}
				return {player1}
			})
		} 
	}
	limitValidate(){
        const x = this.state.ball.x;
        const y = this.state.ball.y;
		if(x>=1081.6-72|| x<=0) 	
			this.setState((pre,props)=>{
				pre.ball.speedx *= -1;
				const ball = pre.ball;
				return {ball}
			})
		if(y>=700-72  || y<=0)  
			this.setState((pre,props)=>{
				pre.ball.speedy *= -1;
				const ball = pre.ball;
				return {ball}
			})
	}
	speedPush(){
		this.limitValidate();
		this.setState((pre,props)=>{
			let pball = pre.ball 
			pball.x -= pball.speedx
			pball.y -= pball.speedy
			const ball = {...pball};
			return {ball}
		})
		this.setState((pre,prop)=>({y:pre.y-this.state.speedy}))
		this.setState((pre,prop)=>({x:pre.x-this.state.speedx}))
	}
  	componentDidMount(){
		this.setState({
			dimensions: {
			width: this.container.clientWidth,
			height: this.container.clientHeight,
			},
		});
		document.addEventListener("keydown", this._keyDown.bind(this)); 
		setInterval(() => {
			this.gravityPush()
			this.speedPush()
		}, 20);
 	}
	render(){
		const px1 = this.state.player1.x;
		const py1 = this.state.player1.y;
		return (
			<div className="court" ref={el => (this.container = el)} > 
				<Pika size="8em" 
							x={px1}
							y={py1}/>
				<Ball ball={this.state.ball}/>
      		</div>
		)
	}
};
