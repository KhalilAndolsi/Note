import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import User from "./components/user/User"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={<User/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
