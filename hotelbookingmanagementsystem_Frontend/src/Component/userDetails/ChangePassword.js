import { useEffect, useState } from "react";
import MD5 from "crypto-js/md5"
import User from "../../Model/userDetails/User";
import { useNavigate, useParams } from "react-router-dom";
import UserService from "../../Service/userDetails/UserService";
import { useDispatch , useSelector } from "react-redux";
import { updateUser } from '../../Redux/userDetails/userAction'


// Functional component to change the password for a user
function ChangePassword() {

    let { userId } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const [state, setState] = useState({ user: new User() })

    const [oldPassword, setOldPassword] = useState({ password: '', class: '', message: '' })

    const [newPassword, setNewPassword] = useState({ password: '', class: '', message: '' })

    const [newPasswordCheck, setNewPasswordCheck] = useState({ password: '', class: '', message: '' })

    let service = new UserService();

    const login = useSelector(state => state.loginR)

    // to fetch the user details for the current logged user
    useEffect(() => {
        service.findUserById(userId).then((result) => {
            setState({ user: result.data })
        }).catch((error) => {
            console.log(error.message)
        })

    }, []);

    // function to validate the data provided by the user
    const formValidation = (e) => {

        e.preventDefault();

        console.log('inside formValidation()')
        let isValid = true;

        // validate if the old password is matching with the user provided password
        if (MD5(oldPassword.password).toString() !== state.user.password) {
            isValid = false;
            setOldPassword({ message: 'password do not match please re-enter', class: 'is-invalid', password: '' ,divClass : 'invalid' })
        }
        else {
            setOldPassword({ message: 'password matched', class: 'is-valid', password: oldPassword.password ,divClass : 'valid' })
        }

        //to check wheather both the new password matches or not
        if (newPassword.password !== newPasswordCheck.password) {
            isValid = false;
            setNewPasswordCheck({ message: 'password do not match', class: 'is-invalid', password: newPasswordCheck.password })
        }
        //to check the mandatory pattern for the password is present
        else {
            if (newPassword.password.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{8,16}$/)) {




                setNewPassword({ message: '', class: 'is-valid', password: newPassword.password })
                setNewPasswordCheck({ message: '', class: 'is-valid', password: newPasswordCheck.password })
            }
            else {
                isValid = false;

                setNewPassword({ message: 'invalid password', class: 'is-invalid', password: newPassword.password })
            }

        }

        // if the data is valid form submit method is called
        if (isValid) {
            console.log('data is valid');
            let postData = state.user;
            postData.password = MD5(newPassword.password).toString();
            setState({ user: postData })
            formSubmit();
        }
    }

    // after the form validdation this functon dispatches the update user action
    const formSubmit = () => {
        console.log('inside formSubmit() method')
        dispatch(updateUser(state.user));
        alert("password updated successfully")
        navigate('/userprofile')
    }

    return (
        login.role === 'user' ?
        <>
            <div className='mt-5 container-fluid w-50 border p-5' style={{ backgroundColor: '#F2F3F4' }}>
                <h2 className='mb-4'>Change Password</h2>
                <form onSubmit={formValidation} >
                    <div className='mb-3'>
                        <label className='form-label'> Enter old password </label><br />
                        <input id="old_password" type='password' className={`form-control ${oldPassword.class} `} value={oldPassword.password}
                            onChange={(e) => {
                                setOldPassword({ password: e.target.value, class: '', message: '' })


                            }} />



                        <div class={`${oldPassword.divClass}-feedback`}>
                            {oldPassword.message}
                        </div>

                        <input type="checkbox" onClick={() => {
                            var x = document.getElementById('old_password');
                            x.type === "password" ? x.type = "text" : x.type = "password"
                        }} />Show Password

                    </div>

                    <div className='mb-3'>
                        <label className='form-label'> Enter new password </label><br />
                        <input id="new_password" type='password' className={`form-control ${newPassword.class} `} value={newPassword.password}
                            onChange={(e) => {
                                setNewPassword({ password: e.target.value, class: '', message: '' })


                            }} />



                        <div class="invalid-feedback">
                            {newPassword.message}
                        </div>

                        <input type="checkbox" onClick={() => {
                            var x = document.getElementById('new_password');
                            x.type === "password" ? x.type = "text" : x.type = "password"
                        }} />Show Password

                    </div>


                    <div className='mb-3'>
                        <label className='form-label'> Re-enter new password </label><br />
                        <input type='password' className={`form-control ${newPasswordCheck.class} `} value={newPasswordCheck.password}
                            onChange={(e) => {
                                setNewPasswordCheck({ password: e.target.value, class: '', message: '' })


                            }} />



                        <div class="invalid-feedback">
                            {newPasswordCheck.message}
                        </div>

                    </div>

                    <div className="d-grid gap-2">
                        <button className='btn btn-primary my-3' type='submit'>Change Password</button>
                    </div>


                </form>

            </div>
        </>
        :
        <>
        <h2>Please login</h2>
        {setTimeout(() => {
                navigate('/login')
            }, 1000)}
        </>
    )
}

export default ChangePassword