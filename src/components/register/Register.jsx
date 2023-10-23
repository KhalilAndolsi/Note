import React, { useEffect, useState } from 'react'
import "./Register.css"
import eyeOpen from "../../assets/icons/eyeOpen.svg"
import eyeClose from "../../assets/icons/eyeClose.svg"
import { Link } from 'react-router-dom'
import axios from "axios";

function Register() {
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
    await axios.post(`${process.env.REACT_APP_API_URL}register`, userData)
      .then((res) => {
          localStorage.setItem("user", JSON.stringify(userData))
          alert("Your Register was successfully")
          window.location.href = "../"
      })
      .catch((err) => {
        console.clear()
        alert("Your Register was rejected please try again with correct username and password!")
      })
    
  }
  
  return (
    <>
      <div className="container h-screen flex justify-center items-center mx-auto">
        <div className="box p-2 h-min rounded-lg border-2 border-zinc-900 w-[95%] md:w-96">
          <h2 className='font-semibold text-2xl uppercase text-center mb-6 p-3'>Register</h2>
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
            <input type="submit" value="register" />
            <Link to="/login" className='p-2 text-center'>Already i have account <span className='font-semibold'>Login</span></Link>
          </form>
        </div>
      </div>
    </>
  )
}

export default Register