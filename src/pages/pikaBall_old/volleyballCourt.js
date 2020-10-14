import React from 'react';
import Pika from './pika.js';
import Ball from './ball.js';
import './pikaBall.css';
import { relative } from 'path';
const GRAVITY = 0.98;
const SPEEDDOWN = 0.998;
const REBOUNDSPEED = 1;
export default class VollryballCourt extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dimensions: {
				width: 0,
				height: 0,
			},
			player1: {
				name: 'player1',
				x: 0,
				y: 0,
				speedx: 0,
				speedy: 0,
				size: 230,
				keyCode: {
					83:{
						type:'Down',
						isClicked:false
					},
					87:{
						type:'Up',
						isClicked:false
					},
					65:{
						type:'Left',
						isClicked:false
					},
					68: {
						type:'Right',
						isClicked:false
					},
					71: {
						type:'Attack',
						isClicked:false
					}
				},
				isJump:false,
				
			},
			ball: {
				size: 150,
				y: 500,
				x: 250,
				speedx: 10,
				speedy: 10,
				isRebound: false,
			},
			player2: {
				name: 'player2',
				x: 100,
				y: 0,
				speedx: 0,
				speedy: 0,
				size: 230,
				transform: "scaleX(-1)",
				keyCode: {
					40:{
						type:'Down',
						isClicked:false
					},
					38:{
						type:'Up',
						isClicked:false
					},
					37:{
						type:'Left',
						isClicked:false
					},
					39: {
						type:'Right',
						isClicked:false
					},
					13: {
						type:'Attack',
						isClicked:false
					}
				},
				isJump:false,
				

			},

		};
		this._keyDown = this._keyDown.bind(this);
		this._keyUp   = this._keyUp.bind(this); 
		this.gravityPush = this.gravityPush.bind(this);
		this.limitValidate = this.limitValidate.bind(this);
		this.move = this.move.bind(this);
		this.isClickedFalse = this.isClickedFalse.bind(this);
		this.intervals = [];
	}
	move(name, type, keyPress) {
		switch (type) {
			case 'Down':
				console.log(this.state.dimensions.width)
				break;
			case 'Up':
				this.setState((pre, props) => {
					
					if(pre[name].y ==0) pre[name].speedy = -25;
					pre[name].keyCode[keyPress].isClicked=true;
					return { name: pre[name] }
				}, () => this.actBallpika())
				break;
			case 'Left':
				this.setState((pre, props) => {
					pre[name].speedx = 32;
					pre[name].keyCode[keyPress].isClicked=true;
					return { name: pre[name] }
				})
				break;
			case 'Right':
				this.setState((pre, props) => {
					pre[name].speedx = -32;
				
					pre[name].keyCode[keyPress].isClicked=true;
					return { name: pre[name] }
				})
				break;
			case 'Attack':
				this.setState((pre, props) => {
					pre[name].keyCode[keyPress].isClicked=true;
					
					
					Object.keys(pre[name].keyCode).forEach(element => {
						var isClicked = pre[name].keyCode[element].isClicked;
						var type = pre[name].keyCode[element].type;
						if(isClicked && type!='Attack'){
							if(type==='Up'){
								
								pre.ball.speedy =Math.abs(pre.ball.speedy)*1.5;
							}
							if(type==='Right'){
								
								pre.ball.speedx*=-1.5;
							}
						}
					});

					
					return { name: pre[name],ball:pre.ball }
				})
				break;

			default:
				break;
		}
	}
	isClickedFalse(name, type, keyPress) {
		if(type!=="none"){
			this.setState((pre, props) => {
				pre[name].keyCode[keyPress].isClicked=false;
				return { name: pre[name] }
			})
		}
		
	}
	_keyDown(e) {
		const keyPress = e.keyCode;
		const { player1, player2 } = this.state;
		const p1Type = keyPress in player1.keyCode ? player1.keyCode[keyPress].type : 'none';
		const p2Type = keyPress in player2.keyCode ? player2.keyCode[keyPress].type : 'none';
		this.move(player1.name,p1Type, keyPress);
		this.move(player2.name,p2Type, keyPress);
	}
	_keyUp(e) {
		const keyPress = e.keyCode;
		const { player1, player2 } = this.state;
		const p1Type = keyPress in player1.keyCode ? player1.keyCode[keyPress].type : 'none';
		const p2Type = keyPress in player2.keyCode ? player2.keyCode[keyPress].type : 'none';
		this.isClickedFalse(player1.name,p1Type, keyPress);
		this.isClickedFalse(player2.name,p2Type, keyPress);
	}

	gravityPush() {
		if (this.state.player1.y >= 0) {
			if (this.state.player1.speedy !== 0) {
				this.setState((pre, prop) => {
					let p1 = pre.player1
					pre.player1.speedy = p1.speedy + GRAVITY;
					pre.player1.y = p1.y - p1.speedy;
					const player1 = { ...pre.player1 }
					return { player1 }
				}, () => this.actBallpika())
			}
		} else {
			this.setState((pre, prop) => {
				let preCopy = Object.assign({}, pre.player1);
				preCopy.y = 0;
				preCopy.speedy = 0;
				const player1 = { ...preCopy }
				return { player1 }
			})
		}
		if (this.state.player2.y >= 0) {
			if (this.state.player2.speedy !== 0) {
				this.setState((pre, prop) => {
					let p1 = pre.player2
					pre.player2.speedy = p1.speedy + GRAVITY;
					pre.player2.y = p1.y - p1.speedy;
					const player2 = { ...pre.player2 }
					return { player2 }
				}, () => this.actBallpika())
			}
		} else {
			this.setState((pre, prop) => {
				let preCopy = Object.assign({}, pre.player2);
				preCopy.y = 0;
				preCopy.speedy = 0;
				const player2 = { ...preCopy }
				return { player2 }
			})
		}

		if (this.state.ball.y >= 0) {
			if (this.state.ball.speedy !== 0) {
				this.setState((pre, prop) => {
					let p1 = pre.ball
					pre.ball.speedy = p1.speedy + GRAVITY;
					pre.ball.y = p1.y - p1.speedy;
					const ball = { ...pre.ball }
					return { ball }
				}, () => this.actBallpika())
			}
		}  
	}
	limitValidate() {
		const { dimensions } = this.state;
		const { ball } = this.state;
		const x = ball.x;
		const y = ball.y;
		let re=false;
		
		if (ball.isRebound){
			console.log("object");
			console.log(ball.speedx);
			console.log(ball.speedy);
			return;
		} 
		if(x>dimensions.width/2){
			if(x >= dimensions.width - ball.size ){
				this.setState((pre, props) => {
					pre.ball.speedx = pre.ball.speedx>0?pre.ball.speedx-REBOUNDSPEED :pre.ball.speedx+REBOUNDSPEED;
					pre.ball.speedx *= -1;
					pre.ball.isRebound = true;
					const ball = pre.ball;
					return { ball }
				})
			}
		}else {
			if(x<=3){
				this.setState((pre, props) => {
					pre.ball.speedx = pre.ball.speedx>0?pre.ball.speedx-REBOUNDSPEED :pre.ball.speedx+REBOUNDSPEED;
					pre.ball.speedx *= -1;
					pre.ball.isRebound = true;
					const ball = pre.ball;
					return { ball }
				})
			}
		}
		if(y>dimensions.height/2){
			if (y >= dimensions.height - ball.size){
				re=true;
				this.setState((pre, props) => {
					pre.ball.speedy = pre.ball.speedy>0?pre.ball.speedy-REBOUNDSPEED :pre.ball.speedy+REBOUNDSPEED;
					pre.ball.speedy *= -1;
					pre.ball.isRebound = true;
					const ball = pre.ball;
					return { ball }
				})
			}
		}else{
			if(y<=5){
				re=true;
				this.setState((pre, props) => {
					pre.ball.speedy = pre.ball.speedy>0?pre.ball.speedy-REBOUNDSPEED :pre.ball.speedy+REBOUNDSPEED;
					pre.ball.speedy *= -1;
					pre.ball.isRebound = true;
					const ball = pre.ball;
					return { ball }
				})
			}
		}

			if(!re){
				console.log(dimensions.width);
				console.log(y);
			}
			
	}
	speedPush() {
		
		this.setState((pre, props) => {
			let pPlayer1 = pre.player1;
			if (pPlayer1.speedx !== 0) {
				pPlayer1.speedx = Math.abs(pPlayer1.speedx) > 0.1 ? pPlayer1.speedx * 0.85 : 0;
				pPlayer1.x -= pPlayer1.speedx;
				if((pPlayer1.x < 0) || (pPlayer1.x + pPlayer1.size> pre.dimensions.width/2) )pPlayer1.x += pPlayer1.speedx;
			}

			let pPlayer2 = pre.player2;
			if (pPlayer2.speedx !== 0) {
				pPlayer2.speedx = Math.abs(pPlayer2.speedx) > 0.1 ? pPlayer2.speedx * 0.85 : 0;
				pPlayer2.x -= pPlayer2.speedx;
				if((pPlayer2.x  + pPlayer2.size > pre.dimensions.width)
						||(pPlayer2.x < pre.dimensions.width/2)
					)pPlayer2.x += pPlayer2.speedx;


			}

			let pball = pre.ball
			pball.speedx *= SPEEDDOWN;
			pball.speedy *= SPEEDDOWN;
			pball.x -= pball.speedx
			pball.y -= pball.speedy

			const ball = { ...pball };
			const player1 = { ...pPlayer1 };
			const player2 = { ...pPlayer2 };
			return { player1,player2,ball}
		}, () => this.actBallpika());
	}
	attack() {

	}
	actBallpika() {
		// return;
		const { player1, ball, player2 } = this.state;
		if (ball.isRebound) return;
		var vlocation = ball.x - player1.x;
		var hlocation = ball.y - player1.y;
		if (vlocation <= player1.size &&
			vlocation >= -ball.size + player1.x  &&
			hlocation <= player1.size &&
			hlocation >= -ball.size) {
				console.log("vlocation");
			console.log(vlocation);
			console.log("-ball.size");
			console.log(-ball.size);
			if (vlocation <= player1.size && vlocation >= -ball.size)
				this.setState((pre, props) => { 
					pre.ball.speedx *= -1 * REBOUNDSPEED;
					pre.ball.speedx += pre.player1.speedx*0.5;
					pre.ball.isRebound = true;
					const ball = pre.ball;
					return { ball }
				})
			if (hlocation <= player1.size && hlocation >= -ball.size)
				this.setState((pre, props) => {
					pre.ball.speedy *= -1 * REBOUNDSPEED;
					pre.ball.speedy += pre.player1.speedy*0.5;
					pre.ball.isRebound = true;
					const ball = pre.ball;
					return { ball }
				})
		}


		var vlocation2 = ball.x - player2.x;
		var hlocation2 = ball.y - player2.y;
		if (vlocation2 <= player2.size &&
			vlocation2 >= -ball.size &&
			hlocation2 <= player2.size &&
			hlocation2 >= -ball.size) {
			
			if (vlocation2 <= player2.size && vlocation2 >= -ball.size)
				this.setState((pre, props) => {
					pre.ball.speedx *= -1 * REBOUNDSPEED;
					pre.ball.speedx += pre.player2.speedx*0.5;
					pre.ball.isRebound = true;
					const ball = pre.ball;
					return { ball }
				})
			if (hlocation2 <= player2.size && hlocation2 >= -ball.size)
				this.setState((pre, props) => {
					pre.ball.speedy *= -1 * REBOUNDSPEED;
					pre.ball.speedy += pre.player2.speedy*0.5;
					pre.ball.isRebound = true;
					const ball = pre.ball;
					return { ball }
				})
		}
	}
	componentDidMount() {
		this.setState((pre, prop) => {
			pre.player2.x = this.container.clientWidth - pre.player2.size;
			const player2 = { ...pre.player2 };
			return { player2 };
		},()=>console.log(this.state.player2));

		document.addEventListener("keydown", this._keyDown.bind(this));
		document.addEventListener("keyup", this._keyUp.bind(this));
		this.intervals.push(setInterval(() => {
			
			
			this.limitValidate();
		}, 5)
		)
		this.intervals.push(setInterval(() => {
			this.gravityPush()
			
			this.speedPush()
		},50))
		this.intervals.push(setInterval(() => {
			this.setState({
				dimensions: {
					width: this.container.clientWidth,
					height: this.container.clientHeight,
				},
			});
			this.setState((pre, props) => {
				pre.ball.isRebound = false;
				const ball = pre.ball;
				return { ball }
			})
		}, 500))
	}
	componentWillUnmount(){
		this.intervals.map(value=>clearInterval(value))
	}

	render() {
		const divStyle={
			position:'relative',
			width:'100%',
			bottom:'20px',
		}
		return (
			<div className="court" >
				<div className="court" ref={el => (this.container = el)} style={divStyle}> 
					<Ball ball={this.state.ball} />
					<Pika player={this.state.player1} imgOrder={(this.state.player1.y == 0)?0:1} />
					<Pika player={this.state.player2} imgOrder={(this.state.player2.y == 0)?0:1}/>
				</div>
			</div>
			
		)
	}
};


