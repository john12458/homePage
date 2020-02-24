import React from 'react';
import styled ,{keyframes}from 'styled-components';
import {Link} from "react-router-dom";
import { bounceIn } from 'react-animations';
const bounceAnimation = keyframes`${bounceIn}`;
const float ='position: fixed; top:0;'
const  NavBtn = styled.span`
    *{
      color:white;  
      text-decoration:none;   
    }
    
    a{
    }
    a:hover{
      cursor: pointer;
		  animation: 2s ${bounceAnimation};
    }
`;
const  StyledNav= styled.div`
  display:grid;
  grid-template-columns:1fr 2fr;
  width:auto;
  padding:20px;
  ${props=>props.float?float:null}
  @media only screen and (max-width: 768px) {
    grid-template-columns:0fr 1fr;
  }
`;
const RightSide= styled.div`
  display:-moz-grid;
  display:-ms-grid;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  @media only screen and (max-width: 768px) {
    grid-template-columns:0fr repeat(3,1fr);
  }
  
`;
class Nav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {float} = this.props;
    return (
      <StyledNav float={float} >
        <div id="leftSide"></div>
        <RightSide>
          <span></span>
          <NavBtn><Link to="./">Home</Link><hr/></NavBtn>
          <NavBtn><Link to="./games">Games</Link><hr/></NavBtn>
          <NavBtn><Link to="./Components">Components</Link><hr/></NavBtn>
        </RightSide>
      </StyledNav>
    );
  }
}

export default Nav;

