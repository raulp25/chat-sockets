import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../Auth/hooks/useLogin'
import FirebaseLogo from "../assets/firebase.svg";
import MongoLogo5 from "../assets/mongo5.svg";
import NodeLogo from "../assets/node.svg";
import ReactLogo from "../assets/react.png";
import SocketLogo from "../assets/socket.svg";

import styled from 'styled-components';
import { AiFillGoogleCircle } from 'react-icons/ai'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Login = () => {
  const navigate = useNavigate();
  const { login, googleSignIn } = useLogin();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {

    if (localStorage.getItem('chat-app-user')) return navigate('/');

  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    const { target: { name, value } } = e;
    setValues({ ...values, [name]: value });
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    login(e, values);
  }

  const handleGoogleSignIn = async (e) => {
    e.preventDefault();
    googleSignIn(e);
  }
  return (
    <>
      <div className='super-container-login'>

        <LoginHeader className="login-header">
          <h1>Chat App Socket.io</h1>
          <div className="img-container">
            <img src={SocketLogo}   className='image-1' alt="socket-logo" />
            <img src={FirebaseLogo} className='image-3' alt="firebase-logo" />
            <img src={MongoLogo5}   className='image-5' alt="mongo-logo" />
            <img src={NodeLogo}     className='image-3' alt="node-logo" />
            <img src={ReactLogo}    className='image-4' alt="react-logo" />
          </div>
        </LoginHeader>

        <FormContainer>
          <form onSubmit={handleLogin}>
            <div className="brand">
              <h1>LOGIN</h1>
            </div>

            <input
              type="text"
              placeholder='Username'
              name='username'
              onChange={handleChange}
              min='3'
              value={values.username}
            />
            <input
              type="password"
              placeholder='Password'
              name='password'
              onChange={handleChange}
              value={values.password}
            />

            <div className='button-container'>
              <button type='submit'>Login</button>
              <button className='google-button' onClick={handleGoogleSignIn}><AiFillGoogleCircle className='google-logo' />Google Sign in</button>
            </div>

            <footer>
              <span>
                Don't have an account? <Link to={"/register"}>SignUp</Link>
              </span>
            </footer>
          </form>
        </FormContainer>

        <ToastContainer className='toastBody' />
      </div>
    </>
  )
}

const LoginHeader = styled.div`
padding-top: 100px;
font-size: 12px;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
color: white;
gap: 10px;
  h1{
    width: 70%;
    text-align: center;
    font-family: nordic-regular;
  }

  .img-container{
    margin-top: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 5px;
    margin: 0;
    padding: 0;
    border-bottom: 1px solid white;
    .image-1 {width: 105px;}
    .image-2 {width: 105px;}
    .image-3 {width: 37px;}
    .image-5 {width: 102px; }
    .image-4 {
      margin-left: 7px;
      width: 37px; 
      @media (prefers-reduced-motion: no-preference) {
          -webkit-animation: animate 20s linear infinite;
          -moz-animation: animate 20s linear infinite;
          -o-animation: animate 20s linear infinite;
          animation: animate 20s linear infinite;
      }
      @-webkit-keyframes animate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @-moz-keyframes animate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @-o-keyframes animate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
      @keyframes animate {
        from {
          transform: rotate(0deg);
        }
        to {
          transform: rotate(360deg);
        }
      }
  
    }
}
`;

const FormContainer = styled.div`
display: flex;
flex-direction: column-reverse;
gap: 1rem;
align-items: center;
padding-top: 50px;
font-family: montserrat-regular;

  @media ( min-width: 720px ){
    gap: 5rem;
    flex-direction: column;
  }

  @media ( min-width: 900px ){
    gap: 5rem;
  }
  @media ( min-width: 1100px ){
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
    gap: 1.5rem;
    border: 3px solid #f9f9f9;
    border-radius: 7px;
    padding: 25px 20px;
    background-color: white;
      @media ( min-width: 540px ){
      width: 400px;
      }
      @media ( min-width: 900px ){
          width: 450px;
      }
      @media ( min-width: 1100px ){
        width: 500px;
      }
      
      @media ( min-width: 1600px ){
        width: 500px;
      }

    input {
        background-color: transparent;
        padding: 10px;
        border: none;
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

    .button-container{
      display: flex;
      flex-direction: column;
      justify-content: center;
      gap: 10px;
      @media ( min-width: 768px ){
        display: flex;
      }
      .google-button{
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 3px;
        padding: 2px;
        @media ( min-width: 720px ){
          padding: 4px
        }
        @media ( min-width: 1600px ){
          padding: 6px
        }
      }
      .google-logo{
        height: 25px;
        width: 25px;
        color: #fffffff6;
      }
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
          text-transform: uppercase;
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


