import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Login from './Login/Login'
import SignUp from './Login/SignUp'

function Views() {
  return (
   <Routes>
      <Route path='/' element={<Login />}/>
      <Route path='/register' element={<SignUp />}/>
      <Route path='*' element={<Login />}/>
   </Routes>
  )
}

export default Views