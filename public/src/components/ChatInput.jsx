import { useState } from "react";
import styled from 'styled-components';

import EmojiPicker from 'emoji-picker-react'
import { BsEmojiSmileFill } from 'react-icons/bs'

export const ChatInput = ({ handleSendMsg }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [msg, setMsg] = useState('');

    const handleEmojiPickerHideShow = () => {
        setShowEmojiPicker(!showEmojiPicker);
    }

    const handleEmojiClick = (emoji,e) => {
        let message = msg;
        message += emoji.emoji;
        setMsg(message);
    }

    const onInputChange = ({ target: {value} }) => setMsg(value);
    
    const sendChat = (e) => {
        e.preventDefault();
        // console.log(msg)
        const newMsg = msg.trim();
        if(newMsg.length > 0) {
            handleSendMsg(msg);
            setMsg('');
        }
    }


  return (
    <Container>
        <div className="button-container">
            <div className="emoji">
                <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
                {
                    showEmojiPicker && <EmojiPicker width={250} height={350} emojiStyle="apple" onEmojiClick={ handleEmojiClick} />
                }
            </div>
        </div>

        <form className="input-container" onSubmit={ sendChat }>
            <input type="text" placeholder="Write your message..."value={msg}  onChange={onInputChange}/>
            <button className="submit">
                <div className="send-button">Send</div>
            </button>
        </form>
    </Container>
  )
}


const Container = styled.div`
display: flex;
flex-direction: row-reverse;
gap: 10px;
background-color: #568ad7fe;
    @media ( min-width: 720px ){
        background-color: #568ad7;
        display: grid;
        grid-template-columns: 5% 95%;
        align-items: center;
        padding: 0 2rem;
        padding-bottom: 0.3rem;
        
    }

    @media screen and (min-width:720px) and  (max-width:1080px){
        padding: 0. 1rem;
        gap: 1rem;
    }

.button-container{
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    margin-right: 10px;
    position: relative;
    .emoji{
        position: relative;
            
            @media (min-width: 720px) {
                right: unset;
                top: unset;
                        
            }
       
        svg{
            font-size: 1rem;
            color: #ffffff;
            cursor: pointer;
                @media (min-width: 720px) {
                    font-size: 1.5rem; 
                }
        }
        .EmojiPickerReact {
            position: absolute;
            top: -380px;
            left: -225px;
            background-color:#23416c;
            box-shadow: 0 5px 10px #86b9f3;
            border-color: #86b9f3;
                @media (min-width: 720px) {
                    top: -400px;
                    left: 0px;
                    
                }
            
            .epr-emoji-category-label {
                background-color: #2181812a;
                color: white;
                button {
                    filter: contrast(0);
                   
                }
                
            }
 
            .epr-search {
              background-color: #2181812a;
              border-color: #35c4c473;
              &::placeholder{
                color: white;
              }
              
            }
            .epr-preview-emoji-label{
                color: white;
            }
            
            .emoji-group:before {
              background-color: #080420;
            }

        }
    }
}

.input-container{
    width: 100%;
    display: flex;
    align-items: center;
    gap: 2rem;
    border-right: none;
    border-left: none;
    background-color: #5689d7df;
    justify-content: space-between;
        @media (min-width: 720px) {
            justify-content: unset;
                
        }

    input{
        width: 60%;
        background-color: transparent;
        color: white;
        padding-left: 1rem;
        font-size: 12px;
        overflow: hidden;
        height: 100px;
        border: none;

        @media (min-width: 720px) {
            border-top: 2px solid white;
            border-bottom: 2px solid white;
            width: 100%;
            font-size: 1.2rem;
            height: 100%;
            padding : 15px 0;
            }
        
        &::selection{
        }
        &:focus{
            outline: none;
        }
        &::placeholder{
            color: white;
        }
    }
    button{
        padding: 10px 20px;
        border-radius: 3px;
        font-size: 14px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        color: #ffffff;
        border: none;
        border: 2px solid #86cefd;
        font-family: montserrat-regular;
        cursor: pointer;
        @media ( min-width: 720px ){
            font-size: 16px;
        }
            @media screen and (min-width:720px) and  (max-width:1080px){
                padding: 0.3rem 1rem;  
            }
            @media screen and (min-width:120px) and  (max-width:720px){
                padding: 0.2rem .5rem;    
                font-size: 13px;
                margin-right: 3px;
            }

    }

}
`;