//old keyDown
// switch (e.keyCode) {
		// 	//	Down
		// 	case 40:
		// 		console.log(this.state.dimensions.width)
		// 		break;
		// 	// Up
		// 	case 38:
		// 		this.setState((pre, props) => {
		// 			pre.player1.speedy = -25;
		// 			const player1 = pre.player1;
		// 			return { player1 }
		// 		}, () => this.actBallpika())
		// 		break;
		// 	// left
		// 	case 37:
		// 		this.setState((pre, props) => {
		// 			pre.player1.speedx = 32;
		// 			const player1 = pre.player1;
		// 			return { player1 }
		// 		})
		// 		break;
		// 	//	right
		// 	case 39:
		// 		this.setState((pre, props) => {
		// 			pre.player1.speedx = -32;
		// 			const player1 = pre.player1;
		// 			return { player1 }
		// 		})
		// 		break;
		// 	//  Enter
		// 	case 13:
		// 		break;

		// 	case 87:
		// 		this.setState((pre, props) => {
		// 			pre.player2.speedy = -25;
		// 			const player2 = pre.player2;
		// 			return { player2 }
		// 		}, () => this.actBallpika())
		// 		break;
		// 	case 65:
		// 		this.setState((pre, props) => {
		// 			pre.player2.speedx = 32;
		// 			const player2 = pre.player2;
		// 			return { player2 }
		// 		})
		// 		break;
		// 	case 68:
		// 		this.setState((pre, props) => {
		// 			pre.player2.speedx = -32;
		// 			const player2 = pre.player2;
		// 			return { player2 }
		// 		})
		// 		break;
		// 	default:
		// 		console.log(e.keyCode);
		// 		break;
		// }