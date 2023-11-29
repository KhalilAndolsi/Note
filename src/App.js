import React from 'react';
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Login from "./components/login/Login"
import Register from "./components/register/Register"
import User from "./components/user/User"

function App() {
  return (
    <BrowserRouter basename='/'>
      <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/' element={<User/>} />
      </Routes>
      <h1 className='mt-5 p-2 text-center font-semibold'>this app created by <a href='https://github.com/KhalilAndolsi' className=' underline'>khalil andolsi</a> with mush ♥</h1>
    </BrowserRouter>
  );
}

export default App;
