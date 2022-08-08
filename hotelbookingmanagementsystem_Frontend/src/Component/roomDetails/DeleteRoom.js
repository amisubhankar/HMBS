import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { deleteRoomDetails } from '../../Redux/RoomDetails/Action/RoomDetailsAction'
import { ROOM_DETAILS_DELETE_RESET } from '../../Redux/RoomDetails/Types/RoomDetailsTypes'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//using toastify for showing alert. toast.success method called when a success is true
const successMsg = () => toast.success('Room Deleted Successfully!', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

//using toastify for showing alert. toast.error method called when a success is false   
const errorMsg = () => toast.error('Room Not Deleted! There is some error', {
  position: "top-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
});

//Functional Component
const DeleteRoom = () => {
  const [roomId, setRoomId] = useState('');
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.deleteRoomDetailsReducer);

  //calling onSubmit form and dispatching the action
  const OnCreatePost = (e) => {
    e.preventDefault();
    console.log(roomId + " id")
    dispatch(deleteRoomDetails(roomId));
  }

  //checking error and success from state and dispathcing result 
  useEffect(() => {
    if (success) {
      successMsg();
      dispatch({ type: ROOM_DETAILS_DELETE_RESET })
    }
    else if (error)
      errorMsg();
  }, [dispatch, error, success]);

  return (
    <div className="DeleteRoom">
      <ToastContainer position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover />
      <form onSubmit={OnCreatePost}>
        <label>Room Id</label><br />
        <input type="number" name="roomId" value={roomId} onChange={(e) => setRoomId(e.target.value)} /><br />
        <button type="submit" class="btn btn-primary">Submit</button>
        <br />
        <hr />
      </form>
    </div>
  );
};

export default DeleteRoom;