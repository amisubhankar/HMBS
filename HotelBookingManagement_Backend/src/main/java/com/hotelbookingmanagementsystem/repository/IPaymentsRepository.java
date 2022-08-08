package com.hotelbookingmanagementsystem.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbookingmanagementsystem.entites.Payments;

public interface IPaymentsRepository extends JpaRepository<Payments, Integer> {
	
}
