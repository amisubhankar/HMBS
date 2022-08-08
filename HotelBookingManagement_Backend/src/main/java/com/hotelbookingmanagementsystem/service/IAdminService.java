package com.hotelbookingmanagementsystem.service;

import com.hotelbookingmanagementsystem.entites.Admin;
import com.hotelbookingmanagementsystem.exception.UserNotFoundException;
import com.hotelbookingmanagementsystem.model.LoginDTO;


public interface IAdminService {

	//public String signIn(String adminName, String password) throws UserNotFoundException;
	public String signUp(Admin admin);
	public String signOut();
	public Admin adminLogin(LoginDTO adminLogin) throws UserNotFoundException;
	
}
