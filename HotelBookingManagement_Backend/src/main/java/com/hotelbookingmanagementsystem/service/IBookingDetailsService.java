package com.hotelbookingmanagementsystem.service;

import java.util.List;

import com.hotelbookingmanagementsystem.exception.BookingDetailsNotFoundException;
import com.hotelbookingmanagementsystem.exception.InvalidDateFormatException;
import com.hotelbookingmanagementsystem.model.BookingDTO;


public interface IBookingDetailsService {
	public double addBookingDetails(BookingDTO booking) throws InvalidDateFormatException ;

	public double updateBookingDetails(BookingDTO booking) throws BookingDetailsNotFoundException, InvalidDateFormatException;

	public int removeBookingDetails(int bookingId) throws BookingDetailsNotFoundException;

	public List<BookingDTO> showAllBookingDetails();

	public BookingDTO showBookingDetails(int bookingId) throws BookingDetailsNotFoundException;
	
	public BookingDTO getBookingDetailsByUser(int userId) throws BookingDetailsNotFoundException;
}
