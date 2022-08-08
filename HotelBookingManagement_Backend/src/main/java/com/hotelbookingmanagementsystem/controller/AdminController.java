package com.hotelbookingmanagementsystem.controller;

import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.hotelbookingmanagementsystem.entites.Admin;
import com.hotelbookingmanagementsystem.entites.BookingDetails;
import com.hotelbookingmanagementsystem.entites.Hotel;
import com.hotelbookingmanagementsystem.entites.Payments;
import com.hotelbookingmanagementsystem.entites.RoomDetails;
import com.hotelbookingmanagementsystem.entites.User;
import com.hotelbookingmanagementsystem.exception.BookingDetailsNotFoundException;
import com.hotelbookingmanagementsystem.exception.HotelNotFoundException;
import com.hotelbookingmanagementsystem.exception.InvalidDateFormatException;
import com.hotelbookingmanagementsystem.exception.RoomDetailsNotFoundException;
import com.hotelbookingmanagementsystem.exception.UserNotFoundException;
import com.hotelbookingmanagementsystem.model.BookingDTO;
import com.hotelbookingmanagementsystem.model.LoginDTO;
import com.hotelbookingmanagementsystem.service.IAdminService;
import com.hotelbookingmanagementsystem.service.IBookingDetailsService;
import com.hotelbookingmanagementsystem.service.IHotelService;
import com.hotelbookingmanagementsystem.service.IPaymentsService;
import com.hotelbookingmanagementsystem.service.IRoomDetailsService;
import com.hotelbookingmanagementsystem.service.IUserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@RestController
@CrossOrigin
@RequestMapping("/hbms/admin")
@Api(value = "Admin Controller")
public class AdminController {

	private static final Logger log = 
			LoggerFactory.getLogger(AdminController.class);
	
	@Autowired
	IAdminService adminService;

	@Autowired
	IUserService userService;

	@Autowired
	IHotelService hotelService;

	@Autowired
	IRoomDetailsService roomDetailsService;

	@Autowired
	IPaymentsService paymentService;

