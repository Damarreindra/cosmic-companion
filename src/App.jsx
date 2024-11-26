import { Routes, Route } from "react-router"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Journaling from "./pages/Journaling"

function App() {


  return (
    <>

    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/journaling" element={<Journaling/>}/>

    </Routes>
   
    </>
  )
}

export default App
