import { useEffect, useState } from 'react';
import Logo from '../assets/socket-io.svg';
import styled from 'styled-components';

export const Contacts = ({ contacts, currentUser, changeChat }) => {
    const [currentUserName, setCurrentUserName] = useState('');
    const [currentSelected, setCurrentSelected] = useState('');

    useEffect(() => {
      if(currentUser){
        setCurrentUserName(currentUser.username);
      }
    }, [currentUser])

    const changeCurrentChat = ( index, contact ) => {
        setCurrentSelected(index);
        changeChat(contact);
    }

  return (
    <>
      {currentUserName &&  (
              <Container>
                  <div className='brand'>
                      <img src={Logo} alt="logo" />
                      <h3>Socket Io</h3>
                  </div>
                  <div className='contacts'>
                    {contacts.map((contact,index) => {
                      return (
                      <div 
                        className={`contact ${index === currentSelected ? 'selected' : ''}`
                        } key={`${index}contact${index}`}
                        onClick={() => changeCurrentChat(index,contact)}
                        >
                            <div className="avatar">
                                <div className='avatar-container'></div>
                            </div>

                            <div className="username">
                                <h3>{contact.username}</h3>
                            </div>
                      </div>)
                    })}
                  </div>

                  <div className="current-user">
                      <div className="avatar">
                          <div className='avatar-container'></div>
                      </div>
                      <div className="username">
                          <h2>{currentUserName}</h2>
                      </div>
                  </div>
              </Container>
      )}
    </>

  )
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #f5bd55;
  border-radius: 10px;
  border-top-right-radius: unset;
  border-bottom-right-radius: unset;
  .brand {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 1px;
        @media (min-width: 720px) {
          gap: 5px;
             
        }
        @media (min-width: 1400px) {
          gap: 5px;
            
        }
        @media (min-width: 1800px) {
          gap: 5px;
             
        }

    img {
      height: 1.5rem;
      width: 1.5rem;
      
        @media (min-width: 720px) {
          gap: 1rem;
            height: 2rem;
            width: 2rem; 
        }
        @media (min-width: 1400px) {
          gap: 1rem;
            height: 3rem;
            width: 3rem; 
        }
        @media (min-width: 1800px) {
          gap: 1rem;
            height: 3rem;
            width: 3rem; 
        }
    }
    
    h3 {
      color: black;
      text-transform: uppercase;
      font-family:  elianto-regular;
      font-size: 12px;
      @media (min-width: 720px) {
        font-size: 20px;
          
      }
      @media (min-width: 1400px) {
        font-size: 25px;
          
      }
      @media (min-width: 1800px) {
        font-size: 30px;
          
      }
      
    }
  }
  .contacts {
    display: flex;
    flex-direction: column;
    overflow: auto;
    gap: 0.5rem;
    width: 100%;
      &::-webkit-scrollbar{
      width: 0.15rem;
      @media (min-width: 720px) {
           width: 3px;
      }
      &-thumb{
      
      background-color: #da5520fa;
      border-radius: 1rem;
      
    }
    }
    .contact {
      background-color: transparent;
      min-height: 2.5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.2rem;
      padding: 0.4rem;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      transition: 0.2s ease;
      @media (min-width: 720px) {
          min-height: 5rem;
        }
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          word-wrap: break-word;
          color: #000000;
          font-family: stellar-bold;
          font-size: 15px;
          @media (min-width: 720px) {
            font-size: 18px;
             
          }

          @media (min-width: 1200px) {
            font-size: 20px;
             
          }
          @media (min-width: 1450px) {
            font-size: 23px;
             
          }
        }
      }
    }
    .selected {
      background-color: #fffa6f75;
    }
  }
  .current-user {
    background-color: #8ee69e;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .username {
      padding-left: 3px;
      width: 80%;
      word-wrap: break-word;
      @media (min-width: 720px) {  
        width: 80%;
          }
      @media (min-width: 1100px) {  
        width: 80%;
          }
      @media (min-width: 1400px) {  
        width: 80%;
          }
      @media (min-width: 1800px) {  
        width: 80%;
          }

      h2 {
        color: #000000;
        font-family: stellar-bold;
        font-size: 15px;
          
        @media (min-width: 720px) {
            font-size: 18px;
             
          }

          @media (min-width: 1200px) {
            font-size: 20px;
             
          }
          @media (min-width: 1450px) {
            font-size: 23px;
             
          }
          
      }
    }
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.5rem;
      .username {
        h2 {
          
        }
      }
    }
  }
`;



    
