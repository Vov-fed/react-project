import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
// import Home from './components/Home'
// import Signup from './components/Signup'
// import NotFound from './components/NotFound'
// import Login from './components/Login'
import Navbar from './components/Navbar'
// import Logout from './components/Logout'
// import Profile from './components/Profile'
// import AboutPage from './components/About'
// import NewCard from './components/NewCard'
// import EditCard from './components/EditCard'

import { ToastContainer } from "react-toastify";
// import 'react-toastify/dist/ReactToastify.css';
// import EditProfile from './components/EditProfile'
// import Success from './components/Success'
// import Card from './components/Card'
import pathes from './services/allPathes'

function App() {
  return (
<>
<ToastContainer />
    <Router>
        <Navbar />
      <Routes>
        {
          pathes.map(path => (
            <Route key={path.key} path={path.path} element={path.element} />
          ))
        }
      </Routes>
    </Router>
    </>
  )
}
export default App