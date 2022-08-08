package com.hotelbookingmanagementsystem.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotelbookingmanagementsystem.entites.User;

public interface IUserRepository extends JpaRepository<User, Integer> {

	// To get the user which matches the user-email and the password
	public Optional<User> findByEmailAndPassword(String name, String password);

	// To get the user which matches the user-email
	public Optional<User> findByEmail(String password);

}
