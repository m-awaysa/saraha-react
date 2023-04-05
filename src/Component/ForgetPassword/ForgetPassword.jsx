import axios from 'axios';
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ForgetPassword = (props) => {

  const [email, setEmail] = useState(null);
  const navigate = useNavigate();
  const onChange = (event) => {
    const { value } = event.target;
    setEmail(value);

  }

  const submitRegister = async (event) => {
    event.preventDefault();
    if (!email || email.length < 8) {
      toast.warning('please enter a valid email');
      return
    }
    try {
      await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/sendCode', { email });
      toast.success('please check your  email');
      navigate(`/reset-code/${email}`)
    } catch (error) {
      toast.warning('error acquired');
    }

  }

  return (
    <div className="container text-center my-5">
      <div className="user my-3">
        <i className="fas fa-user-secret user-icon" />
        <h4 className="login">Login</h4>
      </div>
      <div className="card p-5 w-50 m-auto">
        <form onSubmit={submitRegister}>
          <input onChange={onChange} className="form-control" placeholder="Enter your email" type="email" name="email" value={email} />
          <button className="btn btn-default-outline my-4 w-100 rounded">Reset Password</button>
        </form>
      </div>
    </div>)
};

export default ForgetPassword;