import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';


const ResetPassword = (props) => {
  const [inputFields, setInputFields] = useState({
    code: "",
    newPassword: ""
  });
  const { email } = useParams();
  const navigate = useNavigate();


  const onChange = (event) => {
    const { name, value } = event.target;
    setInputFields({ ...inputFields, [name]: value });
  }

  const submitRegister = async (event) => {
    event.preventDefault();
    try {
      const result =await axios.patch('https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/forgetPassword',
        { ...inputFields, email });
        console.log(result)
        if(result.data.message === 'success'){
          toast.success('changed password successfully');
          navigate('/login');
        }else if(result.data.message === 'fail'){
          toast.warning('wrong code');
        }else{
          toast.warning('password not good!');
        }
    } catch (error) {
      toast.warning('error acquired, please try later');
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
          <div className="form-control mb-2">{email}</div>
          <input onChange={onChange} className="form-control mb-2" placeholder="Enter the code" type="text" name="code" value={inputFields.code} />
          <input onChange={onChange} className="form-control mb-2" placeholder="new Password" type="password" name="newPassword" value={inputFields.password} />
          <button className="btn btn-default-outline my-4 w-100 rounded">Reset Password</button>
        </form>
      </div>
    </div>)
};

export default ResetPassword;