import React, { Component } from 'react'
import { Container,Input, Button } from '../../component'
import { ReactComponent as User } from '../../constant/user.svg'
import { ReactComponent as ErrSvg } from '../../constant/error.svg'
import styled from 'styled-components'
const colorConfig = {
    focus:`#fbffe5`,
    focusSec:`#feffc5`,
    error : `#ffd8d8`,
    errSrc : `#a91f1f`,
    normal : `gray`,
    fontColor:`white`
}
const StyledInput = props =><Input {...props} color={colorConfig}/>;

const FormContainer = styled.div`
   padding:20px;
   width:270px;
`
const StyledButton = styled(Button)`
    width:auto;
    font-size: 0.8em;
	margin: 0.2em;
	padding: 0.25em 1em;
`
const ButtonContainer = styled.div`
    display:flex;
    margin-top:50px;
    justify-content:flex-end;
`
export default class Games extends Component {
    constructor(props){
        super(props);
        this.state={
            Account:{
                value:"",
                valid:"",
            },
           
            Password:{
            },
        }
        this.onSubmit= this.onSubmit.bind(this);
        this.onChange= this.onChange.bind(this);

    }
    onSubmit(event){
        event.preventDefault();
        let message='';
        const {Account,Password}=this.state;
        Account.valid && Password.valid
            ? Object.keys(this.state).forEach(
                value => {message+=`${value}:${this.state[value].value}\n`})
            : message=`error account or password is invalid`
        alert(`${message}`)
    }
    onChange(event){
        const {id,value}= event.target; 
        const valid = event.target.checkValidity();
        this.setState({ [id]: {value:value ,valid:valid}})
    }
    render() {
        return (
            <Container>
                <FormContainer>
                    <StyledInput  
                            icon={User} 
                            validation 
                            type="email" 
                            label="Account" 
                            valid={this.state.Account.valid}
                            value={this.state.Account.value}
                            onChange={this.onChange}/>
                    <p/>
                    <StyledInput  
                            type="email"
                            label="Password" 
                            valid={this.state.Password.valid}
                            value={this.state.Password.value}
                            onChange={this.onChange}/>
                    <ButtonContainer>
                        <StyledButton onClick={this.onSubmit}>Login</StyledButton>
                    </ButtonContainer>
                </FormContainer>    
                            
            </Container>
        )
    }
}
