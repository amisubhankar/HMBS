package com.hotelbookingmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbookingmanagementsystem.entites.Hotel;

public interface IHotelRepository extends JpaRepository<Hotel, Integer>{

}
