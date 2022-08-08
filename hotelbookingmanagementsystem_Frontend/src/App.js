
import './App.css';
import MyCarousel from './Component/Carousel';
import Navbar from './Component/Navbar';
import { Route, Routes } from 'react-router-dom';
import Login from './Component/authentication/Login';
import Logout from './Component/authentication/Logout';
import AddBookingDetails from './Component/bookingDetails/AddBookingDetail';
import GetBookingDetails from './Component/bookingDetails/GetBookingDetails';
import UserSignUp from './Component/userDetails/UserSignUp';
import DisplayUser from './Component/userDetails/DisplayUser';
import UpdateUser from './Component/userDetails/UpdateUser';
import RoomDetails from './Component/roomDetails/GetAllRoomDetails';
import AddRoomDetails from './Component/roomDetails/AddRoomDetails';
import UpdateRoomDetails from './Component/roomDetails/UpdateRoomDetails';
import GetAllRoomByHotelId from './Component/roomDetails/GetAllRoomByHotelId';
import GetAllHotels from './Component/hotelDetails/GetAllHotels';
import AddHotel from './Component/hotelDetails/AddHotel';
import GetBookingDetailsByUser from './Component/bookingDetails/GetBookingDetailsByUser';
import ProfileManagement from './Component/userDetails/ProfileManagement';
import UpdateHotel from './Component/hotelDetails/UpdateHotel'
import ChangePassword from './Component/userDetails/ChangePassword'
import UpdateBookingDetails from './Component/bookingDetails/UpdateBookingDetails';
import PageNotFound from './Component/PageNotFound';

function App() {

  return (
    <div >
      <Navbar />
      <Routes>
        <Route exact path='/' element={<MyCarousel />} />
        <Route path='/login' element={<Login />} />
        <Route path='/logout' element={<Logout />} />
        
        <Route path='/booking' element={<AddBookingDetails />} />
        <Route path='/booking/:roomId' element={<AddBookingDetails />} />
        <Route path='/bookings' element={<GetBookingDetails />} />
        <Route path='/updatebooking/:bookingId' element={<UpdateBookingDetails />} />
        <Route path='/getbooking/:userId' element={<GetBookingDetailsByUser />} />

        <Route path="/adduser" element={<UserSignUp />} />
        <Route path="changepassword/:userId" element={<ChangePassword />} />
        <Route path="/displayUser" element={<DisplayUser />} />
        <Route path="/updateuser/:userId" element={<UpdateUser />} />
        <Route path="/userprofile" element={<ProfileManagement />}>
          <Route path="bookinghistory/:userId" element={<GetBookingDetailsByUser />} />
        </Route>

        <Route path="/rooms" element={<RoomDetails />}></Route>
        <Route path="/addroom" element={<AddRoomDetails />}></Route>
        <Route path="/updateroom/:id" element={<UpdateRoomDetails />}></Route>
        <Route path="/hotel/:hotelId" element={<GetAllRoomByHotelId />}></Route>

        <Route path="/hotels" element={<GetAllHotels />} />
        <Route path='/addhotel' element={<AddHotel />} />
        <Route path='/updatehotel/:hotelId' element={<UpdateHotel />} />

        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
