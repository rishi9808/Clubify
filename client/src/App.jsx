import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './pages/Register.jsx'
import Login from './pages/Login.jsx'

function App() {
  return (
  <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/register" exact element={<Register />} />
          <Route path="/login" exact element={<Login />} />
        </Routes>
      </BrowserRouter>
  </div>
  )
}

export default App
