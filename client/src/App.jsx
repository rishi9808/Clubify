import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import fetcher from './utils/fetcher.js'
import {login , logout} from "./state"
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import CreateClub from './pages/CreateClub.jsx'
import Navbar from './components/Navbar.jsx'

function App() {

  const dispatch = useDispatch()

  // Check if token in localStorage is valid and return user data

  const verifyToken = async(token) => {
    const res = await fetcher("api/user/verifyToken", {
      Headers: {
        Authorization: token,
      },
    })
    const { user} = await res.json()
    dispatch(login({user , token}))
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      verifyToken(token)
    } else {
      dispatch(logout())  // when page loads show the user else log him out
    }
  }, [])


  return (
  <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/club" exact element={<CreateClub />} />
        </Routes>
      </BrowserRouter>
  </div>
  )
}

export default App
