import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from '../Auth/hooks/useForm';
import { registerRoute } from '../utils/APIRoutes';
import CatLogo from "../assets/cat.gif"

import axios from 'axios';
import styled from 'styled-components';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  position: 'bottom-right',
  autoClose: 4000,
  pauseOnHover: true,
  theme: 'dark',
}

export const Register = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('chat-app-user')) return navigate('/');
    
  }, []);

  
const formData = {
  username : '',
  email: '',
  password: '',
  confirmPassword: '',
}

  const formValidations = {
    username: [ (value) => value.length >= 3  && value.length <=12 , 'Username min 3 and max 12 characters' ],
    email: [ (value) => value.includes('@') && value.length >= 3 && value.length <= 30 , 'Email required, max 30 characters'],
    password: [ (value) => value.length >=8 && value.length <=16 , 'Password min 8 and max 16 characters' ],
  }
  const { isFormValid, 
          username, usernameValid,
          email, emailValid, 
          password, passwordValid,
          confirmPassword, 
          onInputChange,onResetForm } = useForm(formData, formValidations)
  

// this whole validations and handleSubmit fn could've been separated into its own hook|file but for reading purposes and to avoid confusion among readers between useForm, validations schemas and handleSubmit, they're gonna stay here.
  const showValidationTag = {
    showUsernameInvalid: ((username.length >= 1 && username.length< 3) || username.length > 12),
    showEmailInvalid:  ((email.length >= 1 && email.length< 3) || email.length > 30),
    showPasswordInvalid: ((password.length >= 1 && password.length< 8) || password.length > 16),
    showConfirmPasswordInvalid: passwordValid == null && confirmPassword !== password,
  }

  const handleSubmit = async(event) => {
    try {
      event.preventDefault();
        const validFilter = [usernameValid, emailValid, passwordValid].find(element => element !== null);
       if (validFilter){ toast.error(validFilter, toastOptions); return};
       if (confirmPassword !== password){ toast.error("Passwords don't match", toastOptions); return};
        
      if (isFormValid){
          const { data } = await axios.post(registerRoute, {
            username, 
            email, 
            password
          });

        if(data.status === true) {
          localStorage.setItem('chat-app-user',JSON.stringify(data.user));
          onResetForm();
          navigate('/');
        };
    }
    } 
    catch (error) {
      const { response: { data: { msg } } } = error;
      toast.error(msg, toastOptions);
    }
    
  }

  return (
    <>
        <div className='super-container-register'>
            <FormContainer>
            <LoginHeader className="login-header">
                <h1>Chat App Socket.io</h1>
                <div className="img-container">
                    <img src={CatLogo} className='image-1' alt="cat-logo" />
                </div>
            </LoginHeader>

                <form onSubmit={handleSubmit}>
                    <div className="brand">
                        <h1>Sign Up</h1>
                    </div>

                    <div>
                        <input 
                            type="text" 
                            placeholder='Username' 
                            name='username' 
                            onChange={onInputChange} 
                        />
                        {
                          showValidationTag.showUsernameInvalid && !!usernameValid && <p className='warning-text'>
                            Username 3 - 12 characters.
                          </p>
                        }
                    </div>
                    <div>
                        <input 
                            type="email" 
                            placeholder='Email' 
                            name='email' 
                            onChange={onInputChange} 
                        />
                        {
                           showValidationTag.showEmailInvalid && !!emailValid && <p className='warning-text'>
                              Valid email required.
                            </p>
                        }
                    </div>

                    <div>
                      <input 
                          type="password" 
                          placeholder='Password' 
                          name='password' 
                          onChange={onInputChange} 
                      />
                      {
                       showValidationTag.showPasswordInvalid && !!passwordValid && <p className='warning-text'>
                          Password 8 - 12 characters
                        </p>
                      }
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder='Confirm Password' 
                            name='confirmPassword' 
                            onChange={onInputChange} 
                        />
                        {
                          showValidationTag.showConfirmPasswordInvalid && <p className='warning-text'>
                              Password's don't match.
                            </p>
                        }
                    </div>

                    <button type='submit'>Sign Up</button>
                    <footer>
                        <span>
                            Already have an account ? <Link to={"/login"}>Login</Link>
                        </span>
                    </footer>
                </form>
            </FormContainer>
      
            <ToastContainer className='toastBody'/>
         </div>
    </>
  )
}



