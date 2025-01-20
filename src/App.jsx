import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Navbar from './components/Navbar'
import { ToastContainer } from "react-toastify";
import pathes from './services/allPathes'

function App() {
  return (
<>
<ToastContainer />
    <Router>
        <Navbar />
        <Routes>
        {pathes.map(({ key, path, element }) => (
          <Route key={key} path={path} element={element} />
        ))}
      </Routes>
    </Router>
    </>
  )
}
export default App