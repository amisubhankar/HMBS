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

import com.hotelbookingmanagementsystem.entites.Hotel;
import com.hotelbookingmanagementsystem.entites.RoomDetails;
import com.hotelbookingmanagementsystem.entites.User;
import com.hotelbookingmanagementsystem.exception.BookingDetailsNotFoundException;
import com.hotelbookingmanagementsystem.exception.HotelNotFoundException;
import com.hotelbookingmanagementsystem.exception.InvalidDateFormatException;
import com.hotelbookingmanagementsystem.exception.RoomDetailsNotFoundException;
import com.hotelbookingmanagementsystem.exception.UserNotFoundException;
import com.hotelbookingmanagementsystem.model.BookingDTO;
import com.hotelbookingmanagementsystem.model.LoginDTO;
import com.hotelbookingmanagementsystem.model.UserDTO;
import com.hotelbookingmanagementsystem.model.UserLoginDTO;
import com.hotelbookingmanagementsystem.service.IBookingDetailsService;
import com.hotelbookingmanagementsystem.service.IHotelService;
import com.hotelbookingmanagementsystem.service.IRoomDetailsService;
import com.hotelbookingmanagementsystem.service.IUserService;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api(value = "Api controller to handle User")
@RestController
@CrossOrigin
@RequestMapping(path = "/hbms/user")
public class UserController {
	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	IUserService userService;

	@Autowired
	IBookingDetailsService bookingService;

	@Autowired
	IHotelService hotelService;

	@Autowired
	IRoomDetailsService roomDetailsService;

	/**
	 * addUser is adding new User
	 * 
	 * @param User
	 * @return String---(User added successfully) or throw a exception(User already
	 *         exists)
	 */
	@ApiOperation(value = "create a new User", response = User.class)
	@PostMapping
	public ResponseEntity<User> addUser(@RequestBody @Valid User user) throws UserNotFoundException {
		log.info("addUser() is called");
		return new ResponseEntity<>(userService.addUser(user), HttpStatus.OK);
	}

	/**
	 * updateUser is updating a existing user
	 * 
	 * @param user
	 * @return String---(User updated successfully) or (Invalid Password) or throw a
	 *         Exception(User Not Found)
	 */
	@ApiOperation(value = "update a existing User", response = User.class)
	@PutMapping
	public ResponseEntity<User> updateUser(@RequestBody @Valid User user) throws UserNotFoundException {
		log.info("updateUser() is called");
		return new ResponseEntity<>(userService.updateUser(user), HttpStatus.OK);
	}

	/**
	 * deleteUser is deleting a existing user
	 * 
	 * @param userLoginDTO
	 * @return String---(User deleted successfully) Or throw exception(User not
	 *         Found)
	 */
	@ApiOperation(value = "remove a existing User", response = User.class)
	@DeleteMapping(path = "/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable("id") int userId) throws UserNotFoundException {
		log.info("deleteUser() is called");
		return new ResponseEntity<>(userService.removeUser(userId), HttpStatus.OK);
	}

	/**
	 * showAllHotels
	 * 
	 * @param
	 * @return List<Hotel>
	 */
	@ApiOperation(value = "view all the availabe hotels", response = User.class)
	@GetMapping(path = "/hotel")
	public ResponseEntity<List<Hotel>> showAllHotels() {
		log.info("showAllHotel() is called");
		List<Hotel> hotelList = hotelService.showAllHotel();
		return new ResponseEntity<>(hotelList, HttpStatus.OK);
	}

	/**
	 * showRoomByHotelid is showing all the available room for a hotel
	 * 
	 * @param int
	 * @return List<RoomDetails>
	 * @throws RoomDetailsNotFoundException 
	 * @throws HotelNotFoundException 
	 */
	@ApiOperation(value = "view all the availabe rooms for a particular hotel", response = User.class)
	@GetMapping(path = "/hotel/{id}")
	public ResponseEntity<List<RoomDetails>> showRoomByHotelId(@PathVariable("id") int hotelId) throws HotelNotFoundException, RoomDetailsNotFoundException {
		log.info("showRoomByHotelId() is called");
		List<RoomDetails> roomList = roomDetailsService.getRoomsByHotelId(hotelId);
		return new ResponseEntity<>(roomList, HttpStatus.OK);
	}

	/**
	 * bookHotel() is booking a hotel by giving booking details
	 * 
	 * @param Booking
	 * @return String--- "Booking Details created successfully"
	 */
	@ApiOperation(value = "book hotels", response = User.class)
	@PostMapping(path = "/bookhotel")
	public ResponseEntity<Double> bookHotel(@RequestBody @Valid BookingDTO booking) throws InvalidDateFormatException {
		log.info("bookHotel() is called");
		return new ResponseEntity<>(bookingService.addBookingDetails(booking), HttpStatus.OK);
	}
	
	@ApiOperation(value = "get booking details by userId", response = User.class)
	@GetMapping(path = "/getbooking/{id}")
	public ResponseEntity<BookingDTO> getBookingDetailsByUser(@PathVariable("id") int userId) throws BookingDetailsNotFoundException {
		log.info("getBookingDetailsByUser() is called");
		return new ResponseEntity<>(bookingService.getBookingDetailsByUser(userId), HttpStatus.OK);
	}
 
	@PostMapping(path = "/login")
	public ResponseEntity<User> userLogin(@RequestBody LoginDTO userLogin) throws UserNotFoundException
	{
		return new ResponseEntity<>(userService.userLogin(userLogin), HttpStatus.OK);
	}
	
	@ApiOperation(value = "view all the room in hotels", response = User.class)
	@GetMapping(path = "/allhotel/{id}")
	public ResponseEntity<List<RoomDetails>> showAllRoomByHotelId(@PathVariable("id")int hotelId) throws HotelNotFoundException, RoomDetailsNotFoundException {
		log.info("showAllRoomByHotelId() is called");
		List<RoomDetails> roomList = roomDetailsService.getAllRoomsByHotelId(hotelId);
		return new ResponseEntity<>(roomList, HttpStatus.OK);
	}
	
	@GetMapping(path = "/getbyemail/{email}")
	public ResponseEntity<User> getByEmail(@PathVariable("email") String email) throws UserNotFoundException
	{
		return new ResponseEntity<>(userService.getByEmail(email),HttpStatus.OK);
	}
}
