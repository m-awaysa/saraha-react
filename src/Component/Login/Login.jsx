import React, { useState } from 'react'
import Joi from 'joi'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom';
import cookies from 'react-cookies'

function Login(props) {
    let navigate = useNavigate();
    const [serverError, setServerError] = useState([]);
    let [errorList, setErrorList] = useState([]);
    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const onChange = async (event) => {
        setUser({ ...user, [event.target.name]: event.target.value })
    }

    const validationRegisterUser = (user) => {
        let schema = Joi.object({
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            password: Joi.string().required(), //pattern(/^[A-Z][a-z]{3,8}$/).
        });
        return schema.validate(user, { abortEarly: false });
    }

    const submitRegister = async (e) => {
        e.preventDefault();
        let resultValidation = validationRegisterUser(user)
        if (resultValidation.error) {
            setErrorList(resultValidation.error.details);
        } else {
            setErrorList([]);
            try {
                const result = await axios.post("https://lazy-blue-sockeye-gear.cyclic.app/api/v1/auth/signin", user,);
                if (result.data.message === 'success') {
                    //  localStorage.setItem("userToken", result.data.token);
                    const expires = new Date();
                    const futureDate = expires.getDate()+1;
                    expires.setDate(futureDate)
                    cookies.save('token', result.data.token,{expires})
                    props.setUserData(result.data.token);

                    navigate('/home');
                } else if (result.data.message === 'success') {

                }
            } catch (error) {
                let err = [];
                err.push(error.response.data);
                setServerError(err)
            }

        }
    }

    return (
        <>
            {errorList.map((err, index) => <div id={index} className="alert alert-danger container col-8">{err.message}</div>)}
            {serverError.map((err, index) => <div id={index} className="alert alert-danger container col-8">{err.message}</div>)}

            <div className="container text-center my-5">
                <div className="user my-3">
                    <i className="fas fa-user-secret user-icon" />
                    <h4 className="login">Login</h4>
                </div>
                <div className="card p-5 w-50 m-auto">
                    <form onSubmit={submitRegister}>
                        <input onChange={onChange} className="form-control" placeholder="Enter your email" type="email" name="email" />
                        <input onChange={onChange} className="form-control my-4 " placeholder="Enter your Password" type="password" name="password" />
                        <button className="btn btn-default-outline my-4 w-100 rounded">Login</button>
                        <p><Link className="text-muted forgot btn" to="/forget-password">I Forgot My Password</Link></p>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login