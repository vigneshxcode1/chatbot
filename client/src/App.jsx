
import './App.css'
import Chatbot from './Chatbot.jsx'
import {BrowserRouter,Routes,Route} from "react-router-dom"
function App() {
  
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path='/' element={<Chatbot/>}/>
 
      </Routes>
    </BrowserRouter>
    
    </>
  )
}

export default App
