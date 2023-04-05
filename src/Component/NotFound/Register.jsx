import axios from 'axios';
import Joi from 'joi';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    let navigate = useNavigate();
    let [errorList, setErrorList] = useState([]);
    let[user, setUser] = useState({
        name:'',
        email:'',
        age:0,
        password:'',
        cPassword:''
    });

    function getUserData(e){
         let myUser =user;
         myUser[e.target.name] = e.target.value;
         setUser(myUser);
    }
    async function  submitRegister(e) {
        e.preventDefault();
        let resultValidation =validationRegisterUser(user)
        if(resultValidation.error){ 
            setErrorList(resultValidation.error.details);
        }else{
            setErrorList([]);
         let {data}= await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signup",user);
          if(data.message === 'success'){
             navigate('/login');
          }
        }
    }
    function validationRegisterUser(user){
        let schema = Joi.object({
            name:Joi.string().max(20).min(2).required(),
            age:Joi.number().min(20).max(80).required(),
            email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password:Joi.string().required(), //pattern(/^[A-Z][a-z]{3,8}$/).
            cPassword:Joi.string().valid(Joi.ref('password')).required().messages({
                'any.only':'password not match',
            }),
      });
      return schema.validate(user,{abortEarly:false});
    }
    return (
         <>
           { errorList.map((err,index)=> <div id={index} className="alert alert-danger container col-8">{err.message}</div>)}  
            <form onSubmit={submitRegister} className='container col-8'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input onChange = {getUserData} type="email" className="form-control" name="email" id="email" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="Name" className="form-label">Name</label>
                    <input onChange = {getUserData} type="text" className="form-control" name="name" id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="age" className="form-label">Age</label>
                    <input onChange = {getUserData} type="number" className="form-control" name="age" id="age" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input onChange = {getUserData} type="password" className="form-control" name="password"  id="password"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cPassword" className="form-label">Confirm Password</label>
                    <input onChange = {getUserData} type="password" className="form-control" name="cPassword" id="cPassword"/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </>
    );
}

export default Register;
