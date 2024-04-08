import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function LoginPage() {

  const { loginUser } = useContext(AuthContext)
  return (
    <div>
    <form onSubmit={loginUser} action="">
        <input type="text" name="username" placeholder='Enter username' />
        <input type="password" name="password" placeholder='Enter password' />
        <button type='submit'>Login</button>

    </form>
    </div>
  )
}

export default LoginPage