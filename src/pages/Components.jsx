import React from 'react';
import '../App.css';
import Button from '../component/Button'
import styled from 'styled-components';
import {Input} from '../component/Input';
import {Link} from "react-router-dom";
import { ReactComponent as Return } from '../constant/return.svg'
import { ReactComponent as Pic } from '../constant/user.svg'
const Board = styled.div`
  background-color:black;
  min-height: 100vh;
  color:white;
  a{
    svg{fill:white;}
  }
`;
const Block = styled.div`
  padding:20px;
  width:fit-content;
  h2{
    padding:0;
    margin:0;
  }
`;
export default class Components extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
        <Board>
          <Link to="/" className="clickable" style={{position:"fixed",width:"20px",padding:"10px"}}><Return className="clickable"/></Link> 
          <span style={{opacity:"0%"}}>0</span>
            <Block>
              <h2>Button</h2>
              <hr/>
              <Button color="black">Normal</Button>
              <Button color="white" primary>Primary</Button>
            </Block>
            <Block>
              <h2>Form</h2>
              <hr/>
              <Input type="email" label="Account" icon={Pic} validation/>
              <Input type="password" label="Password" />
            </Block>
              
        </Board>
    );
  }
}


