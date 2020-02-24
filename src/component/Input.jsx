import React from 'react';
import styled, { keyframes,css } from 'styled-components';
import { zoomIn } from 'react-animations';
const zoomInAnimation = keyframes`${zoomIn}`;
const colorConfig = {
  focus:`#87cae4`,
  focusSec:`#11998e`,
  error : `#fda1a1`,
  errSrc : `#a91f1f`,
  normal : `gray`,
  fontColor:`white`
}

const invalidStyle = css`
    &:invalid { 
        ~ span{
          border-bottom-color:${props=>props.color.errSrc};
          svg{
            fill:${props=>props.color.errSrc};
            visibility: visible;
            animation: 0.5s ${zoomInAnimation};
          }
        }
        ~ label{
            color:${props=>props.color.error};
            font-weight:700; 
        }
        border-image: ${props=>`linear-gradient(to right, ${props.color.error},${props.color.errSrc})`};
        border-image-slice: 1;
    }
`
const InputContainer = styled.div`
display:flex;
position: relative;
padding: 15px 0 0;
margin-top: 10px;
width: 100%;

`;
const ImgContainer = styled.span`
    display:flex;
    height:auto;
    align-items:center;
    width:15px;
    border-bottom:2px solid ${props=>props.color.normal};
    
    svg{
        fill:${props=>props.color.normal};
        visibility: ${props=>props.validation?'hidden':'visible'};
        height:auto;
        max-width: -webkit-fill-available;
    }
`
const StyledInput = styled.input`
    font-family: inherit;
    width: 100%;
    border: 0;
    border-bottom: 2px solid ${props=>props.color.normal};
    outline: 0;
    font-size: 1.3rem;
    color: ${props=>props.color.fontColor};
    padding: 7px 0;
    background: transparent;
    transition: border-color 0.2s;
  
    &::placeholder {
      color: transparent;
    }
  
    &:placeholder-shown ~ label {
      font-size: 1.3rem;
      cursor: text;
      top: 20px;
    }
  
    &:focus {
      ~ span{
        border-bottom:3px solid ${props=>props.color.focusSec};
        svg{fill:${props=>props.color.focusSec};}
      }
      ~ label{
        position: absolute;
        top: 0;
        display: block;
        transition: 0.2s;
        font-size: 1rem;
        color: ${props=>props.color.focus};
        font-weight:700;    
      }
      padding-bottom: 6px;  
      font-weight: 700;
      border-width: 3px;
      border-image: ${props=>`linear-gradient(to right, ${props.color.focus},${props.color.focusSec})`};
      border-image-slice: 1;
      
    }
    ${props=>props.validation?invalidStyle:null}
    
`;
const StyledLabel = styled.label`
    position: absolute;
    top: 0;
    display: block;
    transition: 0.2s;
    font-size: 1rem;
    color: ${props=>props.color.normal};
`;


/** props
 * type       :String         type e.g. email,txt
 * svg        :ReactComponent the icon 
 * label      :String         the title name,
 * validation :Boolean        effect when check the format,
*/
export const Input = props => <InputContainer color={props.color || colorConfig}>
    <StyledInput 
        id={props.label} 
        color={props.color || colorConfig} 
        placeholder={props.label} 
        type={props.type || 'text'} 
        validation={props.validation}/>

    <StyledLabel 
      color={props.color || colorConfig} 
      htmlfor={props.label}>
        {props.label}
    </StyledLabel>

    <ImgContainer color={props.color || colorConfig} validation={props.validation}>
      {props.hasOwnProperty('icon') && <props.icon />}
    </ImgContainer>
</InputContainer>
