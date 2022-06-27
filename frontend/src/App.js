import './App.css';
import Mainpage from './components/Mainpage';
import Login from './components/Login';
import AllPackages from './components/AllPackages';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Alert from './components/Alert';
import { useState } from 'react';
import AllTypes from './components/AllTypes';
import FullDescription from './components/FullDescription';

function App() {
  const [alert, setAlert] = useState(null)
  const promptAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  return (
    <>
      <BrowserRouter>
      <Navbar promptAlert={promptAlert}/>
      <Alert alert={alert} />
        <Routes>
          <Route path="/" element={<Mainpage promptAlert={promptAlert}  />} />
          <Route path="/login" element={<Login promptAlert={promptAlert} />} />
          <Route path="/alltypes" element={<AllTypes promptAlert={promptAlert}/>} />
          <Route path="/allpackages" element={<AllPackages promptAlert={promptAlert}/>} />
          <Route path='/viewdetails/:id' element={<FullDescription promptAlert={promptAlert}/>}/>
          <Route path="/signup" element={<Signup  promptAlert={promptAlert} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
