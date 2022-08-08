package com.hotelbookingmanagementsystem.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.AfterAll;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.hotelbookingmanagementsystem.entites.BookingDetails;
import com.hotelbookingmanagementsystem.entites.Hotel;
import com.hotelbookingmanagementsystem.entites.Payments;
import com.hotelbookingmanagementsystem.entites.RoomDetails;
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

@RunWith(SpringRunner.class)
@SpringBootTest
class BookingDetailsServiceImplTest {

	private static final Logger log = 
			LoggerFactory.getLogger(BookingDetails.class);
	
	static List<RoomDetails> roomDetailList;
	static BookingDTO booking;
	static Hotel hotel; 
	static RoomDetails roomDetails;
	static User user;
	static BookingDetails bookingDetails;
	static Payments payment;
	
	@MockBean
	IBookingDetailsRepository bookingDetailsRepository;
	
	@MockBean
	IHotelRepository hotelRepository;
	
	@MockBean
	IRoomDetailsRepository roomDetailsRepository;
	
	@MockBean
	IUserRepository userRepository;
	
	@MockBean
	CalculateNoOfDaysBetweenTwoDates calculateNoOfDays;
	
	@MockBean
	IPaymentsRepository paymentRepository;
	
	@MockBean
	BookingDetails getbookingDetails;
	
	@Autowired
	IBookingDetailsService bookingDetailsService;
	
	@BeforeAll
	static void initBookingDetailObject() {
		roomDetailList = new ArrayList<>();
		booking = new BookingDTO(1, 1, 1, 1, new Date(2022,04,19), new Date(2022,04,19), 2);
		booking.setNoOfChildren(0);
		hotel = new Hotel(1,"Nizamuddin","Raj Hotel","2/3, Rani chawk","Fantasctic view",1200,"rajhotel@mail.com","1234567890","1234567890","rajhotel.com");
		roomDetails = new RoomDetails(1,"101","Deluxe",1400.0,true);
		user = new User(1,"Rajat","rjt@mail.com","string12","Premium","1234567890","Kolkata");
		bookingDetails = new BookingDetails(1,new Date(2022,04,19),new Date(2022,04,19),2,0,1000);
		roomDetailList.add(roomDetails);
		bookingDetails.setRoomDetails(roomDetailList);
		bookingDetails.setHotel(hotel);
		bookingDetails.setUser(user);
		payment = new Payments();
	}
	
	@Test
	void testValidAddBookingDetails() throws InvalidDateFormatException {
		when(hotelRepository.findById(booking.getHotelId())).thenReturn(Optional.of(hotel));
		when(roomDetailsRepository.findById(booking.getRoomId())).thenReturn(Optional.of(roomDetails));
		when(userRepository.findById(booking.getUserId())).thenReturn(Optional.of(user));
		roomDetailsRepository.makeRoomUnavailable(false,booking.getRoomId());
		verify(roomDetailsRepository, times(1)).makeRoomUnavailable(false,booking.getRoomId());
		when(roomDetailsRepository.getRoomFareByRoomId(booking.getRoomId())).thenReturn(1000);
		when(bookingDetailsRepository.save(bookingDetails)).thenReturn(bookingDetails);
		when(paymentRepository.save(payment)).thenReturn(payment);
		
		assertEquals(1000.0, bookingDetailsService.addBookingDetails(booking));
	}
	
	@Test
	void testValidUpdateBookingDetails() throws BookingDetailsNotFoundException, InvalidDateFormatException {
		
		when(bookingDetailsRepository.findById(booking.getBookingId())).thenReturn(Optional.of(bookingDetails));
		when(hotelRepository.findById(booking.getHotelId())).thenReturn(Optional.of(hotel));
		when(roomDetailsRepository.findById(booking.getRoomId())).thenReturn(Optional.of(roomDetails));
		when(userRepository.findById(booking.getUserId())).thenReturn(Optional.of(user));
		roomDetailsRepository.makeRoomavailable(true, booking.getRoomId());
		verify(roomDetailsRepository, times(1)).makeRoomavailable(true,booking.getRoomId());
		roomDetailsRepository.makeRoomUnavailable(false,booking.getRoomId());
		verify(roomDetailsRepository, times(1)).makeRoomUnavailable(false,booking.getRoomId());
		when(roomDetailsRepository.getRoomFareByRoomId(booking.getRoomId())).thenReturn(1000);
		//when(calculateNoOfDays.calculate(booking.getBookingFromDate(), booking.getBookingToDate())).thenReturn(2);
		
		when(bookingDetailsRepository.save(bookingDetails)).thenReturn(bookingDetails);
		when(paymentRepository.save(payment)).thenReturn(payment);
		
		assertEquals(1000.0, bookingDetailsService.updateBookingDetails(booking));
	}
	
