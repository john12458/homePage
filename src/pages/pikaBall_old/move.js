class Move extends React.Component {
	constructor(props){
		super(props);
		this.state={
			style:{
				position:"absolute",
				backgroundColor:"skyblue",
				bottom:"300px",
				right:"0px",
				width:"10em",
				height:"10em",
			},
			txt:"CMD",
			dialogTxt:"這是一台掃地機器，當遇到白色的垃圾時會執行Clear，將垃圾掃掉"
				+"\n請用方向鍵控制: 上下左右鍵，依序對應其方向移動",
			trashStyle:{
				position:"absolute",
				bottom:"300px",
				right:"300px",
				width:"2em",
				height:"2em",
				backgroundColor:"white",
			}
		};
		this.move = this.move.bind(this);
		this.clear = this.clear.bind(this);
	}	
	diff(locate,distance,objLen,type){
		switch(type){
			case "vertical":
				if(distance >= 0){
					return parseInt(locate || 0) + distance < document.body.clientHeight - parseInt(objLen || 0)*16 ;
				}else return parseInt(locate || 0) + distance >	0 ;
			break;
			case "horizontal":
				if(distance >= 0){
					return parseInt(locate || 0) + distance < document.body.clientWidth - parseInt(objLen || 0)*16 ;
				}else return parseInt(locate || 0) + distance >	0 ;
			break;
			default:
				return false;
		}
		
	}
	move(e){
		// notice : Object.assign just can use the Object which of json is only one layer
		  var {style} = this.state;
		  switch(e.keyCode){
		    //	Down
			case 40:
				if(this.diff(style.bottom,-32,style.height,"vertical")){
					var styleCopy = Object.assign({},style);
					styleCopy.bottom = parseInt(style.bottom || 0) + -32 + 'px';
					this.setState({style:{...styleCopy},txt:"Down",});
				}
			break;
			// Up
			case 38:
				if(this.diff(style.bottom,32,style.height,"vertical")){
					var styleCopy = Object.assign({},style);
					styleCopy.bottom = parseInt(style.bottom || 0) + 32 + 'px';
                    this.setState({style:{...styleCopy},txt:"Up",}); 
                    
				}
			break;
			// Left
			case 37:
				if(this.diff(style.right,32,style.width,"horizontal")){
					var styleCopy = Object.assign({},style);
					styleCopy.right = parseInt(style.right || 0) + 32 + 'px';
					this.setState({style:{...styleCopy},txt:"Left",});
				}
			break;
			//	Right
			case 39:
				if(this.diff(style.right,-32,style.width,"horizontal")){
					var styleCopy = Object.assign({},style);
					styleCopy.right = parseInt(style.right || 0) + -32 + 'px';
					this.setState({style:{...styleCopy},txt:"Right",});
				}
			break; 
		  }
		 
	}
	clear(){
		var {trashStyle} = this.state;
		var trashCopy = Object.assign({},trashStyle);
		var nextBottom = Math.floor(Math.random()*document.body.clientHeight)-160;
		var nextRight  = Math.floor(Math.random()*document.body.clientWidth)-160;
		trashCopy.bottom = nextBottom > 0 ? nextBottom : 0;
		trashCopy.right  = nextRight  > 0 ? nextRight  : 0;
		this.setState({txt:"Clear!",trashStyle:trashCopy});
	}
	componentDidMount() {
		setTimeout(()=>document.addEventListener("keydown", this.move.bind(this)),4000);
		//setTimeout(()=>window.addEventListener("keydown", this.move),4000);
	}
	componentDidUpdate(nextProps, nextState) {
		var vlocation = parseInt(this.state.trashStyle.right)- parseInt(this.state.style.right);
		var hlocation = parseInt(this.state.trashStyle.bottom)- parseInt(this.state.style.bottom);
		if( vlocation  <= 160 &&
			vlocation  >= -32 && 
			hlocation  <= 160 &&
			hlocation  >= -32    ) this.clear();
	}

	render(){
		var spaceStyle={...this.state.style,...style.space};
		return (
			<div style={style.container}>
				<div style={style.dialog}>
					{this.state.dialogTxt}
				</div>
				<Space style     = {spaceStyle} 
					   txt	     = {this.state.txt} 
					   onKeyDown = {(e)=>this.move(e)} />
				<Trash style={this.state.trashStyle}/>
			</div>
		)
	}
};