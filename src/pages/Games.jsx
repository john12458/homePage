import React, { Component } from 'react'
import { Container,Input, Button } from '../component'
import { ReactComponent as User } from '../constant/user.svg'
import { ReactComponent as ErrSvg } from '../constant/error.svg'
import styled from 'styled-components'
const colorConfig = {
    focus:`#fbffe5`,
    focusSec:`#feffc5`,
    error : `#fda1a1`,
    errSrc : `#a91f1f`,
    normal : `gray`,
    fontColor:`white`
  }
const FormContainer = styled.div`
   padding:20px;
   width:270px;

`
const StyledButton = styled(Button)`
    width:auto;
    font-size: 0.70em;
	margin: 0.2em;
	padding: 0.25em 1em;
`
const ButtonContainer = styled.div`
    display:flex;
    justify-content:flex-end;
`
export default class Games extends Component {
    render() {
        return (
            <Container>
                <FormContainer>
                    <Input color={colorConfig} type="txt" label="Account" icon={User}/>
                    <p/>
                    <Input validation type="email" label="Password" icon={ErrSvg} />
                    <p style={{height:"1em;"}}/>
                    <ButtonContainer>
                        <StyledButton>Log in</StyledButton>
                    </ButtonContainer>
                </FormContainer>    
                            
            </Container>
        )
    }
}
