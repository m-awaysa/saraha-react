import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Component/Navbar/Navbar'
import './App.css'
import Register from './Component/Register/Register'
import Login from './Component/Login/Login'
import Home from './Component/Home/Home'
import NotFound from './Component/NotFound/NotFound'
import axios from 'axios'
import Loader from './Component/Loader/Loader';
import Users from './Component/Users/Users';
import UserProfile from './Component/UserProfile/UserProfile';
import cookies from 'react-cookies'
import MyProfile from './Component/MyProfile/MyProfile';
import { ToastContainer } from 'react-toastify';
import ForgetPassword from './Component/ForgetPassword/ForgetPassword';
import ResetPassword from './Component/ResetPassword/ResetPassword';
function App() {
  const [userData, setUserData] = useState(cookies.load("token"));
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(true);
  const getAllUsers = async () => {
    
    let { data } = await axios.get('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/getAllUsers')
    setUsers(data)
    setTimeout(() => {
      setLoading(false)
    }, 100);
  }

  useEffect(() => {
    getAllUsers();
  }
    , []);

  return (
    <div>
      <Navbar user={userData} setUserData={setUserData} />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {loading ? <Loader />
        : (<Routes>
          {userData ? (
            <>
              <Route path='/profile' element={<MyProfile user={userData} users={users} />}></Route>
            </>)
            : (
              <>
                <Route path='/' element={<Home />}></Route>
                <Route path='home' element={<Home />}></Route>
                <Route path='register' element={<Register />}></Route>
                <Route path='login' element={<Login setUserData={setUserData} />}></Route>
                <Route path='forget-password' element={<ForgetPassword />}></Route>
                <Route path='reset-code/:email' element={<ResetPassword />}></Route>
              </>

            )}
          <Route path='/user/:id' element={<UserProfile users={users} />}></Route>
          <Route path='users' element={<Users users={users} />}></Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>)}

    </div>
  )
}

export default App