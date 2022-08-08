import './navbarStyle.css'
import React from 'react'
import { Link,NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'


function Navbar() {
    const lg = useSelector(state => state.loginR)

    return (
        <div className='container-fluid' id='navbar'>

            <h1 style={{ textAlign: 'center',color: '#B7950B' }} className='my-3'>Welcome to Hotel Booking Management</h1>

            <nav className="navbar navbar-expand-lg navbar-dark " id='alllink'>
                <a className="navbar-brand" href="#" style={{color: '#DC7633'}}>
                    HMBS
                </a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <NavLink className='nav-link' to='/'>Home</NavLink>
                        </li>
                    </ul>
                    {
                        !lg.isLoggedIn ?
                            [
                                <ul className="navbar-nav">
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to='/hotels'>Show All Hotels</NavLink>
                                    </li>
                                </ul>,
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to='/login'>Login</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink className='nav-link' to='/adduser'>Sign-Up</NavLink>
                                    </li>
                                </ul>
                            ] : lg.role === 'user' ?
                                [
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <NavLink className='nav-link' to='/hotels'>Show All Hotels</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className='nav-link' to='/booking'>Book a Hotel</NavLink>
                                        </li>
                                    </ul>,
                                    <ul className="navbar-nav ml-auto">
                                        {/* <li className="nav-item">
                                            <Link className='nav-link' to='/logout'>Logout</Link>
                                        </li> */}
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Welcome {lg.name}
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <NavLink className='dropdown-item' to='/userprofile'>Profile Management</NavLink>
                                                <div className="dropdown-divider"></div>
                                                <NavLink className='dropdown-item' to='/logout'>Logout</NavLink>
                                            </div>
                                        </li>
                                    </ul>
                                ] :
                                [
                                    <ul className="navbar-nav mr-auto">
                                        <li className="nav-item">
                                            <NavLink className='nav-link' to='/hotels'>Hotel Management</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className='nav-link' to='/rooms'>Room Management</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className='nav-link' to='/displayUser'>User Management</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className='nav-link' to='/bookings'>Booking Management</NavLink>
                                        </li>
                                    </ul>,
                                    <ul className="navbar-nav ml-auto">
                                        {/* <li className="nav-item">
                                            <Link className='nav-link' to='/logout'>Logout</Link>
                                        </li> */}
                                        <li className="nav-item dropdown">
                                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                Welcome {lg.name}
                                            </a>
                                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <NavLink className='dropdown-item' to='/logout'>Logout</NavLink>
                                            </div>
                                        </li>
                                    </ul>

                                ]

                    }

                </div>
            </nav>
        </div>
    )
}

export default Navbar
