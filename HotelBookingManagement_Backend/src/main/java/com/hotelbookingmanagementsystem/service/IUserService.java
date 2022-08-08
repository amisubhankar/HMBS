package com.hotelbookingmanagementsystem.service;

import java.util.List;
import com.hotelbookingmanagementsystem.entites.User;
import com.hotelbookingmanagementsystem.exception.UserNotFoundException;
import com.hotelbookingmanagementsystem.model.LoginDTO;
import com.hotelbookingmanagementsystem.model.UserDTO;
import com.hotelbookingmanagementsystem.model.UserLoginDTO;

public interface IUserService {

	public User addUser(User user) throws UserNotFoundException;

	public User updateUser(User user) throws UserNotFoundException;

	public String removeUser(int  userId) throws UserNotFoundException;

	public List<User> showAllUser() throws UserNotFoundException;

	public User showUser(int id) throws UserNotFoundException;
	
	public User userLogin(LoginDTO userLogin) throws UserNotFoundException;
	
	public User getByEmail(String email) throws UserNotFoundException;

}
