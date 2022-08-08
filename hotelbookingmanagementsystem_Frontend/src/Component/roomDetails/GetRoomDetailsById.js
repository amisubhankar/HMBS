// import axios from 'axios';
// import React, { useEffect, useState, Fragment } from 'react';
// import { roomDetails } from '../../Redux/RoomDetails/Action/RoomDetailsAction'
// import { useParams, Link } from 'react-router-dom'
// import { useSelector, useDispatch } from 'react-redux'
// export const GetRoomDetailsById = () => {

//     const params = useParams();
//     const roomId = params.id;
//     const dispatch = useDispatch();
//     const { loading, error, rooms } = useSelector(state => state.roomR)
//     useEffect(() => {
//         dispatch(roomDetails(roomId))
//     }, [dispatch])

//     console.log(rooms)

//     return (
//         <Fragment>
//             {
//                 loading
//                     ?
//                     <></>
//                     :
//                     (
//                         <div className="Users">
//                             <h2>All Rooms</h2>
//                             {

//                                 <div className="card" key={rooms.id}>
//                                     <img src={`data:image/jpg;base64,${rooms.photo}`} className="card-img-top" alt="..." />
//                                     <div className="card-body">
//                                         <h3 className="card-title">{rooms.roomType}</h3>
//                                         <h4 className="card-title">{`(${rooms.roomNo})`}</h4>
//                                         <h3 className="card-title">{`Rs. ${rooms.ratePerDay}`}</h3>
//                                         <h6 className="card-title">{`Availability : ${rooms.available.toString()}`}</h6>
//                                     </div>
//                                 </div>
//                             }
//                         </div>
//                     )

//             }
//         </Fragment>
//     );
// }

// export default GetRoomDetailsById;