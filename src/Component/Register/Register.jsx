import axios from 'axios';
import Joi from 'joi';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from '../common/customInput';

function Register() {
  let navigate = useNavigate();
  const [serverError, setServerError] = useState([]);
  let [errorList, setErrorList] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });
  let [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    cPassword: ''
  });

  const registerSchema = Joi.object({
    name: Joi.string().max(20).min(2).required(),
    age: Joi.number().min(20).max(80).required(),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string().min(3).max(16).required(), //pattern(/^[A-Z][a-z]{3,8}$/).
    cPassword: Joi.string().required().min(3).max(16)//.valid(Joi.ref('password')).messages({
    // 'any.only': 'password not match',
    //  }),
  });

  const validateInput = (input, inputSchema) => {
    return inputSchema.validate(input);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    const validation = validateInput(value, registerSchema.extract(name))
    if (validation.error) {
      setErrorList({ ...errorList, [name]: validation.error.details[0].message })
    } else {
      const err = { ...errorList }
      delete err[name];
      setErrorList({ ...err })
    }
    setInput({ ...input, [name]: value })
  };

  useEffect(() => {


  }, [input]);

  const submitRegister = async (e) => {
    e.preventDefault();

    if (Object.keys(errorList).length === 0) {
      try {
        let { data } = await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup", input);

        if (data.message === 'success') {
          navigate('/login');
          toast.success('Registered successfully please confirm your email');
        }
      } catch (error) {
          let err=[];
          err.push(error.response.data);
          setServerError(err)

      }
    }else{
     
    }
  }

  return (
    <> 
    { serverError.map((err,index)=> <div id={index} className="alert alert-danger container col-8">{err.messgae}</div>)}  
      <div className="container text-center my-5">
        <div className="user my-3">
          <i className="far fa-edit user-icon" />
          <h4 className="login">Register</h4>
        </div>
        <div className="card p-5 w-50 m-auto">
          <form onSubmit={submitRegister} onChange={onChange} >
            <CustomInput error={errorList.name} type="text" placeholder="Enter your Name" onChange={onChange} name="name" />
            <CustomInput error={errorList.email} type="email" placeholder="Enter your email" onChange={onChange} name="email" />
            <CustomInput error={errorList.password} type="password" placeholder="Enter your Password" onChange={onChange} name="password" />
            <CustomInput error={errorList.cPassword} type="password" placeholder="Password Confirmation" onChange={onChange} name="cPassword" />
            <button className="btn btn-default-outline my-4 w-100 rounded">Register</button>
          </form>
        </div>
      </div>
    </>

  )
}

export default Register