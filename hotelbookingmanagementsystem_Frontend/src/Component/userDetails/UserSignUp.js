import User from "../../Model/userDetails/User";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../Redux/userDetails/userAction";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from '../../Redux/userDetails/userAction'



// functional component for the user signup
function UserSignUp() {


    const dispatch = useDispatch();
    const userData = useSelector(state => state.userR)

    // it is called to dispatch the fetchUser method on rendering
     useEffect(() => {
        dispatch(fetchUser());
    }, []);

    const listOfEmails = userData.user.map(user => user.email)

    const navigate = useNavigate();

    const [emailDoExist, setEmailDoExist] = useState({ doExist: false })

    const [state, setState] = useState({ user: new User() });
    const [passwordTwo, setPasswordTwo] = useState({ type: 'password' , isValid :'false'});
    const [userNameStatus, setUserNameStatus] = useState({});
    const [userEmailStatus, setEmailStatus] = useState({});
    const [userPasswordStatus, setPasswordStatus] = useState({});
    const [userMobileStatus, setMobileStatus] = useState({});
    const [userRoleStatus, setRoleStatus] = useState({});
    const [userAddressStatus, setAddressStatus] = useState({});

    // function to validate the form data
    const formValidate = () => {

        let isValid = true;
 // to check if the user name is valid or not
        if (state.user.userName.trim().length <= 0) {
            setUserNameStatus({ message: "User name cannot be blank.", classStyle: 'is-invalid' })

            isValid = false;
        }
        else {
            setUserNameStatus({ message: "", classStyle: 'is-valid' })

        }
 // to check if the password is valid or not
        if (state.user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {

            if (emailDoExist.doExist === true) {
                isValid = false;
            }
            else {
                setEmailStatus({ message: "", classStyle: 'is-valid' })
            }
        }
        else {
            setEmailStatus({ message: "Invalid Email", classStyle: 'is-invalid' })
            isValid = false;


        }
 // to check if the mobile is valid or not
        if (state.user.mobile.match(/^\d{10}$/)) {
            setMobileStatus({ message: "", classStyle: 'is-valid' })
        }
        else {
            setMobileStatus({ message: "Mobile number should be of 10 digits", classStyle: 'is-invalid' })
            isValid = false;
        }

        if (state.user.role.trim().length <= 0) {
            setRoleStatus({ message: "Role cannot be blank", classStyle: 'is-invalid' })
            isValid = false;
        }
        else {
            setRoleStatus({ message: "", classStyle: 'is-valid' })

        }

 // to check if the user address is valid or not
        if (state.user.address.trim().length <= 0) {
            setAddressStatus({ message: "Address cannot be blank", classStyle: 'is-invalid' })
            isValid = false;
        }
        else {
            setAddressStatus({ message: "", classStyle: 'is-valid' })

        }

        if (state.user.password.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/)) {
            setPasswordStatus({ message: "", classStyle: 'is-valid' })


        }
        else {
            setPasswordStatus({ message: "Password should contain atleast 8 characters with a digit symbol and alphabet", classStyle: 'is-invalid' })


            isValid = false;

        }
 // to check if the user password is valid or not
        if (passwordTwo.isValid == 'true') {
            setPasswordTwo({ ...passwordTwo, message: 'Password matched', classStyle: 'is-valid', divClass: 'valid' })
        }
        else {
            setPasswordTwo({ ...passwordTwo, message: 'Password do not match', classStyle: 'is-invalid', divClass: 'invalid' })
            isValid = false;

        }

        return isValid;
    }
// function to submit the form on result of validation
    function handleClick(e) {

        e.preventDefault();

        console.log('inside handelClick() ')
        let isValid = formValidate();
        console.log(isValid)
        if (!isValid) {
            alert('Data is not valid. Please check again !!')
            return false;
        }
        else {

            dispatch(addUser(state.user));
            window.alert("User successfully registered !! Thanks for joining with us!")
            navigate('/login')
        }
    }
    // function to check if the email enter by user already exists 
    const checkEmail = async (e) => {

        e.preventDefault();
        console.log('inside checkEmail()')
        if (listOfEmails.includes(e.target.value)) {
            setEmailStatus({ message: "User already exist", classStyle: 'is-invalid' })
            setEmailDoExist({ doExist: true });
        }

        else {
            setEmailStatus({ message: '', classStyle: 'is-valid' })
            setEmailDoExist({ doExist: false });


        }
    }

    return (

        <div className='mt-5 container-fluid w-50 border p-5' style={{ backgroundColor: '#F2F3F4' }}>

            <h2 className='mb-4'>User Sign Up</h2>

            <form>

                <div className='mb-3'>

                    <input className={`form-control ${userNameStatus.classStyle}`} type="text" placeholder="Enter your name"
                        value={state.user.userName}
                        onChange={(e) => {
                            setState({
                                user: {
                                    ...state.user,
                                    userName: e.target.value
                                }
                            })

                            setUserNameStatus({ message: "", classStyle: 'form-control' })
                        }
                        } />

                    <div className="invalid-feedback">
                        {userNameStatus.message}
                    </div>

                </div>


                <div className='mb-3'>

                    <input className={`form-control ${userEmailStatus.classStyle}`} type="email" placeholder="Enter User Email"
                        value={state.user.email}
                        onChange={(e) => {
                            setState({
                                user:
                                {
                                    ...state.user,

                                    email: e.target.value
                                }

                            })
                            if (e.target.value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
                                checkEmail(e);
                            }
                            else {
                                setEmailStatus({ message: 'Please enter a valid email', classStyle: 'is-invalid' })

                            }
                        }

                        }

                        required />

                    <div className="invalid-feedback">
                        {userEmailStatus.message}
                    </div>

                </div>

                <div className='mb-3'>

                    <input id="input_3" className={`form-control ${userPasswordStatus.classStyle}`} type="password" placeholder="Enter User Password"
                        value={state.user.password}
                        onChange={(e) => {
                            setState({
                                user:
                                {
                                    ...state.user,

                                    password: e.target.value
                                }
                            })

                            if (e.target.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/)) {
                                setPasswordStatus({ message: "", classStyle: 'is-valid' })
                    
                    
                            }
                            else {
                                setPasswordStatus({ message: "Password should contain atleast 8 characters with a digit symbol and alphabet", classStyle: 'is-invalid' })
                    
                    
                              
                    
                            }
                        }
                        }
                        required />

                    <div className="invalid-feedback">

                        {userPasswordStatus.message}
                    </div>

                </div>


                <div className='mb-3'>

                    <input className={`form-control ${passwordTwo.classStyle}`} type={passwordTwo.type} placeholder="Re-enter your Password"
                        value={passwordTwo.password}
                        onChange={(e) => {
                            
                            if (state.user.password === e.target.value && e.target.value.length > 0) {
                                setPasswordTwo({ ...passwordTwo, message: 'Password matched', classStyle: 'is-valid', divClass: 'valid' , isValid : 'true' })
                            }
                            else {
                                setPasswordTwo({ ...passwordTwo, message: 'Password do not match', classStyle: 'is-invalid', divClass: 'invalid' , isValid :'false'})
                    
                            }

                        }
                        }

                        required />
                    <input type="checkbox" onClick={() => {
                        passwordTwo.type === "password" ? setPasswordTwo({ ...passwordTwo, type: 'text' }) : setPasswordTwo({ ...passwordTwo, type: 'password' })
                    }} />Show Password

                    <div className={`${passwordTwo.divClass}-feedback`}>
                        {passwordTwo.message}
                    </div>


                </div>

                <div className='mb-3'>

                    <input className={`form-control ${userMobileStatus.classStyle}`} type="text" placeholder="Enter User Mobile"
                        value={state.user.mobile}
                        onChange={(e) => {
                            setState({
                                user:
                                {
                                    ...state.user,

                                    mobile: e.target.value
                                }
                            })

                            if (e.target.value.match(/^\d{10}$/)) {
                                setMobileStatus({ message: "", classStyle: 'is-valid' })
                            }
                            else {
                                setMobileStatus({ message: "Mobile number should be of 10 digits", classStyle: 'is-invalid' })
                            }
                        }}
                        required />
                    <div className="invalid-feedback">
                        {userMobileStatus.message}
                    </div>

                </div>

                <div className='mb-3'>

                    <input className={`form-control ${userRoleStatus.classStyle}`} type="text" placeholder="Enter User Role"
                        value={state.user.role}
                        onChange={(e) => {
                            setState({
                                user:
                                {
                                    ...state.user,

                                    role: e.target.value
                                }
                            })

                            setRoleStatus({ message: "", classStyle: '' })
                        }}
                        required />

                    <div className="invalid-feedback">
                        {userRoleStatus.message}
                    </div>

                </div >
                <div className='mb-3'>
                    <input className={`form-control ${userAddressStatus.classStyle}`} type="text-area" placeholder="Enter User Address"
                        value={state.user.address}
                        onChange={(e) => {
                            setState({
                                user: {
                                    ...state.user,
                                    address: e.target.value
                                }
                            })

                            setAddressStatus({ message: "", classStyle: '' })
                        }}
                        required />
                    <div className="invalid-feedback">
                        {userAddressStatus.message}
                    </div>

                </div>
                <div className="col-12 text-center">
                    <button className="btn btn-primary" onClick={handleClick}
                    >Add user</button>

                </div>

            </form>


        </div>
    )
}

export default UserSignUp
