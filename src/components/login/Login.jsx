import React, { useEffect, useState } from 'react'
import "./Login.css"
import eyeOpen from "../../assets/icons/eyeOpen.svg"
import eyeClose from "../../assets/icons/eyeClose.svg"
import { Link } from 'react-router-dom'
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

function Login() {
  const [hidePassword, setHidePassword] = useState(false)
  const [password, setPassword] = useState("")
  const [username, setUsername] = useState("")
  useEffect(() => {
    if(localStorage.getItem("todo2") !== null) {
        setUsername(JSON.parse(localStorage.getItem("todo2")).username)
        setPassword(JSON.parse(localStorage.getItem("todo2")).password)
    }
  }, [])

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      username: username,
      password: password
    }
    await axios.post(`${process.env.REACT_APP_API_URL}login`, userData)
      .then((res) => {
          localStorage.setItem("user", JSON.stringify(userData))
          toast.success("Your Login was successfully")
          window.location.href = "../"
      })
      .catch((err) => {
        console.clear()
        toast.error("Your login was rejected please try again with correct username and password!")
      })
    
  }
  
  return (
    <>
      <div className="container h-screen flex justify-center items-center mx-auto">
        <Toaster position="top-right"/>
        <div className="box p-2 h-min rounded-lg border-2 border-zinc-900 w-[95%] md:w-96">
          <h2 className='font-semibold text-2xl uppercase text-center mb-6 p-3'>Login</h2>
          <form className='flex flex-col gap-3' onSubmit={handleLoginSubmit}>
            <input type="text" id='username' placeholder='Username' required defaultValue={username} onChange={(e) => setUsername(e.target.value)} />
            <div className='relative'>
              <input type={hidePassword ? "text" : "password"} id='password' placeholder='Password' required defaultValue={password} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="showPassword" className='hidepsw' onClick={() => setHidePassword(!hidePassword)}>
                {
                  !hidePassword ? <img src={eyeClose} alt="eyeclose" /> : <img src={eyeOpen} alt="eyeopen" />
                }
              </label> 
            </div>
            <input type="submit" value="login" />
            <Link to="/register" className='p-2 text-center'>I don't have account <span className='font-semibold'>Register</span></Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login