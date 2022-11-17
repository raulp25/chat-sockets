import { useNavigate } from 'react-router-dom';
import { loginRoute, registerRoute } from '../../utils/APIRoutes';

import axios from 'axios';
import { signInWithGoogle } from '../firebase/providers';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const toastOptions = {
  position: 'bottom-right',
  autoClose: 8000,
  pauseOnHover: true,
  theme: 'dark',
}

export const useLogin = () => {

  const navigate = useNavigate();

    const login = async(e, values) => {
        e.preventDefault();
        const { username, password } = values;
        try {
            if (handelValidation(values)){
              const { data } = await axios.post(loginRoute, {
                  username,  
                  password
              });
              
              if(data.status === true) {
                localStorage.setItem('chat-app-user',JSON.stringify(data.user));
                navigate('/');
              };
            }

        } 
        catch (error) {
          const msg= 'error in login'
          toast.error(msg, toastOptions);
        }
      }

    const handelValidation = (values) => {
        const { username, password } = values;

        if (username.length === '') {toast.error('Email and Password required', toastOptions); return false;};
        if (password === '') {toast.error('Email and Password required', toastOptions); return false;};

        return true;
      }


    const checkRegisterStatus = async(username, email, password) => {

        try {
          const { data } = await axios.post(registerRoute, {
            username, 
            email, 
            password
          });

          if(data.status === true) {
            localStorage.setItem('chat-app-user',JSON.stringify(data.user));
            navigate('/');

            return true;
          };
          return false;
        } 
        catch (error) {
          
        }
      
      }

    const googleSignIn = async(e) => {
        e.preventDefault();
        try {
          const {displayName, email, uid } = await signInWithGoogle();
          if(displayName) {
            const username = displayName.length > 12 ? displayName.slice(0,13) : displayName;
            const password = uid.length > 16 ? uid.slice(0, 17) : uid;
            const result = await checkRegisterStatus(username, email, password);
            
            if(!result) { 
              const { data } = await axios.post(loginRoute, {
                username,  
                password,
            });
            if(data.status === true) {
              localStorage.setItem('chat-app-user',JSON.stringify(data.user));
              navigate('/');
              return;
            } 
            } 
          }

        } 
        catch (error) {
          const usrIsRegisteredError = 'User already registered';
            toast.error(usrIsRegisteredError, toastOptions);
        }
          
      }

  return {
    login,
    googleSignIn,
  }

}







