
import React, { useEffect } from 'react'
import { BiTrash, BiEdit } from 'react-icons/bi';
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux'
import { deleteBookingDetails, getBookingDetails } from '../../Redux/bookingDetails/bookingActions'


function GetBookingDetails() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const bk = useSelector(state => state.bookingR)
    const lg = useSelector(state => state.loginR)


    //use effect hook for dispatching the getBookingDetails action to 
    //get all the booking details in redux store
    useEffect(() => {
        //console.log('inside useeffect')
        dispatch(getBookingDetails())
    }, [])

    //function to delete a particular booking by dispatching the deleteBooking action
    const deletehandler = (booking) => {
        console.log('Inside deleteHandler')
        if (window.confirm('Do you want to delete?')) {
            dispatch(deleteBookingDetails(booking.bookingId))
            alert('Booking Deleted')
            navigate('/bookings')
        }
    }


    return (
        lg.isLoggedIn && lg.role === 'admin' ?
            <div className='container-fluid my-5'>
                <h2 style={{ textAlign: 'center' }}>List of Bookings</h2>
                <table className='table table-hover table-bordered w-75 mx-auto mt-4'>
                    <thead className='thead-light' style={{ textAlign: 'center' }}>
                        <tr>
                            <th>Id</th>
                            <th>Amount</th>
                            <th>Check-In</th>
                            <th>Check-Out</th>
                            <th>No_Of_Adults</th>
                            <th>No_Of_Children</th>
                            <th>Hotel_id</th>
                            <th>Room_id</th>
                            <th>User_id</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody style={{ textAlign: 'center' }}>
                        {
                            bk.bookings.length > 0 ?
                                bk.bookings.map(booking => (
                                    <tr key={booking.bookingId}>
                                        <td>{booking.bookingId}</td>
                                        <td>{booking.amount}</td>
                                        <td>{booking.bookingFromDate}</td>
                                        <td>{booking.bookingToDate}</td>
                                        <td>{booking.noOfAdults}</td>
                                        <td>{booking.noOfChildren}</td>
                                        <td>{booking.hotelId}</td>
                                        <td>{booking.roomId}</td>
                                        <td>{booking.userId}</td>
                                        <td>

                                            <Link to={`/updatebooking/${booking.bookingId}`} >
                                                <button style={{ border: 'none' }} title='Update' className='mr-2 btn-outline-warning'>
                                                    <BiEdit size={28} />
                                                </button>
                                            </Link>
                                            <button style={{ border: 'none' }} title='Delete' className='btn-outline-danger'
                                                onClick={() => deletehandler(booking)}>
                                                <BiTrash size={28} />
                                            </button>
                                            <br />
                                        </td>
                                    </tr>
                                )) :
                                null
                        }
                    </tbody>
                </table>
            </div>
            : <><center><h2 className='mt-5'>Error !! Admin is not logged in </h2> </center>
                {setTimeout(() => {
                    navigate('/login')
                }, 2000)} </>
    )
}


export default GetBookingDetails
