import styled from 'styled-components';
import { BiPowerOff } from 'react-icons/bi';

export const Logout = () => {

  return (
            <Button>
                <BiPowerOff/>
            </Button>
         )
}

const Button = styled.button`
display: flex;
justify-content: center;
align-items: center;
background-color: transparent;
border: none;
cursor: pointer;
color: white;
transition: all .2s ease;
margin: 0;
padding: 0;

svg {
    font-size: 15px;
    color: #fffdfd;
    margin: 0;
    padding: 0;
    @media ( min-width: 720px ){
        font-size: 1.3rem;
    }
}
`;