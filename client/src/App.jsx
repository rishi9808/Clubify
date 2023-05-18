import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'
import CreateClub from './pages/CreateClub.jsx'

function App() {
  return (
  <div className="App">
      <BrowserRouter>
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
