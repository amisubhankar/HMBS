package com.hotelbookingmanagementsystem.service;

import java.util.List;


import com.hotelbookingmanagementsystem.entites.Hotel;
import com.hotelbookingmanagementsystem.exception.HotelNotFoundException;


public interface IHotelService {
	
	public String addHotel(Hotel hotel);
	public String updateHotel(Hotel hotel) throws HotelNotFoundException;
	public String removeHotel(int hotelId)throws HotelNotFoundException;
	public List<Hotel> showAllHotel();
	public Hotel showHotel(int id) throws HotelNotFoundException;
	
}
