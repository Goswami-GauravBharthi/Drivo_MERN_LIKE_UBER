import React, { useEffect } from 'react'
import { userLogout } from '../api/api';
import { useNavigate } from 'react-router-dom';

function UserLogout() {
    const navigate=useNavigate();

    const token=localStorage.getItem('token');

  useEffect(() => {
    (async()=>{
        const res=await userLogout(token)

        if(res.status===200){
            localStorage.removeItem("token")
            navigate("/login")
        }
    })()
  }, []);
  return (
    <div>UserLogout</div>
  )
}

export default UserLogout