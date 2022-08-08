import React, { useEffect, useState } from 'react'
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import BookingDetailsService from '../../Service/bookingDetails/BookingDetailsService'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBookingDetails } from '../../Redux/bookingDetails/bookingActions'
import HotelService from '../../Service/hotelDetails/HotelService';

function GetBookingDetailsByUser() {
    const lg = useSelector(state => state.loginR)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [booking, setBooking] = useState({})
    const [error, setError] = useState('')
    const [hotelName, setHotelName] = useState('')
    const { userId } = useParams()
    const service = new BookingDetailsService()
    const hotelService = new HotelService()

    useEffect(() => {
        service.getBookingDetailByUserId(userId)
            .then(response => {
                setBooking(response.data)
                hotelService.getHotelById(response.data.hotelId)
                    .then(response => {
                        console.log(response.data)
                        setHotelName(response.data.hotelName)
                    })
            })
            .catch(error => {
                setError(error.response.data)
                //console.log(error.response.data)
            })

    }, [])

    const deletehandler = (booking) => {
        console.log('Inside deleteHandler')
        if (window.confirm('Do you want to delete?')) {
            dispatch(deleteBookingDetails(booking.bookingId))
            alert('Booking cancelled')
            navigate('/userprofile')
        }
    }

    return (
        lg.isLoggedIn && lg.role === 'user' ?
            <div className='container-fluid my-5'>
                {
                    error && <h2 style={{ textAlign: 'center' }}>No booking has been done yet</h2>
                }
                {
                    booking.bookingId &&
                    <>
                        <h2 style={{ textAlign: 'center' }}>List of Bookings</h2>
                        <table className='table table-bordered w-75 mx-auto mt-4'>
                            <thead className='thead-light' style={{ textAlign: 'center'}}>
                                <tr>
                                    <th>Id</th>
                                    <th>Amount</th>
                                    <th>Check-In</th>
                                    <th>Check-Out</th>
                                    <th>No_Of_Adults</th>
                                    <th>No_Of_Children</th>
                                    <th>Hotel_id</th>
                                    <th>User_id</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody style={{ textAlign: 'center' }}>
                                <tr>
                                    <td>{booking.bookingId}</td>
                                    <td>{booking.amount}</td>
                                    <td>{booking.bookingFromDate}</td>
                                    <td>{booking.bookingToDate}</td>
                                    <td>{booking.noOfAdults}</td>
                                    <td>{booking.noOfChildren}</td>
                                    <td>{hotelName}</td>
                                    <td>{booking.userId}</td>
                                    <td>
                                        <button className='btn-outline-danger'
                                            onClick={() => deletehandler(booking)}>
                                            Cancel Booking
                                        </button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </>
                }
            </div>
            : <><center><h2 className='mt-5'>Error !! User is not logged in </h2> </center>
                {setTimeout(() => {
                    navigate('/login')
                }, 2000)} </>
    )
}

export default GetBookingDetailsByUser
