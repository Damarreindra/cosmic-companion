import { Routes, Route } from "react-router"
import Landing from "./pages/Landing"
import Login from "./pages/Login"
import Home from "./pages/Home"
import Journaling from "./pages/Journaling"
import JournalDetail from "./pages/JournalDetail"
import JournalEdit from "./pages/JournalEdit"

function App() {


  return (
    <>

    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/home" element={<Home/>}/>
      <Route path="/journaling" element={<Journaling/>}/>
      <Route path="/journaling/:id" element={<JournalDetail/>}/>
      <Route path="/journaling/:id/edit" element={<JournalEdit/>}/>

    </Routes>
   
    </>
  )
}

export default App
