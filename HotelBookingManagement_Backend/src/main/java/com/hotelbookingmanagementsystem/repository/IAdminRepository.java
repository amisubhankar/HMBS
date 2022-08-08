package com.hotelbookingmanagementsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.hotelbookingmanagementsystem.entites.Admin;

@Repository
public interface IAdminRepository extends JpaRepository<Admin, Integer> {

	public Optional<Admin> findByAdminNameAndPassword(String name,String password);
	
	public Admin findByAdminName(String name);
	
}
