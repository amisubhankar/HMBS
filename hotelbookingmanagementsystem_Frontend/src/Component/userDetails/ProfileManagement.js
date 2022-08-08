import { useDispatch, useSelector } from "react-redux"
import { Outlet, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom"
import { deleteUser } from "../../Redux/userDetails/userAction";
import { logoutAction } from "../../Redux/login/loginActions"
import BookingDetailsService from "../../Service/bookingDetails/BookingDetailsService";
import { deleteBookingDetails } from "../../Redux/bookingDetails/bookingActions";
import './UserDetails.css'
import updateImage from '../../image/update.jpg'
import deleteImage from '../../image/delete.jpg'
import bookingImage from '../../image/booking.jpg'
import passwordImage from '../../image/password.jpg'


// functional component for user profile management
function ProfileManagement() {
    const navigate = useNavigate()

    const user = useSelector(state => state.loginR)

    const bookingService = new BookingDetailsService()

    const dispatch = useDispatch();
    
    // function to delete user from database and also its booking record
    async function removeUserData(e) {
        e.preventDefault();

        console.log('inside removeUserData()')
        console.log('calling getBookingDetailsByUser()')
        await bookingService.getBookingDetailByUserId(user.id)
            .then(response => {
                console.log(response.data)
                dispatch(deleteBookingDetails(response.data.bookingId))
            })
            .catch(error => {
                console.log(error.response)
                console.log(error)
            })

        console.log('calling deleteUser()')
        dispatch(deleteUser(user.id));
        dispatch(logoutAction())

        alert('Thanks for being a valuable Customer !!')
        navigate('/')
    }

    return (
        user.role === 'user' ?
        <>
            <table class="mt-5 t1">
                <tbody>
                <tr>
                    <td class="td1">
                        <div className="card" style={{ width: "18rem" }}>
                            <img src={updateImage} class="card-img-top" alt="update" />
                            <div class="card-body">
                                <h5 class="card-title">Update</h5>
                                <p class="card-text">Update Profile Details.</p>
                                <Link to={`/updateUser/${user.id}`} class="btn btn-primary">Click Me! </Link>
                            </div>
                        </div>
                    </td>
                    <td class="td1">

                        <div class="card" style={{ width: "18rem" }}>
                            <img src={deleteImage} class="card-img-top" alt="delete" />
                            <div class="card-body">
                                <h5 class="card-title">Delete Profile</h5>
                                <p class="card-text">Deactivate and delete your profile</p>
                                <button onClick={removeUserData} class="btn btn-primary">Click Me!</button>
                            </div>
                        </div>
                    </td>
                    <td class="td1">
                        <div class="card" style={{ width: "18rem" }}>
                            <img src={bookingImage} class="card-img-top" alt="booking history" />
                            <div class="card-body">
                                <h5 class="card-title">Previous Booking History</h5>
                                <p class="card-text">Shows all your previous booking.</p>
                                <Link class="btn btn-primary" to={`bookinghistory/${user.id}`}>Click Me!</Link>
                            </div>
                        </div>
                    </td>

                    <td class="td1">
                        <div class="card" style={{ width: "18rem" }}>
                            <img src={passwordImage} class="card-img-top" alt="change password" />
                            <div class="card-body">
                                <h5 class="card-title">Change password</h5>
                                <p class="card-text">To update your password</p>
                                <Link class="btn btn-primary" to={`/changepassword/${user.id}`}>Click Me!</Link>
                            </div>
                        </div>
                    </td>

                </tr>
                </tbody>
            </table>
            <Outlet />
        </>

:
<>
<h2>Please login</h2>
{setTimeout(() => {
        navigate('/login')
    }, 2000)}
</>


    )
}

export default ProfileManagement