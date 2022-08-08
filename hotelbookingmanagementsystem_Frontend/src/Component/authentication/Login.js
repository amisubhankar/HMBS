import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { loginAction, resetDetails } from '../../Redux/login/loginActions'


function Login() {
    const [login, setLogin] = useState({ userName: '', password: '', role: '' })
    const [sucessClass, setSuccessClass] = useState('')
    const [roleErr, setRoleErr] = useState({})
    const [userNameErr, setUserNameErr] = useState({})
    const [passwordErr, setPasswordErr] = useState({})
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const lg = useSelector(state => state.loginR)

    //dispatch reset action to reset all the store details for login
    useEffect(() => {
        dispatch(resetDetails())
    }, [])

    //function to authenticate a user via 
    //dispatching login action
    //this function is called from formValidation() 
    const handleSubmit = (event) => {
        event.preventDefault()

        //if the form is validated then only dispatch the action
        if (formValidation())
            dispatch(loginAction(login))
    }

    //validating all the form fields and 
    //setting the erorr messages where applicable
    //this function is called on submit of form
    const formValidation = () => {
        let isValid = true

        let rerr = ''
        let unerr = ''
        let passerr = ''

        if (login.role === 'selectRole' || login.role === '') {
            console.log('Inside role')
            rerr = 'Please select User/Admin'
            isValid = false
        }
        if (login.userName === '') {
            console.log('Inside uname')
            unerr = 'Please enter user name'
            isValid = false
        }
        if (login.password === '') {
            console.log('Inside password')
            passerr = 'Please enter pasword'
            isValid = false
        }

        //setting the error messages and classes where applicable
        rerr ? setRoleErr({ error: rerr, class: 'is-invalid' }) : setRoleErr({ error: '', class: 'is-valid' })
        unerr ? setUserNameErr({ error: unerr, class: 'is-invalid' }) : setUserNameErr({ error: '', class: 'is-valid' })
        passerr ? setPasswordErr({ error: passerr, class: 'is-invalid' }) : setPasswordErr({ error: '', class: 'is-valid' })

        return isValid;
    }

    //showing success message if user is authenticated
    useEffect(() => {
        if (lg.isLoggedIn) {
            setSuccessClass('alert alert-success')
            document.getElementById('message').innerHTML = "<strong>Login Success!!</strong>Redirecting to Home page"
            setTimeout(() => {
                navigate('/')
            }, 1000);
        }

    }, [lg.isLoggedIn])

    //function for displaying the password in the text box by modifying input field 'type'
    const showPasswordHandler = () =>{
        if(document.getElementById('flexCheckDefault').checked){
            document.getElementById('password').type = 'text'
        }else{
            document.getElementById('password').type = 'password'
        }
    }

    return (
        <div className='container-fluid w-25 mt-5 border p-4' style={{ backgroundColor: '#F2F3F4',borderRadius : '10px' }}>
            <h2 className='mb-4' style={{ color: 'goldenRod'}}>Login Form</h2>
            <div className={sucessClass} id='message' role='alert'></div>
            {
                lg.error ?
                    <div className='alert alert-danger' id='error' role='alert'>
                        <strong>'Login failed!! </strong>Wrong credentials'
                    </div> : null
            }


            <form onSubmit={handleSubmit} >
                <div className='mb-3'>
                    <select className={`form-select ${roleErr.class}`} id='role'
                        onClick={() => setRoleErr({})}
                        onChange={(e) => {
                            setLogin({ ...login, role: e.target.value })
                        }}>
                        <option value='selectRole'>Select role ..</option>
                        <option value='user'>User</option>
                        <option value='admin'>Admin</option>
                    </select>
                    {roleErr.error ? <div style={{ color: "red" }}>{roleErr.error}</div> : null}
                </div>

                <div className='mb-3'>
                    <input type='text' id='userName' className={`form-control ${userNameErr.class}`}
                        placeholder='Enter User name or Email id'
                        onClick={() => setUserNameErr({})}
                        onChange={event => {
                            setLogin({ ...login, userName: event.target.value })
                        }} />
                    {userNameErr.error ? <div style={{ color: "red" }}>{userNameErr.error}</div> : null}
                </div>

                <div className='mb-3'>
                    <input type='password' id='password' className={`form-control ${passwordErr.class}`}
                        placeholder='Enter password'
                        onClick={() => setPasswordErr({})}
                        onChange={e => {
                            setLogin({ ...login, password: e.target.value })
                        }} />
                    {passwordErr.error ? <div style={{ color: "red" }}>{passwordErr.error}</div> : null}
                </div>
                <div class="form-check">
                    <input class="form-check-input" type="checkbox" id="flexCheckDefault"
                        onClick={showPasswordHandler} />
                    <label class="form-check-label" htmlFor="flexCheckDefault">
                        Show Password
                    </label>
                </div>

                <div className="d-grid gap-2">
                    <button className='btn btn-primary my-3' type='submit'
                        onClick={() => document.getElementById('error').innerHTML = ''}>
                        Login
                    </button>
                </div>

            </form>
            {/* {lg.error ? authErr() : null} */}
        </div>
    )
}

export default Login
