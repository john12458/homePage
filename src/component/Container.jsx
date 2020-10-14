import styled, { keyframes }  from "styled-components";
import {fadeIn} from 'react-animations';
const fadeInAnimation = keyframes`${fadeIn}`;
export default styled.div`
  width:auto;
  height:100%;
  text-align:center;
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  padding-top:2vh;
  animation: 1s ${fadeInAnimation};
`