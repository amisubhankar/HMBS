import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { fetchUser, deleteUser } from '../../Redux/userDetails/userAction'

// functional component to display the details of the user
function DisplayUser() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const userData = useSelector(state => state.userR)
    const lg = useSelector(state => state.loginR)

    // to dispatch the fetch user action when the component renders
    useEffect(() => {
        dispatch(fetchUser());
    }, []);




    return ( lg.role === 'admin' ?
        <div className="py-4">
            <table className="table border shadow">
                <thead className="thead-light">
                    <tr>
                        <th scope="col">user Id</th>
                        <th scope="col">user Name</th>
                        <th scope="col">user Email</th>
                        <th scope="col">user Phone No</th>
                        <th scope="col">user Address</th>
                        <th scope="col" colSpan="2" style={{ textAlign: "center" }}>Modify</th>


                    </tr>
                </thead>
                <tbody>

                    {userData.user.map((user, index) => (
                        <tr key={index}>
                            <td>{user.userId}</td>
                            <td>{user.userName}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.address}</td>
                            <td><Link className="btn btn-warning" to={`/updateUser/${user.userId}`}>Update</Link></td>
                            <td>
                                <button
                                    className="btn btn-outline-primary mr-2"
                                    onClick={() => dispatch(deleteUser(user.userId))}>
                                    Delete
                                </button>


                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div >
          :
          <>
          <h2>Please login</h2>
          {setTimeout(() => {
                  navigate('/login')
              }, 2000)}
          </>
    )
    
}




export default DisplayUser