	@Test
	void testInvalidUpdateBookingDetails() throws InvalidDateFormatException {
		when(bookingDetailsRepository.findById(1)).thenReturn(Optional.empty());
		
		try {
			bookingDetailsService.updateBookingDetails(booking);
		} catch (BookingDetailsNotFoundException e) {
			assertEquals("Booking id is not present", e.getMessage());
		}
	}
	
	@Test
	void testValidRemoveBookingDetails() throws BookingDetailsNotFoundException {
		
		when(bookingDetailsRepository.findById(1)).thenReturn(Optional.of(bookingDetails));
		roomDetailsRepository.makeRoomavailable(true, booking.getRoomId());
		verify(roomDetailsRepository, times(1)).makeRoomavailable(true,booking.getRoomId());
		
		bookingDetailsRepository.deleteById(1);
		verify(bookingDetailsRepository, times(1)).deleteById(1);
		
		assertEquals(1, bookingDetailsService.removeBookingDetails(1));
	}
	
	@Test
	void testInvalidRemoveBookingDetails() {
		when(bookingDetailsRepository.findById(1)).thenReturn(Optional.empty());
		
		try {
			bookingDetailsService.removeBookingDetails(1);
		} catch (BookingDetailsNotFoundException e) {
			assertEquals("Booking id is not present", e.getMessage());
		}
	}
	
	@Test
	void testShowAllBookingDetails() {
		List<BookingDetails> bookingDetailslist = new ArrayList<BookingDetails>();
		
		bookingDetailslist.add(bookingDetails);
		
		when(bookingDetailsRepository.findAll()).thenReturn(bookingDetailslist);
		
		List<BookingDTO> bookingList = new ArrayList<>();
		BookingDetails bookingDetail = bookingDetailslist.get(0);
		BookingDTO newBooking = new BookingDTO(bookingDetail.getBookingId(),bookingDetail.getHotel().getHotelId(), 
				  bookingDetail.getUser().getUserId(), bookingDetail.getRoomDetails().get(0).getRoomId(),
				  bookingDetail.getBookedFrom(), bookingDetail.getBookedTo(), 
				  bookingDetail.getNoOfAdults());
		newBooking.setNoOfChildren(bookingDetail.getNoOfChildren());
		bookingList.add(newBooking);
		
		assertEquals(bookingList.toString(),bookingDetailsService.showAllBookingDetails().toString());
	}
	
	@Test
	void testValidShowBookingDetails() {
		when(bookingDetailsRepository.findById(1)).thenReturn(Optional.of(bookingDetails));
		BookingDTO booking = new BookingDTO(bookingDetails.getBookingId(),bookingDetails.getHotel().getHotelId(), 
				  bookingDetails.getUser().getUserId(), bookingDetails.getRoomDetails().get(0).getRoomId(),
				  bookingDetails.getBookedFrom(), bookingDetails.getBookedTo(), 
				  bookingDetails.getNoOfAdults());
		booking.setNoOfChildren(bookingDetails.getNoOfChildren());
		
		try {
			assertEquals(booking.toString(), bookingDetailsService.showBookingDetails(1).toString());
		} catch (BookingDetailsNotFoundException e) {
			log.info(e.getMessage());
		}
	}
	
	@Test
	void testInvalidShowBookingDetails() {
		when(bookingDetailsRepository.findById(1)).thenReturn(Optional.empty());
		
		try {
			bookingDetailsService.showBookingDetails(10);
		} catch (BookingDetailsNotFoundException e) {
			assertEquals("Booking id is not present", e.getMessage());
		}
	}
	
	@AfterAll
	static void tearDownBookingDetail() {
		
		roomDetailList = null;
		booking = null;
		hotel = null;
		roomDetails = null;
		user = null;
		bookingDetails = null;
		payment = null;
	}
}
