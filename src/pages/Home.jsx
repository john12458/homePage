import React from 'react';
import '../App.css';
import {Container,Button} from "../component";
import styled from 'styled-components'
import Myprofile from '../assets/myAvatar.svg'
import { ReactComponent as GithubLogo } from '../assets/github-logo.svg';
import { ReactComponent as PhotoSVG } from '../assets/photography.svg';

const CircleImg = styled.div`
 background:url(${Myprofile});
 background-size:contain;
 width:30vh;
 height:30vh;
 border-radius:50%;
 display:flex;
 flex-direction:column;
 justify-content:center;
 align-items:center;
`;
const IconsSpan = styled.span`
  svg{
    width:35px;
    height:35px;
    margin:8px;
    padding:3px;
    background:white;
    border-radius:50%;
    object-fit:contain;
  }
`
const Destrbution = styled.div`
  width:60vw;
  p{
    margin:5vh;
  }
`

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (
        <Container>
            <CircleImg />
            <h3 type="name">John</h3>
            <IconsSpan>
               <a href="https://github.com/john12458">
                <GithubLogo />
               </a>
               <a href="https://photography.johnet.website">
                <PhotoSVG />
              </a>
            </IconsSpan>
            <Destrbution>
              <p>Welcome to my website. </p>
              <p>I am a student and junior programmer.</p>
              <p>The website is still in development</p>
            </Destrbution>
        </Container>
    );
  }
}


