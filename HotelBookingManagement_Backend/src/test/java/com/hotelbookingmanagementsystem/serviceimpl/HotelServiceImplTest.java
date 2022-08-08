package com.hotelbookingmanagementsystem.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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
import com.hotelbookingmanagementsystem.exception.HotelNotFoundException;
import com.hotelbookingmanagementsystem.repository.IHotelRepository;
import com.hotelbookingmanagementsystem.service.IHotelService;

@RunWith(SpringRunner.class)
@SpringBootTest
public class HotelServiceImplTest {

	private static final Logger log = LoggerFactory.getLogger(Hotel.class);
	@MockBean
	IHotelRepository hotelRepository;

	@Autowired
	IHotelService hotelService;

	static Hotel hotel;

	@BeforeAll
	public static void initHotel() {
		hotel = new Hotel(1, "Xyz", "Xyz", "City,State,Country", "Xyz", 0, "1", "email@demo.com", "90000000000",
				"90000000000");
	}

	@Test
	void testValidAddHotel() {

		when(hotelRepository.save(hotel)).thenReturn(hotel);
		assertEquals("Hotel added successfully", hotelService.addHotel(hotel));

	}

	@Test
	void testValidUpdateHotel() {
		when(hotelRepository.findById(hotel.getHotelId())).thenReturn(Optional.of(hotel));
		when(hotelRepository.save(hotel)).thenReturn(hotel);
		try {
			assertEquals("Hotel updated successfully", hotelService.updateHotel(hotel));
		} catch (HotelNotFoundException e) {
			log.info(e.getMessage());
		}
	}

	@Test
	void testValidUpdateHotelException() {
		when(hotelRepository.findById(hotel.getHotelId())).thenReturn(Optional.empty());
		when(hotelRepository.save(hotel)).thenReturn(hotel);
		try {
			assertEquals("Hotel updated successfully", hotelService.updateHotel(hotel));
		} catch (HotelNotFoundException e) {
			assertEquals("Hotel Not Found", e.getMessage());
		}
	}

	@Test
	void testValidRemoveHotel() {
		when(hotelRepository.findById(hotel.getHotelId())).thenReturn(Optional.of(hotel));
	//	when(hotelRepository.save(hotel)).thenReturn(hotel);
		try {
			hotelService.removeHotel(hotel.getHotelId());
			verify(hotelRepository, times(1)).deleteById(hotel.getHotelId());
			assertEquals("Hotel deleted successfully", hotelService.removeHotel(hotel.getHotelId()));
		} catch (HotelNotFoundException e) {

			log.info(e.getMessage());
		}

	}

	@Test
	void testInvalidRemoveHotel() {

		when(hotelRepository.findById(hotel.getHotelId())).thenReturn(Optional.empty());
		try {
			hotelService.removeHotel(hotel.getHotelId());

		} catch (HotelNotFoundException e) {

			assertEquals("Hotel Not Found", e.getMessage());
		}
	}

	@Test
	void testValidShowAllHotel() {
		List<Hotel> list = new ArrayList<Hotel>();
		list.add(hotel);
		when(hotelRepository.findAll()).thenReturn(list);
		assertEquals(list, hotelService.showAllHotel());
	}

	@Test
	void testValidShowHotel() {

		when(hotelRepository.findById(hotel.getHotelId())).thenReturn(Optional.of(hotel));
		try {
			assertEquals(hotel, hotelService.showHotel(hotel.getHotelId()));
		} catch (HotelNotFoundException e) {

			log.info(e.getMessage());
		}
	}

	@Test
	void testInvalidShowHotel() {
		when(hotelRepository.findById(hotel.getHotelId())).thenReturn(Optional.empty());
		try {
			hotelService.showHotel(hotel.getHotelId());
		} catch (HotelNotFoundException e) {

			assertEquals("Hotel Not Found", e.getMessage());
		}
	}
}
