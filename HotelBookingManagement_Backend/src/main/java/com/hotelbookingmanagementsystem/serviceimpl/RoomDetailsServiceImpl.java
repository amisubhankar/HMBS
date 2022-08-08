package com.hotelbookingmanagementsystem.serviceimpl;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbookingmanagementsystem.entites.Hotel;
import com.hotelbookingmanagementsystem.entites.RoomDetails;
import com.hotelbookingmanagementsystem.exception.HotelNotFoundException;
import com.hotelbookingmanagementsystem.exception.RoomDetailsNotFoundException;
import com.hotelbookingmanagementsystem.repository.IHotelRepository;
import com.hotelbookingmanagementsystem.repository.IRoomDetailsRepository;
import com.hotelbookingmanagementsystem.service.IRoomDetailsService;

@Service
public class RoomDetailsServiceImpl implements IRoomDetailsService {
	private static final String MESSAGE = "Room Details Not Found";

	@Autowired
	IRoomDetailsRepository roomDetailsRepository;

	@Autowired
	IHotelRepository hotelRepository;

	private static final Logger log = LoggerFactory.getLogger(RoomDetailsServiceImpl.class);

	/**
	 * addRoomDetails() is adding room details and if hotel is present, then saving
	 * the room details else throw an exception
	 * 
	 * @param RoomDetails : a object of RoomDetails class
	 * 
	 * @return String : success message
	 */
	@Override
	public String addRoomDetails(RoomDetails roomDetails) throws HotelNotFoundException {
		log.info("In AddroomDetails Method");
		Hotel hotel = hotelRepository.findById(roomDetails.getHotelId()).orElseThrow(
				() -> new HotelNotFoundException("Hotel with id " + roomDetails.getHotelId() + " is not present"));

		roomDetails.setHotel(hotel);
		roomDetailsRepository.save(roomDetails);
		log.info("Hotel Added Successfully");
		return "Room added successfully";
	}

	/**
	 * updateRoomDetails() is updating room details and if room details is present
	 * using findById() then update details else throw an exception
	 * 
	 * @param RoomDetails : a object of RoomDetails class
	 * 
	 * @return String : success message
	 */
	@Override
	public String updateRoomDetails(RoomDetails roomDetails)
			throws RoomDetailsNotFoundException, HotelNotFoundException {
		log.info("In updateRoomDetails Method");
		RoomDetails existingRoomDetails = roomDetailsRepository.findById(roomDetails.getRoomId())
				.orElseThrow(() -> new RoomDetailsNotFoundException(MESSAGE));

		Hotel hotel = hotelRepository.findById(roomDetails.getHotelId()).orElseThrow(
				() -> new HotelNotFoundException("Hotel with id " + roomDetails.getHotelId() + " is not present"));
		existingRoomDetails.setRoomNo(roomDetails.getRoomNo());

		existingRoomDetails.setRoomType(roomDetails.getRoomType());
		existingRoomDetails.setRatePerDay(roomDetails.getRatePerDay());
		existingRoomDetails.setAvailable(roomDetails.isAvailable());
		existingRoomDetails.setPhoto(roomDetails.getPhoto());
		existingRoomDetails.setHotel(hotel);
		log.info("room Updated Successfully");
		roomDetailsRepository.save(existingRoomDetails);

		return "Room updated successfully";
	}

	/**
	 * removeRoomDetails() is deleting details if details are present using
	 * findById() else throw an exception
	 * 
	 * @param int : Id of a room
	 * 
	 * @return String : success message or exception
	 */
	@Override
	public String removeRoomDetails(int roomId) throws RoomDetailsNotFoundException {
		log.info("In removeRoomDetails Method");
		if (roomDetailsRepository.findById(roomId).orElse(null) != null) {
			roomDetailsRepository.deleteFromReferenceTable(roomId);
			log.info("room deleted successfully");
			roomDetailsRepository.deleteById(roomId);
			return "Room deleted successfully";
		} else {
			log.info("room not found");
			throw new RoomDetailsNotFoundException(MESSAGE);
		}
	}

	/**
	 * showAllRoomDetails() is fetching all room details and returning the list
	 * 
	 * @return List of room details
	 */
	@Override
	public List<RoomDetails> showAllRoomDetails() {
		log.info("In showAllRoom method");
		List<RoomDetails> roomDetailsList = roomDetailsRepository.findAll();
		// setting the hotelId to every room object
		for (RoomDetails roomDetails : roomDetailsList) {
			roomDetails.setHotelId(roomDetails.getHotel().getHotelId());
		}
		return roomDetailsList;
	}

	/**
	 * RoomDetails() fetch the room details by room id if roomDetails is not null
	 * then return the room details else throw an exception
	 * 
	 * @param int : roomDetailsId - id of room details
	 * 
	 * @return roomDetails - room details
	 */
	@Override
	public RoomDetails showRoomDetails(int roomDetailsId) throws RoomDetailsNotFoundException {
		log.info("In showRoom Method");
		RoomDetails roomDetails = roomDetailsRepository.findById(roomDetailsId).orElse(null);
		if (roomDetails != null) {
			// setting the hotelId to room object
			roomDetails.setHotelId(roomDetails.getHotel().getHotelId());
			return roomDetails;
		} else {
			log.info("room not found");
			throw new RoomDetailsNotFoundException(MESSAGE);
		}
	}

	/**
	 * getRoomsByHotelId() is fetching all room details by hotel id(if present)
	 * according to the availability of room and returning the list
	 * 
	 * @param int : id of a hotel
	 * 
	 * @return List of room details
	 */
	@Override
	public List<RoomDetails> getRoomsByHotelId(int hotelId)
			throws HotelNotFoundException, RoomDetailsNotFoundException {
		log.info("In getRoomByHotelId Method");
		
		if (hotelRepository.findById(hotelId).orElse(null) == null) {
			log.info("hotel not found");
			throw new HotelNotFoundException("Hotel Id not found");
		}

		List<RoomDetails> roomDetailsList = roomDetailsRepository.findRoomByHotelId(hotelId);
		if (roomDetailsList != null) {
			return roomDetailsList;
		} else {
			log.info("no room is available for this hotel");
			throw new RoomDetailsNotFoundException("No room is available in this hotel");
		}
	}
	
	@Override
	public List<RoomDetails> getAllRoomsByHotelId(int hotelId) throws HotelNotFoundException, RoomDetailsNotFoundException {
		if (hotelRepository.findById(hotelId).orElse(null) == null) {
			log.info("hotel not found");
			throw new HotelNotFoundException("Hotel Id not found");
		}

		List<RoomDetails> roomDetailsList = roomDetailsRepository.findAllRoomByHotelId(hotelId);
		if (roomDetailsList != null) {
			return roomDetailsList;
		} else {
			log.info("no room is available for this hotel");
			throw new RoomDetailsNotFoundException("No room is available in this hotel");
		}
	}

}
