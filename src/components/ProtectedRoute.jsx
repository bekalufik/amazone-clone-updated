import React, { useEffect } from 'react'
import { useStateValue } from './DataProvider/DataProvider'
import { useNavigate } from 'react-router-dom'

const ProtectedRoute = ({children,msg,redirect}) => {

    const [{user},dispatch]=useStateValue()
    const navigate=useNavigate()
    useEffect(() => {
      if(!user){
        navigate("/auth", { state: { msg, redirect } });
      }
    }, [user])
    
  return children;
}

export default ProtectedRoute