	@Autowired
	IBookingDetailsService bookingDetailService;
	
//	
//	/**
//	 * signIn() is signing in existing admin
//	 * 
//	 * @param login - a login object
//	 *
//	 * @return ResponseEntity<String> : "Sign In successfully" - message and a HttpStatus
//	 */
////	@ApiOperation(value = "signIn", notes = "signIn Method")
////	@PostMapping("/signin")
////	public ResponseEntity<String> signIn(@RequestBody LoginDTO login) throws UserNotFoundException {
////		log.info("signIn() is called");
////		return new ResponseEntity<>(adminService.signIn(login.getUserName(), login.getPassword()),
////				HttpStatus.ACCEPTED);
////	}
////	
	/**
	 * signUp() is adding new admin if admin doesn't exist
	 * 
	 * @param admin : a admin entity object
	 * @return ResponseEntity<String> : "Admin added successfully" - message and a HttpStatus
	 */
	@ApiOperation(value = "signUp", notes = "signUp Method")
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody Admin admin) {
		log.info("signUp() is called");
		return new ResponseEntity<>(adminService.signUp(admin), HttpStatus.ACCEPTED);
	}
	
	/**
	 * signOut() is signing out an admin
	 *  
	 * @return ResponseEntity<String> : "Logged Out Successfully" - message and a HttpStatus
	 */
	@ApiOperation(value = "signOut", notes = "signOut Method")
	@GetMapping("/signout")
	public ResponseEntity<String> signOut() {
		log.info("signOut() is called");
		String message = adminService.signOut();
		return new ResponseEntity<>(message, HttpStatus.OK);
	}

	/**
	 * getAllUser is getting list of all users
	 * 
	 * @return ResponseEntity<List<User>> : list of all users and a HttpStatus
	 */
	@ApiOperation(value = "get all the Users", response = User.class)
	@GetMapping("/user")
	public ResponseEntity<List<User>> getAllUser() throws UserNotFoundException {
		log.info("getAllUser() is called");
		return new ResponseEntity<>(userService.showAllUser(), HttpStatus.OK);
	}
	
	/**
	 * getUser() is getting the details of a user
	 * 
	 * @param int : userId - id of a user 
	 * @return ResponseEntity<User> : details of a user and HttpStatus
	 */
	@ApiOperation(value = "get a user by Id", response = User.class)
	@GetMapping(path = "/user/{id}")
	public ResponseEntity<User> getUser(@PathVariable("id") int userId) throws UserNotFoundException {
		log.info("getUser() is called");
		return new ResponseEntity<>(userService.showUser(userId), HttpStatus.OK);
	}
	
	/**
	 * addHotel() is adding new hotel
	 * 
	 * @param hotel : a hotel object
	 * @return ResponseEntity<String> : "Hotel added successfully" - message and HttpStatus
	 */
	@PostMapping("/hotel")
	public ResponseEntity<String> addHotel(@RequestBody @Valid Hotel hotel) {
		log.info("addHotel() is called");
		return new ResponseEntity<>(hotelService.addHotel(hotel), HttpStatus.OK);
	}
	
	/**
	 * getAllHotel() is getting list of all hotels
	 * 
	 * @return ResponseEntity<List<Hotel>> : list of all hotels and HttpStatus
	 */
	@GetMapping("/hotel")
	public ResponseEntity<List<Hotel>> getAllHotel() {
		log.info("getAllHotel() is called");
		return new ResponseEntity<>(hotelService.showAllHotel(), HttpStatus.OK);
	}

	/**
	 * getHotel() is showing the hotel by its id
	 * 
	 * @param int : hotelId - of hotel
	 * @return ResponseEntity<Hotel> : hotel details and HttpStatus
	 */
	@GetMapping(path = "/hotel/{id}")
	public ResponseEntity<Hotel> getHotel(@PathVariable("id") int hotelId) throws HotelNotFoundException {
		log.info("getHotel() is called");
		return new ResponseEntity<>(hotelService.showHotel(hotelId), HttpStatus.OK);
	}

	/**
	 * updateHotel() is updating a hotel
	 * 
	 * @param hotel : a Hotel object
	 * @return  ResponseEntity<String> : "Hotel updated successfully" - message and  HttpStatus
	 */
	@PutMapping("/hotel")
	public ResponseEntity<String> updateHotel(@RequestBody @Valid Hotel hotel) throws HotelNotFoundException {
		log.info("updateHotel() is called");
		return new ResponseEntity<>(hotelService.updateHotel(hotel), HttpStatus.OK);
	}

	/**
	 * deleteHotel() is deleting existing hotel
	 * 
	 * @param int : hotelId - id of a hotel 
	 * @return ResponseEntity<String> : "Hotel deleted successfully" - message and HttpStatus
	 */
	@DeleteMapping("/hotel/{id}")
	public ResponseEntity<String> deleteHotel(@PathVariable("id") int hotelId) throws HotelNotFoundException {
		log.info("deleteHotel() is called");
		return new ResponseEntity<>(hotelService.removeHotel(hotelId), HttpStatus.OK);
	}

	/**
	 * addRoomDetails() is adding room details
	 * 
	 * @param roomDetails : RoomDetails object
	 * @return ResponseEntity<String> : "Room added successfully" - message and HttpStatus
	 */
	@PostMapping("/room")
	public ResponseEntity<String> addRoomDetails(@RequestBody RoomDetails roomDetails) throws HotelNotFoundException {
		log.info("addRoomdetails() is called");
		return new ResponseEntity<>(roomDetailsService.addRoomDetails(roomDetails), HttpStatus.CREATED);
	}

	/**
	 * updateRoomDetails() is updating room details
	 * 
	 * @param roomDetails : RoomDetails object
	 * @return ResponseEntity<String> : "Room updated successfully" - message and a HttpStatus
	 */
	@PutMapping("/room")
	public ResponseEntity<String> updateRoomDetails(@RequestBody RoomDetails roomDetails)
			throws RoomDetailsNotFoundException, HotelNotFoundException {
		log.info("updateRoomDetails() is called");
		return new ResponseEntity<>(roomDetailsService.updateRoomDetails(roomDetails), HttpStatus.OK);
	}

	/**
	 * deleteRoomDetails() is deleting room details if present
	 * 
	 * @param int : roomId - id of a room
	 * @return ResponseEntity<String> : "Room deleted successfully" -  message and HttpStatus
	 */
	@DeleteMapping("/room/{id}")
	public ResponseEntity<String> deleteRoomDetails(@PathVariable("id") int roomId)
			throws RoomDetailsNotFoundException {
		log.info("deleteRoomDetails() is called");
		return new ResponseEntity<>(roomDetailsService.removeRoomDetails(roomId), HttpStatus.OK);
	}

	/**
	 * showAllRoomDetails() is showing all room details
	 * 
	 * @return List<RoomDetails> : list of room details
	 */
	@GetMapping("/room")
	public List<RoomDetails> showAllRoomDetails() {
		log.info("showAllRoomDetails() is called");
		return roomDetailsService.showAllRoomDetails();
	}

	/**
	 * showRoomDetails is showing details of a room by its id 
	 * 
	 * @param int : roomId - id of a room
	 * @return ResponseEntity<RoomDetails> : details of room and HttpStatus
	 */
	@GetMapping("/room/{id}")
	public ResponseEntity<RoomDetails> showRoomDetails(@PathVariable("id") int roomId)
			throws RoomDetailsNotFoundException {
		log.info("showRoomDetails() is called");
		return new ResponseEntity<>(roomDetailsService.showRoomDetails(roomId), HttpStatus.OK);
	}

	/**
	 * updateBooking() is updating existing booking details
	 * 
	 * @param booking : a Booking object
	 * @return ResponseEntity<String> : "Booking Details updated successfully" - message and HttpStatus
	 */
	@ApiOperation(value = "update an existing Booking", response = BookingDetails.class)
	@PutMapping("/booking")
	public ResponseEntity<Double> updateBooking(@RequestBody @Valid BookingDTO booking)
			throws BookingDetailsNotFoundException, InvalidDateFormatException {
		log.info("updateBooking() is called");
		return new ResponseEntity<>(bookingDetailService.updateBookingDetails(booking), HttpStatus.ACCEPTED);
	}

	/**
	 * deleteBooking() is deleting existing booking
	 * 
	 * @param int : bookingId - id of a booking
	 * @return ResponseEntity<String> : "successfully deleted" - message and HttpSatus
	 */
	@ApiOperation(value = "delete an existing Booking", response = BookingDetails.class)
	@DeleteMapping("/booking/{id}")
	public ResponseEntity<Integer> deleteBooking(@PathVariable("id") int bookingId)
			throws BookingDetailsNotFoundException {
		log.info("deleteBooking() is called");
		return new ResponseEntity<>(bookingDetailService.removeBookingDetails(bookingId), HttpStatus.ACCEPTED);
	}

	/**
	 * geetAllBookings() is getting details all bookings
	 * 
	 * @return ResponseEntity<List<Booking>> : list of all bookings and HttpStatus 
	 */
	@ApiOperation(value = "get details of all the bookings", response = BookingDetails.class)
	@GetMapping("/booking")
	public ResponseEntity<List<BookingDTO>> getAllBookings() {
		log.info("getAllBookings() is called");
		return new ResponseEntity<>(bookingDetailService.showAllBookingDetails(), HttpStatus.OK);
	}

	/**
	 * getBookingById() is getting booking details by its id
	 * 
	 * @param int : bookingId - id of a booking
	 * @return ResponseEntity<Booking> : booking details and HttpStatus
	 */
	@ApiOperation(value = "get details of a booking by booking id", response = BookingDetails.class)
	@GetMapping("/booking/{id}")
	public ResponseEntity<BookingDTO> getBookingById(@PathVariable(name = "id") int bookingId)
			throws BookingDetailsNotFoundException {
		log.info("getBookingById() is called");
		return new ResponseEntity<>(bookingDetailService.showBookingDetails(bookingId), HttpStatus.OK);
	}
	
	/**
	 * addPayments() is adding payments
	 * 
	 * @param payments : a object of Payments entity
	 * @return payments object
	 */
	@ApiOperation(value = "insert a new Payment", response = Payments.class)
	@PostMapping
	public Payments addPayments(@RequestBody Payments payments) {
		log.info("addPayments() is called");
		return paymentService.addPayments(payments);
		
		
	}
	
	@PostMapping(path = "/login")
	public ResponseEntity<Admin> userLogin(@RequestBody LoginDTO adminLogin) throws UserNotFoundException
	{
		return new ResponseEntity<>(adminService.adminLogin(adminLogin), HttpStatus.OK);
	}

}
