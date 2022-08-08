package com.hotelbookingmanagementsystem.serviceimpl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hotelbookingmanagementsystem.entites.Hotel;
import com.hotelbookingmanagementsystem.exception.HotelNotFoundException;
import com.hotelbookingmanagementsystem.repository.IBookingDetailsRepository;
import com.hotelbookingmanagementsystem.repository.IHotelRepository;
import com.hotelbookingmanagementsystem.repository.IPaymentsRepository;
import com.hotelbookingmanagementsystem.repository.IRoomDetailsRepository;
import com.hotelbookingmanagementsystem.service.IHotelService;

@Service
public class HotelServiceImpl implements IHotelService {
	private static final Logger log = LoggerFactory.getLogger(HotelServiceImpl.class);

	private static final String HOTELNOTFOUND = "Hotel Not Found";
	@Autowired
	IHotelRepository hotelRepository;

	@Autowired
	IBookingDetailsRepository bookingDetailsRepository;

	@Autowired
	IRoomDetailsRepository roomDetailRepository;

	@Autowired
	IPaymentsRepository paymentRepository;

	/**
	 * addHotel() is adding hotel and saving in database
	 * 
	 * @param Hotel : a hotel object
	 * 
	 * @return String : success message
	 */
	@Override
	public String addHotel(Hotel hotel) {
		log.info("In Addhotel Method");
		hotelRepository.save(hotel);
		log.info("Hotel Added Successfully");
		return "Hotel added successfully";
	}

	/**
	 * updateHotel() is updating hotel and if HotelId is present then updating the
	 * hotel in database else throw an exception
	 * 
	 * @param Hotel : a hotel object
	 * 
	 * @return String : success message or exception
	 */
	public String updateHotel(Hotel hotel) throws HotelNotFoundException {
		log.info("In updatehotel Method");
		if (hotelRepository.findById(hotel.getHotelId()).isPresent()) {
			hotelRepository.save(hotel);
			log.info("hotel updated successfully");
			return "Hotel updated successfully";
		}
		log.info(HOTELNOTFOUND);
		throw new HotelNotFoundException(HOTELNOTFOUND);
	}

	/**
	 * removeHotel() is removing hotel if hotelId() is present then deleting the
	 * hotel from database else throw an exception
	 * 
	 * @param int : id of a hotel
	 * 
	 * @return String : success message or exception
	 */
	public String removeHotel(int hotelId) throws HotelNotFoundException {
		log.info("In removehotel Method");
		if (hotelRepository.findById(hotelId).isPresent()) {
			log.info("Hotel deleted successfully");
			hotelRepository.deleteById(hotelId);
			return "Hotel deleted successfully";
		}
		log.info(HOTELNOTFOUND);
		throw new HotelNotFoundException(HOTELNOTFOUND);
	}

	/**
	 * showAllHotel() is fetching all hotels and returning the list
	 * 
	 * 
	 * @return List of hotels
	 */
	public List<Hotel> showAllHotel() {
		log.info("In showAllhotel Method");
		return hotelRepository.findAll();
	}

	/**
	 * showHotel() shows the hotel by hotel id if hotelId is present then return the
	 * hotel else throw an exception
	 * 
	 * @param int : id of hotel
	 * 
	 * @return Hotel details
	 */
	public Hotel showHotel(int hotelId) throws HotelNotFoundException {
		log.info("In showHotel Method");
		if (hotelRepository.findById(hotelId).isPresent())
			return hotelRepository.findById(hotelId).orElse(null);
		log.info(HOTELNOTFOUND);
		throw new HotelNotFoundException(HOTELNOTFOUND);
	}

}