const FormContainer = styled.div`
display: flex;
flex-direction: column-reverse;
gap: 1rem;
align-items: center;
padding-top: 50px;
font-family: montserrat-regular;

  @media ( min-width: 720px ){
    gap: 3rem;
    flex-direction: column;
  }

  @media ( min-width: 900px ){
    gap: 3rem;  
  }
  @media ( min-width: 1100px ){
    padding: 0;
    gap: 3rem;
    margin: 0;
  }

  @media ( min-width: 1600px ){
    gap: 5rem;
  }

.brand {
    display: flex;
    align-items: center;
    justify-content: center;
    h1 {
        color: black;
        text-transform: uppercase;
        font-size: 16px;
        @media ( min-width: 720px ){
          font-size: 16px;
        }
    } 
}

form {
   
    box-shadow: 0px 0px 15px 3px rgb(0 0 0 / 15%);
    display: flex;
    width: 80%;
    flex-direction: column;
    gap: 1.3rem;
    border: 3px solid #f9f9f9;
    border-radius: 7px;
    padding: 20px;
    background-color: white;
      @media ( min-width: 540px ){

      width: 400px;
      }
      @media ( min-width: 720px ){
        
        gap:2px;
      }
      @media ( min-width: 900px ){
        width: 450px;
        gap:2px;
      }
      @media ( min-width: 1100px ){
        gap:5px;
      }

    
    input {
        background-color: transparent;
        padding: 10px;
        border: 1px solid #ffffff;
        border-radius: 2px;
        color: black;
        width: 100%;
        font-size: 14px;
        border-bottom: 1.5px solid #B3B3B3;
        @media ( min-width: 720px ){
          background-color: transparent;
          padding: 1rem;
          border: 1px solid #ffffff;
          border-radius: 2px;
            width: 100%;
            font-size: 12px;
            border-bottom: 1.5px solid #B3B3B3;
            
          }
        &:focus{
            border:2px solid #a9653d;
            outline: none;  
        }
        &::placeholder{
            color: #B3B3B3;
        }
    }
    .warning-text{
      font-size: 11px;
      font-family: montserrat-regular;
        padding: 0;
        margin: 0;
        margin-top: 3px;
        color: rgb(106,115,124);
        padding-left: 15px;
    }
    button {
        background-color: rgb(38,144,217);
        color: white;
        padding: 5px;
        border: none;
        cursor: pointer;
        border-radius: 20px;
        font-size: 15px;
        text-transform: uppercase;
        transition: 0.2s ease;
        
        @media ( min-width: 720px ){
          background-color: #4ca2ca;
          color: white;
          padding: 7px;
          border: none;
          cursor: pointer;
          border-radius: 5px;
          font-size: 15px;
          transition: 0.2s ease;
          margin-top: 10px;
        }
        
        @media ( min-width: 1600px ){
          padding: 10px;
        }
        &:hover{
            background-color: #6da8ec;
        }
    }

    footer{
      display: flex;
      justify-content: center;
      @media ( min-width: 720px ){
       padding-top : 10px;
      }
      span{
          display: flex;
          gap: 10px;
          color: black;
          font-size: 14px;
          @media ( min-width: 720px ){
            font-size: 15px;
            gap: 10px;
          }
          a{
              color: #0db1e8;
              text-decoration: none;
              text-transform: none;
              @media ( min-width: 720px ){
                
              }
          }
      
       }
    }
}

`;

const LoginHeader = styled.div`
padding-top: 50px;
width: 80%;
font-size: 12px;
display: flex;
flex-direction: row-reverse;
justify-content: flex-end;
color: white;
gap: 40px;

  @media ( min-width: 540px ){
    width: 400px;
  }
  @media ( min-width: 900px ){
    width: 450px;
  }
  @media ( min-width: 1100px ){
    width: 500px;
    padding-top: 0;
    
  }
  @media ( min-width: 1600px ){
    width: 500px;
    padding-top: 70px;
    
  }

  h1{
  width: 40%;
  text-align: center;
  font-family: nordic-regular;
  border-bottom: 2px solid white;
  height: fit-content;
  }

  .img-container{
    margin-top: 40px;
    margin: 0;
    padding: 0;
    .image-1{width: 100px; height: 100px; border:3px solid white;}
  }
`;

