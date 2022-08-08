package com.hotelbookingmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.hotelbookingmanagementsystem.entites.BookingDetails;
import com.hotelbookingmanagementsystem.entites.User;

@Repository
public interface IBookingDetailsRepository extends JpaRepository<BookingDetails, Integer>{
	
	@Query
	public BookingDetails findByUser(User user);

}
