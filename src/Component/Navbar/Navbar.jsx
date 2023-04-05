import React from 'react'
import { Link } from "react-router-dom";
import cookies from 'react-cookies'

function Navbar({ user, setUserData }) {
    const logout = () => {
        setUserData(null);
        cookies.remove('token')
    }

    return (
        <nav className="navbar navbar-expand-lg bg-custom navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand" to="/home">
                    <img src="/image/logo300.png" width={54} alt='...' /> </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    Menu <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/users">Users</Link>
                        </li>
                        {user ? <>
                            <li className="nav-item" >
                                <Link className="nav-link" to="/profile">Profile</Link>
                            </li>
                            <li className="nav-item" onClick={logout}>
                                <Link className="nav-link" to="/#">Logout</Link>
                            </li>
                        </>
                            : <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/home" >Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </>}


                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar