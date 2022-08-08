package com.hotelbookingmanagementsystem.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
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

import com.hotelbookingmanagementsystem.entites.Hotel;
import com.hotelbookingmanagementsystem.entites.RoomDetails;
import com.hotelbookingmanagementsystem.exception.HotelNotFoundException;
import com.hotelbookingmanagementsystem.exception.RoomDetailsNotFoundException;
import com.hotelbookingmanagementsystem.repository.IRoomDetailsRepository;
import com.hotelbookingmanagementsystem.service.IRoomDetailsService;

@RunWith(SpringRunner.class)
@SpringBootTest
class RoomDetailsServiceImplTest {

	private static final Logger log = LoggerFactory.getLogger(RoomDetails.class);

	static RoomDetails roomDetails;
	static Hotel hotel;

	@MockBean
	private IRoomDetailsRepository roomDetailsRepository;

	@Autowired
	private IRoomDetailsService roomDetailsService;

	@BeforeAll
	static void initRoomDetailsObject() {
		roomDetails = new RoomDetails(0,"51000", "Type A", 4000.0, true);
		hotel = new Hotel(1, "Xyz", "Xyz", "City,State,Country", "Xyz", 0, "1", "email@demo.com", "90000000000",
				"90000000000");
		roomDetails.setHotel(hotel);
	}

	@Test
	void testValidAddRoomDetails() {
		when(roomDetailsRepository.save(roomDetails)).thenReturn(roomDetails);
		try {
			assertEquals("Room added successfully", roomDetailsService.addRoomDetails(roomDetails));
		} catch (HotelNotFoundException e) {
			log.info(e.getMessage());
		}

	}

	@Test
	void testValidUpdateRoomDetails() {
		when(roomDetailsRepository.save(roomDetails)).thenReturn(roomDetails);
		try {
			assertEquals("Room updated successfully", roomDetailsService.addRoomDetails(roomDetails));
		} catch (HotelNotFoundException e) {
			log.info(e.getMessage());
		}

	}

	@Test
	void testInValidUpdateRoomDetails() {
		when(roomDetailsRepository.findById(2)).thenReturn(Optional.empty());
		try {
			roomDetailsService.updateRoomDetails(roomDetails);
		} catch (RoomDetailsNotFoundException e) {
			assertEquals("Room Details Not Found", e.getMessage());
		} catch (HotelNotFoundException e) {
			log.info(e.getMessage());
		}
	}

	@Test
	void testValidRemoveRoomDetails() throws RoomDetailsNotFoundException {
		when(roomDetailsRepository.findById(roomDetails.getRoomId())).thenReturn(Optional.of(roomDetails));
		roomDetailsRepository.deleteFromReferenceTable(roomDetails.getRoomId());
		verify(roomDetailsRepository,times(1)).deleteFromReferenceTable(roomDetails.getRoomId());
		roomDetailsRepository.deleteById(roomDetails.getRoomId());
		verify(roomDetailsRepository,times(1)).deleteById(roomDetails.getRoomId());
		assertEquals("Room deleted successfully", roomDetailsService.removeRoomDetails(roomDetails.getRoomId()));
	}
	
	@Test
	void testInvalidRemoveRoomDetails() {
		when(roomDetailsRepository.findById(1)).thenReturn(Optional.empty());
		try {
			roomDetailsService.removeRoomDetails(0);
		} catch (RoomDetailsNotFoundException e) {
			assertEquals("Room Details Not Found", e.getMessage());
		}
	}
	
	@Test
	void testValidShowAllRoomDetails() {
		List<RoomDetails> list = new ArrayList<>();
		RoomDetails roomDetailsOne = new RoomDetails(1,"51000", "Type A", 4000.0, true);
		RoomDetails roomDetailsTwo = new RoomDetails(2,"51000", "Type A0", 400.0, true);
		Hotel hotelOne = new Hotel(1, "Xyz", "Xyz", "City,State,Country", "Xyz", 0, "1", "email@demo.com", "90000000000",
				"90000000000");
		Hotel hotelTwo = new Hotel(1, "Xyz", "Xyz", "City,State,Country", "Xyz", 0, "1", "email@demo.com", "90000000000",
				"90000000000");
		roomDetailsOne.setHotel(hotelOne);
		roomDetailsTwo.setHotel(hotelTwo);
		list.add(roomDetailsOne);
		list.add(roomDetailsTwo);
		when(roomDetailsRepository.findAll()).thenReturn(list);
		assertEquals(list, roomDetailsService.showAllRoomDetails());
	}
	
	@Test
	void testValidShowRoomDetails() {
		when(roomDetailsRepository.findById(1)).thenReturn(Optional.of(roomDetails));
		try {
			assertEquals(roomDetails, roomDetailsService.showRoomDetails(1));
		} catch (RoomDetailsNotFoundException e) {
			log.info(e.getMessage());
		}
	}
	
	@Test
	void testInvalidShowRoomDetails() {
		when(roomDetailsRepository.findById(1)).thenReturn(Optional.empty());
		try {
			roomDetailsService.showRoomDetails(0);
		} catch (Exception e) {
			assertEquals("Room Details Not Found", e.getMessage());
		}
	}
	
	@Test
	void testValidGetRoomByHotelId() {
		List<RoomDetails> list = new ArrayList<>();
		RoomDetails roomDetailsOne = new RoomDetails(1,"51000", "Type A", 4000.0, true);
		RoomDetails roomDetailsTwo = new RoomDetails(2,"51000", "Type A0", 400.0, true);
		Hotel hotelOne = new Hotel(1, "Xyz", "Xyz", "City,State,Country", "Xyz", 0, "1", "email@demo.com", "90000000000",
				"90000000000");
		roomDetailsOne.setHotel(hotelOne);
		roomDetailsTwo.setHotel(hotelOne);
		list.add(roomDetailsOne);
		list.add(roomDetailsTwo);
		
		try {
			when(roomDetailsRepository.findRoomByHotelId(1)).thenReturn(list);
			assertEquals(list, roomDetailsService.getRoomsByHotelId(1));
		} catch (Exception e) {
			log.info(e.getMessage());
		}
	}
	
	@Test
	void tesInvalidGetRoomByHotelId() {
		List<RoomDetails> list = new ArrayList<>();
		RoomDetails roomDetailsOne = new RoomDetails(1,"51000", "Type A", 4000.0, true);
		RoomDetails roomDetailsTwo = new RoomDetails(2,"51000", "Type A0", 400.0, true);
		Hotel hotelOne = new Hotel(1, "Xyz", "Xyz", "City,State,Country", "Xyz", 0, "1", "email@demo.com", "90000000000",
				"90000000000");
		roomDetailsOne.setHotel(hotelOne);
		roomDetailsTwo.setHotel(hotelOne);
		
		
		try {
			when(roomDetailsRepository.findRoomByHotelId(1)).thenReturn(list);
			roomDetailsService.getRoomsByHotelId(0);
		} catch (Exception e) {
			assertEquals("Hotel Id not found", e.getMessage());
		}
	}
	
	@AfterAll
	static void tearDownRoomDetails() {
		roomDetails=null;
	}

}
