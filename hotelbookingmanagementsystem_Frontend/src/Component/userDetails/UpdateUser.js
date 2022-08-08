import React, { useState, useEffect } from "react";


import User from "../../Model/userDetails/User";

import UserService from "../../Service/userDetails/UserService";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from '../../Redux/userDetails/userAction'
import MD5 from "crypto-js/md5"

// funcational component to update user details
function UpdateUser() {

    const navigate = useNavigate();

    const login = useSelector(state => state.loginR)

    const dispatch = useDispatch();

    let { userId } = useParams();

    const [state, setState] = useState({ user: new User() });

    let service = new UserService();

    const [userNameStatus, setUserNameStatus] = useState({});
    const [userPasswordStatus, setPasswordStatus] = useState({ message: '', password: '', class: '' });
    const [userMobileStatus, setMobileStatus] = useState({});
    const [userRoleStatus, setRoleStatus] = useState({});
    const [userAddressStatus, setAddressStatus] = useState({});

    // fetching the user details on rendering
    useEffect(() => {
        console.log('fetching user data of logged user')
        service.findUserById(userId).then((result) => {

            setState({ user: result.data })
        }).catch((error) => {
            alert(error);
        });

        console.log(state.user)
    }, []);

    // function to verify the data is valid or not by calling formValidate() and
    // dispatching the action or returning false based on the return value
    function clickHandeler(e) {

        e.preventDefault();

        console.log('inside clickHandeler()')
        let isValid = formValidate();
        console.log(isValid)

        // if not valid returning false
        if (!isValid) {
            alert('OOPS ! Please check you data')
            return false;
        }
        // if valid dispatching updateUser action
        else {
            dispatch(updateUser(state.user));

            alert('Hurray! Details successfully updated');

            if (login.role === 'user') {
                navigate('/userprofile')
            }
            else {
                navigate('/displayuser');
            }
        }

    }

    const formValidate = () => {

        console.log('inside formValidate()')
        let isValid = true;
        // to check if the user name is valid or not
        if (state.user.userName.trim().length <= 0) {
            setUserNameStatus({ message: "User name cannot be blank.", class: 'is-invalid' })

            isValid = false;
        }
        else {
            setUserNameStatus({ message: "", class: 'is-valid' })


        }



    // to check if the mobile number is valid or not
        if (state.user.mobile.match(/^\d{10}$/)) {
            setMobileStatus({ message: "", class: 'is-valid' })

        }
        else {
            setMobileStatus({ message: "Mobile number should be of 10 digits", class: 'is-invalid' })

            isValid = false;


        }

         // to check if the user role is valid or not
        if (state.user.role.trim().length <= 0) {
            setRoleStatus({ message: "Role cannot be blank.", class: 'is-invalid' })

            isValid = false;
        }
        else {
            setRoleStatus({ message: "", class: 'is-valid' })


        }

         // to check if the user address is valid or not
        if (state.user.address.trim().length <= 0) {
            setAddressStatus({ message: "User address cannot be blank.", class: 'is-invalid' })

            isValid = false;
        }
        else {
            setAddressStatus({ message: "", class: 'is-valid' })


        }

        // // to check if the user password is valid or not
        if (userPasswordStatus.password.length > 0) {
            if (userPasswordStatus.password.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/)) {

                setPasswordStatus({ password: userPasswordStatus.password, message: '', class: 'is-valid' })
            }

            else {
                isValid = false;

                setPasswordStatus({ password: userPasswordStatus.password, message: 'invalid password', class: 'is-invalid' })

            }
        }

        if (isValid) {
            console.log('data is validated')
            if (userPasswordStatus.password.length > 0) {
                let postData = state.user;
                postData.password = MD5(userPasswordStatus.password).toString();
                setState({ user: postData })
            }
        }





        return isValid;
    }



    return (
        login.role === 'user' || login.role === 'admin' ?

        <div className='mt-5 container-fluid w-50 border p-5' style={{ backgroundColor: '#F2F3F4' }}>


            {login.role === 'user' ? <h2 className='mb-4'>Edit profile details</h2> : <h2 className='mb-4'>Update user Details</h2>}
            <form>

                <div className='mb-3'>
                    <label htmlFor="user-id" class="form-label">User Id</label>
                    <input className="form-control" type="text" placeholder="Enter User Id" disabled
                        value={state.user.userId} />

                </div>


                <div className='mb-3'>
                    <label htmlFor="user-name" class="form-label">User Name</label>
                    <input id="input_1" className={`form-control ${userNameStatus.class}`} type="text" placeholder="Enter User Name" disabled
                        value={state.user.userName}
                        onChange={(e) => {
                            setState({
                                user: {
                                    ...state.user,
                                    userName: e.target.value
                                }
                            })
                            setUserNameStatus({ message: "", class: '' })

                        }
                        }
                        required />
                    <button type="button" class="btn btn-secondary float-right" onClick={() => { document.getElementById('input_1').disabled === true ? document.getElementById('input_1').disabled = false : document.getElementById('input_1').disabled = true }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>

                    </button>
                    <div class="invalid-feedback">
                        {userNameStatus.message}
                    </div>
                </div>
                <div className='mb-3'>
                    <label htmlFor="user_id" class="form-label">User Email</label>
                    <input id="input_2" className="form-control" type="email" placeholder="Enter User Email" disabled
                        value={state.user.email}
                        onChange={(e) => setState({
                            user: {
                                ...state.user,
                                userName: e.target.value
                            }
                        })}
                        readOnly={true} />

                </div>







                <div className='mb-3'>
                    <label htmlFor="user_id" class="form-label">User Mobile</label>
                    <input id="input_4" className={`form-control ${userMobileStatus.class}`} type="text" placeholder="Enter User Mobile" disabled
                        value={state.user.mobile}
                        onChange={(e) => {
                            setState({
                                user:
                                {
                                    ...state.user,

                                    mobile: e.target.value
                                }
                            })
                            setMobileStatus({ message: "", class: '' })

                        }}
                        required />

                    <button type="button" class="btn btn-secondary float-right" onClick={() => { document.getElementById('input_4').disabled === true ? document.getElementById('input_4').disabled = false : document.getElementById('input_4').disabled = true }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>

                    </button>
                    <div class="invalid-feedback">
                        {userMobileStatus.message}
                    </div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="user_id" class="form-label">User Role</label>
                    <input id="input_5" className={`form-control ${userRoleStatus.class}`} type="text" placeholder="Enter User Role" disabled
                        value={state.user.role}
                        onChange={(e) => {
                            setState({
                                user:
                                {
                                    ...state.user,

                                    role: e.target.value
                                }
                            })
                            setRoleStatus({ message: "", class: '' })

                        }
                        }
                        required />

                    <button type="button" class="btn btn-secondary float-right" onClick={() => { document.getElementById('input_5').disabled === true ? document.getElementById('input_5').disabled = false : document.getElementById('input_5').disabled = true }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>

                    </button>
                    <div class="invalid-feedback">
                        {userRoleStatus.message}
                    </div>
                </div>

                <div className='mb-3'>
                    <label htmlFor="user_id" class="form-label">User Address</label>
                    <input id="input_6" className={`form-control ${userAddressStatus.class}`} type="text-area" placeholder="Enter User Address" disabled
                        value={state.user.address}
                        onChange={(e) => {
                            setState({
                                user:
                                {
                                    ...state.user,

                                    address: e.target.value
                                }
                            })
                            setAddressStatus({ message: "", class: '' })

                        }}
                        required />

                    <button type="button" class="btn btn-secondary float-right" onClick={() => { document.getElementById('input_6').disabled === true ? document.getElementById('input_6').disabled = false : document.getElementById('input_6').disabled = true }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>

                    </button> <br></br>
                    <div class="invalid-feedback">
                        {userAddressStatus.message}
                    </div>
                </div>


                {login.role === 'admin' &&
                    <div className='mb-3'>
                        <label htmlFor="user_id" class="form-label">Change user password</label>
                        <input id="input_3" className={`form-control ${userPasswordStatus.class}`} type="password" placeholder="Change user's Password" disabled
                            value={userPasswordStatus.password}
                            onChange={(e) => {
                                setPasswordStatus({ password: e.target.value, message: '', class: '' })
                            }}
                            required />

                        <button type="button" class="btn btn-secondary float-right" onClick={() => { document.getElementById('input_3').disabled === true ? document.getElementById('input_3').disabled = false : document.getElementById('input_3').disabled = true }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg>

                        </button>
                        <div class="invalid-feedback">
                            {userPasswordStatus.message}
                        </div>
                    </div>
                }



                <button className="btn btn-outline-primary mt-3" onClick={clickHandeler}
                >Update user</button>

            </form>


        </div>

:
<>
<h2>Please login</h2>
{setTimeout(() => {
        navigate('/login')
    }, 2000)}
</>
    )
}

export default UpdateUser

