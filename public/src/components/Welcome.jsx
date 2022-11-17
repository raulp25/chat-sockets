import styled from 'styled-components'

export const Welcome = ({ currentUser }) => {
  return (
            <Container>
                <h1>
                    Start a Chat <span>{currentUser.username}</span>
                </h1>
                <h3>Please Select a Chat To Start Messaging</h3>
            </Container>
          )
}

const Container = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
color: white;
font-size: 10px;
text-align: center;
word-wrap: break-word;
  img {
      height: 20rem;
  }
  span{
      color: #44e8ee
  }
`;