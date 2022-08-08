package com.hotelbookingmanagementsystem.serviceimpl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hotelbookingmanagementsystem.entites.BookingDetails;
import com.hotelbookingmanagementsystem.entites.Hotel;
import com.hotelbookingmanagementsystem.entites.Payments;
import com.hotelbookingmanagementsystem.entites.RoomDetails;
import com.hotelbookingmanagementsystem.entites.Transactions;
import com.hotelbookingmanagementsystem.entites.User;
import com.hotelbookingmanagementsystem.exception.BookingDetailsNotFoundException;
import com.hotelbookingmanagementsystem.exception.InvalidDateFormatException;
import com.hotelbookingmanagementsystem.model.BookingDTO;
import com.hotelbookingmanagementsystem.repository.IBookingDetailsRepository;
import com.hotelbookingmanagementsystem.repository.IHotelRepository;
import com.hotelbookingmanagementsystem.repository.IPaymentsRepository;
import com.hotelbookingmanagementsystem.repository.IRoomDetailsRepository;
import com.hotelbookingmanagementsystem.repository.IUserRepository;
import com.hotelbookingmanagementsystem.service.IBookingDetailsService;
import com.hotelbookingmanagementsystem.utility.CalculateNoOfDaysBetweenTwoDates;

@Service
public class BookingDetailsServiceImpl implements IBookingDetailsService {

	private static final Logger log = LoggerFactory.getLogger(BookingDetailsServiceImpl.class);

	static final String MESSAGE = "Booking id is not present";

	@Autowired
	IBookingDetailsRepository bookingDetailsRepository;

	@Autowired
	IRoomDetailsRepository roomDetailsRepository;

	@Autowired
	IUserRepository userRepository;

	@Autowired
	IHotelRepository hotelRepository;

	@Autowired
	IPaymentsRepository paymentRepository;
	
	/**
	 * this method is a mapper from bookingdto pojo class to bookingdetails entity
	 * 
	 * @param booking : a bookingdto class object
	 */
	public double mapBookingToBookingDetails(BookingDTO booking) throws InvalidDateFormatException {
		//creating the objects
		BookingDetails bookingDetails = new BookingDetails();
		Transactions transaction = new Transactions();
		Payments payment = new Payments();

		// getting hotel details by hotel id
		Hotel hotel = hotelRepository.findById(booking.getHotelId()).orElse(null);
		// getting room details by room id
		RoomDetails roomDetails = roomDetailsRepository.findById(booking.getRoomId()).orElse(null);
		// getting user details by user id
		User user = userRepository.findById(booking.getUserId()).orElse(null);

		log.info("calculating the amount");
		// calculate the no. of days as well as the total amount
		int amount = CalculateNoOfDaysBetweenTwoDates.calculate(booking.getBookingFromDate(),
				booking.getBookingToDate()) * roomDetailsRepository.getRoomFareByRoomId(booking.getRoomId());

		// setting the details in bookingDetails entity
		if(booking.getBookingId()!=0) {
			bookingDetails.setBookingId(booking.getBookingId());
		}
		bookingDetails.setHotel(hotel);
		bookingDetails.setUser(user);
		List<RoomDetails> roomDetailsList = new ArrayList<>();
		roomDetailsList.add(roomDetails);
		bookingDetails.setRoomDetails(roomDetailsList);
		bookingDetails.setBookedFrom(booking.getBookingFromDate());
		bookingDetails.setBookedTo(booking.getBookingToDate());
		bookingDetails.setNoOfAdults(booking.getNoOfAdults());
		bookingDetails.setNoOfChildren(booking.getNoOfChildren());
		bookingDetails.setAmount(amount);

		log.info("saving the booking details");
		bookingDetailsRepository.save(bookingDetails);

		// Inserting the transaction object
		transaction.setAmount(amount);

		// Inserting the payment object
		payment.setTransaction(transaction);
		payment.setBookingDetails(bookingDetails);

		paymentRepository.save(payment);
		
		return amount;
	}

	/**
	 * addBookingDetails() is adding new booking details, transaction and payment
	 * saving the room details, hotel, user with the bookingDetails setting the room
	 * availability to not available then calculating the amount for the room
	 * according to days and room fare setting the room details such as booking from
	 * and to date, no of children, no of adults and amount and saving all the
	 * booking details inserting the amount to transaction and then to payment and
	 * saving it return success message
	 * 
	 * @param BookingDTO : a object of Booking class
	 * 
	 * @return String : success message
	 */
	@Override
	@Transactional
	public double addBookingDetails(BookingDTO booking) throws InvalidDateFormatException {
		log.info("addBookingDetails() is called");

		// making the availability of room to false
		roomDetailsRepository.makeRoomUnavailable(false, booking.getRoomId());

		// mapping the bookingdto object to bookingdetails object
		return mapBookingToBookingDetails(booking);

//		return "Booking Details created successfully";
	}

