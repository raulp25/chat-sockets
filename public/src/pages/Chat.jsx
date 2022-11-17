import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { allUsersRoute, host } from '../utils/APIRoutes';
import { ChatContainerView, Contacts, Welcome } from '../components';

import { io } from 'socket.io-client';
import  axios from 'axios';
import styled from 'styled-components';

export const Chat = () => {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [currentChat, setCurrentChat] = useState('');

  const setLocal = async() => {
    setCurrentUser( await JSON.parse(localStorage.getItem('chat-app-user')));
  }

  useEffect(() => {
    if(!localStorage.getItem('chat-app-user')) return navigate('/login');
    setLocal();
    
  }, [])

  const callApi = async() => {

      try {
        if(currentUser){
          const {data} = await axios.get(`${allUsersRoute}${currentUser._id}`);
          setContacts(data);
        }
      } 
      catch (error) {
      }
  }; 
  
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser])
  
  
  useEffect(() => {
    callApi();
  }, [currentUser]);

  const handleChatChange = (chat) => {
      setCurrentChat(chat);
  }

  return (
    <>
      <ChatContainer className="super">
        <div className="container">
          <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
          {
            currentChat === '' ?
            <Welcome currentUser={currentUser}/> :
            
            <ChatContainerView 
                currentChat={currentChat} 
                currentUser={currentUser} 
                socket={socket}
            />
          }
        </div>
      </ChatContainer>
    </>
  )
}


const ChatContainer = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
margin-top: 15px;
  @media ( min-width: 1100px ){
    margin-top: 35px;
  }

.container {
  box-shadow: 0px 0px 15px 3px rgb(0 0 0 / 35%);
  border-radius: 20px;
  height: 90vh;
  width: 95vw;
  background-color: rgb(2,48,71);
  display: grid;
  grid-template-columns: 30% 70%;  
    @media (min-width: 720px) {
      height: 85vh;
      width: 75vw;
      grid-template-columns:25% 75%;
      }
    @media (min-width: 1400px) {
      height: 85vh;
      width: 55vw;
      grid-template-columns: 25% 75%;
      }
}
`;