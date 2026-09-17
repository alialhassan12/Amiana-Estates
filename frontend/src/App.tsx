import { Navigate, Route, Routes } from "react-router-dom"
import Landing from "./pages/Landing"
import { useEffect } from "react"
import Aos from "aos"
import "aos/dist/aos.css"
import Login from "./pages/Login"
import { Toaster } from "./components/ui/toast"
import { useAuth } from "./hooks/useAuth"
import { Loader2 } from "lucide-react"
import AdminDashboard from "./pages/AdminDashboard"

function App() {

  const {data:authUser,isLoading:isCheckingAuth}=useAuth();

  
  useEffect(()=>{
    Aos.init({
      duration: 1000
    });
  },[]);

  if(isCheckingAuth){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader2 className="animate-spin"/>
        <span className="ml-2">Loading...</span>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing/>}/>

        <Route
          path="/login" 
          element={
            authUser?<Navigate to={"/dashboard"}/>:<Login/>
          }
        />

        <Route
          path="/dashboard/*"
          element={
            authUser?<AdminDashboard/>:<Navigate to={"/"}/>
          }
        />
      </Routes>
      
      <Toaster/>
    </>
  )
}

export default App
