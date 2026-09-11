import { Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import { useEffect } from "react"
import Aos from "aos"
import "aos/dist/aos.css"

function App() {

  useEffect(()=>{
    Aos.init({
      duration: 1000
    });
  },[]);

  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
    </Routes>
  )
}

export default App