	/**
	 * updateBookingDetails() is updating booking details if booking details are
	 * found then updating all details making the availability of previous room true
	 * and new room to false calculating the new amount setting the room details
	 * such as booking from and to date, no of children, no of adults and amount and
	 * saving all the booking details inserting the amount to transaction and then
	 * to payment and saving it return success message
	 * 
	 * @param BookingDTO : a object of Booking class
	 * 
	 * @return String : success message
	 */
	@Override
	public double updateBookingDetails(BookingDTO booking)
			throws BookingDetailsNotFoundException, InvalidDateFormatException {
		log.info("updateBookingDetails() is called");
		BookingDetails getBookingDetails = bookingDetailsRepository.findById(booking.getBookingId()).orElse(null);

		if (getBookingDetails != null) {
			log.info("Booking details found");
			log.info("start updating");

			// if we delete all the rooms attached with that booking then no need to set the
			// availability of that room
			if (!getBookingDetails.getRoomDetails().isEmpty()
					&& getBookingDetails.getRoomDetails().get(0).getRoomId() != booking.getRoomId()) {
				// making the availability of previous room to true
				roomDetailsRepository.makeRoomavailable(true, getBookingDetails.getRoomDetails().get(0).getRoomId());
			}

			// making the availability of current room to false
			roomDetailsRepository.makeRoomUnavailable(false, booking.getRoomId());

			// mapping the bookingdto object to bookingdetails object
			return mapBookingToBookingDetails(booking);

			//return "Booking Details updated successfully";

		} else {
			log.info(MESSAGE);
			throw new BookingDetailsNotFoundException(MESSAGE);
		}
	}

	/**
	 * removeBookingDetails() is removing booking details making the room
	 * availability true deleting the details by booking id else throw an exception
	 * 
	 * @param int : bookingId - booking id of booking
	 * 
	 * @return String : success message
	 */
	@Override
	public int removeBookingDetails(int bookingId) throws BookingDetailsNotFoundException {
		log.info("removeBookingDetails() is called");
		// getting booking details by booking id
		BookingDetails getBookingDetails = bookingDetailsRepository.findById(bookingId).orElse(null);
		if (getBookingDetails != null) {
			log.info("booking id found..");
			log.info("making the room available");
			// As deleting the booking so making the room available
			roomDetailsRepository.makeRoomavailable(true, roomDetailsRepository.getRoomIdByBookingId(bookingId));

			log.info("deleting the room");
			bookingDetailsRepository.deleteById(bookingId);
			return bookingId;
		} else {
			log.info(MESSAGE);
			throw new BookingDetailsNotFoundException(MESSAGE);
		}
	}

	/**
	 * showAllBookingDetails() is fetching all the list of booking and returning the
	 * list of booking
	 * 
	 * 
	 * @return List of booking
	 */
	@Override
	public List<BookingDTO> showAllBookingDetails() {
		log.info("showAllBookingDetails() is called");

		// finding all bookingDetails
		List<BookingDetails> bookingDetailsList = bookingDetailsRepository.findAll();
		List<BookingDTO> bookingList = new ArrayList<>();

		log.info("start mapping bookingdetails to booking");
		// map bookingDetails to booking
		for (BookingDetails bookingDetails : bookingDetailsList) {

			BookingDTO booking = new BookingDTO(bookingDetails.getBookingId(), bookingDetails.getHotel().getHotelId(),
					bookingDetails.getUser().getUserId(), bookingDetails.getRoomDetails().get(0).getRoomId(),
					bookingDetails.getBookedFrom(), bookingDetails.getBookedTo(), bookingDetails.getNoOfAdults());
			booking.setNoOfChildren(bookingDetails.getNoOfChildren());
			booking.setAmount(bookingDetails.getAmount());

			bookingList.add(booking);
		}

		log.info("returning the list");
		return bookingList;

	}

	/**
	 * showBookingDetails() is fetching the details of booking by booking id if
	 * bookingDetails is not null, returning the details of booking else throw an
	 * exception
	 * 
	 * @param int : bookingId - booking id of booking
	 * 
	 * @return booking details
	 */
	@Override
	public BookingDTO showBookingDetails(int bookingId) throws BookingDetailsNotFoundException {

		log.info("showBookingDetails() is called");
		// getting booking details by booking id
		BookingDetails bookingDetails = bookingDetailsRepository.findById(bookingId).orElse(null);

		// map bookingDetails to booking
		if (bookingDetails != null) {
			log.info("booking details found");
			BookingDTO booking = new BookingDTO(bookingDetails.getBookingId(), bookingDetails.getHotel().getHotelId(),
					bookingDetails.getUser().getUserId(), bookingDetails.getRoomDetails().get(0).getRoomId(),
					bookingDetails.getBookedFrom(), bookingDetails.getBookedTo(), bookingDetails.getNoOfAdults());
			booking.setNoOfChildren(bookingDetails.getNoOfChildren());
			booking.setAmount(bookingDetails.getAmount());
			log.info("returning the booking details");
			return booking;
		} else {
			log.info(MESSAGE);
			throw new BookingDetailsNotFoundException(MESSAGE);
		}
	}

	@Override
	public BookingDTO getBookingDetailsByUser(int userId) throws BookingDetailsNotFoundException {
		
		User user = userRepository.findById(userId).orElse(null);
		BookingDetails bookingDetails = bookingDetailsRepository.findByUser(user);
		
		if(bookingDetails != null ) {
			log.info("booking details found");
			BookingDTO booking = new BookingDTO(bookingDetails.getBookingId(), bookingDetails.getHotel().getHotelId(),
					bookingDetails.getUser().getUserId(), bookingDetails.getRoomDetails().get(0).getRoomId(),
					bookingDetails.getBookedFrom(), bookingDetails.getBookedTo(), bookingDetails.getNoOfAdults());
			booking.setNoOfChildren(bookingDetails.getNoOfChildren());
			booking.setAmount(bookingDetails.getAmount());
			log.info("returning the booking details");
			return booking;
		}else {
			log.info(MESSAGE);
			throw new BookingDetailsNotFoundException(MESSAGE);
		}
	}

}
