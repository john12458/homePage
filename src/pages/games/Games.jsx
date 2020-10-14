import React, { Component } from 'react'
import { Redirect } from "react-router-dom"
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
            isSubmit:false
        }
        this.onSubmit= this.onSubmit.bind(this);
        this.onChange= this.onChange.bind(this);

    }
    onSubmit(event){
        event.preventDefault();
        let message='';
        const {Account,Password}=this.state;
        // Account.valid && Password.valid
        //     ? 
        //     : 
        message=`Although error account or invalid password,you are allowed to the game`
        alert(`${message}`)
        this.setState({isSubmit:true})
    }
    onChange(event){
        let {id,value}= event.target; 
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
                            id="Account"
                            label="Account (email)" 
                            valid={this.state.Account.valid}
                            value={this.state.Account.value}
                            onChange={this.onChange}/>
                    <p/>
                    <p/>
                    <StyledInput  
                            type="password"
                            id="Password"
                            label="Password" 
                            valid={this.state.Password.valid}
                            value={this.state.Password.value}
                            onChange={this.onChange}/>
                    <ButtonContainer>
                        <StyledButton onClick={this.onSubmit}>Login</StyledButton>
                    </ButtonContainer>
                </FormContainer>    
                {this.state.isSubmit && <Redirect to="/pikaBall"/>}
                            
            </Container>
        )
    }
}
