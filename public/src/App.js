import { HashRouter, Routes, Route} from 'react-router-dom'
import { Chat, Login, Register } from './pages'

export const App = () => {
  return (
  
      <HashRouter>
          <Routes>
            <Route path="/register" element={ <Register />}/>
            <Route path="/login" element={ <Login />}/>
            <Route path="/" element={ <Chat />}/>
          </Routes>
      </HashRouter>
      
    
)}
