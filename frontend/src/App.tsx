import Home from "./pages/home/Home"
import SignIn from "./pages/sing-in/SignIn"
import SignUp from "./pages/sign-up/SignUp"
import { Navigate, Route, Routes } from "react-router-dom"
import { useAuthContext } from "./context/AuthContext"
import { Toaster } from 'react-hot-toast'

function App() {
  const { authUser } = useAuthContext();
  return (
    <>
      <div className="p-4 h-screen flex items-center justify-center">
        <Routes>
          <Route path="/" element={authUser ? <Home /> : <Navigate to={"/sign-up"} />} />
          <Route path="/sign-in" element={authUser ? <Navigate to={"/"} /> : <SignIn />} />
          <Route path="/sign-up" element={authUser ? <Navigate to={"/"} /> : <SignUp />} />
        </Routes>
        <Toaster />
      </div>
    </>
  )
}

export default App
