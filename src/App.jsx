import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Home from './components/Home'
import Signup from './components/Signup'
import NotFound from './components/NotFound'
import Login from './components/Login'
import Navbar from './components/Navbar'
import Logout from './components/Logout'
import Profile from './components/Profile'
import AboutPage from './components/About'
import NewCard from './components/NewCard'
import EditCard from './components/EditCard'

import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import EditProfile from './components/EditProfile'
import Success from './components/Success'

function App() {
  return (
<>
<ToastContainer />
    <Router>
        <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path='/profile' element={<Profile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/newCard" element={<NewCard />} />
        <Route path="/editCard" element={<EditCard />} />
        <Route path="*" element={<NotFound />} />
        <Route path= "/editProfile" element={<EditProfile />} />
        <Route path = "/success:login" element={<Success />} />
        <Route path = "/success:register" element={<Success />} />
        <Route path = "/success:editProfile" element={<Success />} />
        <Route path = "/success:editCard" element={<Success />} />
        <Route path = "/success:card" element={<Success />} />
      </Routes>
    </Router>
    </>
  )
}

export default App