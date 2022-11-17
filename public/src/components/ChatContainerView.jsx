import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllMessageRoute, sendMessageRoute } from '../utils/APIRoutes';
import { logoutFirebase } from '../Auth/firebase/providers';
import { ChatInput } from './ChatInput';
import { Logout } from './Logout';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components';


export const ChatContainerView = ({currentChat, currentUser, socket}) => {

  const [messages, setMessages] = useState([]);
  const [arrivalMessasge, setArrivalMessasge] = useState('');
  const scrollRef = useRef();
  const navigate = useNavigate();

  const handleClick = async() => {
    localStorage.clear();
    navigate('/login');
    logoutFirebase();
}

  useEffect(() => {
    const fetchCurrentChatMessages = async() => {
      if(currentChat){
  
        const response = await axios.post(getAllMessageRoute, {
          from: currentUser._id,
          to: currentChat._id,
        });
        setMessages(response.data);
      }
    }

    fetchCurrentChatMessages();

  }, [currentChat])
  
  const handleSendMsg = async( msg ) => {
   const data = await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message:msg,
    })

    const msgs = [...messages];
    msgs.push({fromSelf:true, message: msg});
    setMessages(msgs);
  }

  useEffect(() => {
    if(socket.current) {
      socket.current.on("msg-recieved", (msg) => {
        setArrivalMessasge({fromSelf: false, message: msg});
      })
    }
  }, []);

  useEffect(() => {
    arrivalMessasge && setMessages((prev) => [...prev, arrivalMessasge]);
  }, [arrivalMessasge]);

  useEffect(() => {
    
    scrollRef.current?.scrollIntoView({behaviour: 'smooth'});
  }, [messages]);

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          <div className="avatar">

          </div>
          <div className="username">
            <h3>{ currentChat.username }</h3>
          </div>
        </div>

          <div className='logout' onClick={ handleClick }>
              <p>Logout</p>
              <Logout/>
          </div>
      </div>

      {/* <Messages/> */}
      <div className="chat-messages">
        {
          messages.map((message, idx) => {
            return (
              <div ref={scrollRef} key={ uuidv4() }>
                  <div className={`message ${message.fromSelf ? 'sended' : 'recieved'}`}>
                      <div className="content">
                          <p>
                            {message.message}
                          </p>
                      </div>
                  </div>
              </div>
            )
          })
        }
      </div>
      <ChatInput handleSendMsg={ handleSendMsg } />
    </Container>
  )
}


const Container = styled.div`
display: grid;
grid-template-rows: 1fr 9fr 1fr;
overflow: hidden;
border-radius: 20px;
border-top-left-radius: unset;
border-bottom-left-radius: unset;
  @media (min-width: 720px) {
      grid-template-rows: 10% 77% 13%;
    }
.chat-header{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1rem;
  background-color: #5689d7df;
    @media (min-width: 720px) {
        padding: 0 2rem;            
    }
    button{
      
        @media (max-width: 720px) {
          width: 25px;
          height: 25px;
          padding: 3px 3px;
          border-radius: 5px;
        }
    }
    .user-details{
      display: flex;
      align-items: center;
      gap:1rem;
      .avatar{

      }
  }
  .username{
    h3{
      color: white;
      font-family: ach-regular;
      font-size: 12px;
        @media (min-width: 720px) {
            font-size: 17px;
        }
        @media (min-width: 960px) {
            font-size: unset;
        }
    }
  }
  .logout{
    display: flex;
    align-items: center;
    padding: 0;
    margin: 0;
    cursor: pointer;
    border-radius: 5px;
    transition: all .2s ease;
    @media ( min-width: 720px ){
      gap: 10px;
      padding: 10px 10px;
    }
    &:hover{
    background-color: #6098eadf;
    }

    p{
      font-size: 11px;
      color: white;
      font-family: montserrat-regular;
        @media ( min-width: 720px ){
          font-size: 15px;  
        }
    }
  }

}

.chat-messages{
  padding: 0 .3rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 5px;
    @media (min-width: 720px) {
            padding: 1rem 2rem;
    }
    overflow: auto;&::-webkit-scrollbar{
      width: 0.15rem;
      @media (min-width: 720px) {
           width: 0.3rem;
      }
      &-thumb{
      background-color: #8dda20fc;
      border-radius: 2rem;
    }
  }
  .message {
    font-family: elianto-regular;
    display: flex;
    align-items: center;
    .content{
      line-height: 15px;
      max-width: 80%;
      overflow-wrap: break-word;
      padding: 2px 10px;
      font-size: 11.5px;
      border-radius: 5px;
      @media (min-width: 720px) {
            line-height: 25px;
            border-radius: 10px;
            max-width: 50%;
            padding: .3rem 1rem;
            font-size: 14px;
        }
    }
  }
  .sended{
    justify-content: flex-end;
    .content{
      color: #ffffff;
      background-color: #6c888e;
    }
  }
  .recieved{
    justify-content: flex-start;
    .content{
      color: black;

      background-color: #f8f8f8;;
    }
  }
}
`;

