package com.hotelbookingmanagementsystem.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
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

import com.hotelbookingmanagementsystem.entites.User;
import com.hotelbookingmanagementsystem.exception.UserNotFoundException;
import com.hotelbookingmanagementsystem.model.UserDTO;
import com.hotelbookingmanagementsystem.model.UserLoginDTO;
import com.hotelbookingmanagementsystem.repository.IUserRepository;
import com.hotelbookingmanagementsystem.service.IUserService;
import com.hotelbookingmanagementsystem.utility.PasswordEncryption;

@RunWith(SpringRunner.class)
@SpringBootTest
public class UserServiceImplTest {

	private static final Logger log = LoggerFactory.getLogger(UserServiceImplTest.class);
	private static final String USERNOTFOUND = "User Not Found";
	@MockBean
	IUserRepository userRepository;

	@Autowired
	IUserService userService;

	static User user;
	static UserDTO userDTO;
	static UserLoginDTO loginDTO;

	@BeforeAll
	public static void initUser() {
		user = new User(1, "Xyz", "email@demo.com", "password123", "user", "90000000000", "City,State,Country");
		user.setPassword(PasswordEncryption.md5(user.getPassword()));
		userDTO = new UserDTO("Xyz", "email@demo.com", "password123", "9000012345", "india");
		loginDTO = new UserLoginDTO("email@demo.com", "password123");
	}

	@Test
	void testValidAddUser() {
		when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.empty());
		when(userRepository.save(user)).thenReturn(user);
		try {
			assertEquals(user, userService.addUser(user));
		} catch (UserNotFoundException e) {

			log.info(e.getMessage());
		}
	}

	@Test
	void testInvalidAddUser() {

		when(userRepository.findByEmail(user.getEmail())).thenReturn(Optional.of(user));

		try {
			userService.addUser(user);
		} catch (UserNotFoundException e) {
			assertEquals("Email already exists", e.getMessage());
		}
	}

	@Test
	void testValidUpdateUser() {
		when(userRepository.findByEmail(userDTO.getUserEmail())).thenReturn(Optional.of(user));
		when(userRepository.findByEmailAndPassword(userDTO.getUserEmail(), PasswordEncryption.md5(userDTO.getUserPassword())))
				.thenReturn(Optional.of(user));
		when(userRepository.save(user)).thenReturn(user);
		try {
			assertEquals(user, userService.updateUser(user));
		} catch (UserNotFoundException e) {

			log.info(e.getMessage());
		}
	}

	@Test
	void testInvalidPasswordInUpdateUser() {
		when(userRepository.findByEmail(userDTO.getUserEmail())).thenReturn(Optional.of(user));
		when(userRepository.findByEmailAndPassword(userDTO.getUserEmail(), PasswordEncryption.md5(userDTO.getUserPassword())))
				.thenReturn(Optional.empty());
		when(userRepository.save(user)).thenReturn(user);
		try {
			userService.updateUser(user);
		} catch (UserNotFoundException e) {

			assertEquals(USERNOTFOUND, e.getMessage());
		}
	}

	@Test
	void testInvalidUserInUpdateUser() {
		when(userRepository.findByEmail(userDTO.getUserEmail())).thenReturn(Optional.empty());
		try {
			userService.updateUser(user);
		} catch (UserNotFoundException e) {
			assertEquals(USERNOTFOUND, e.getMessage());

		}
	}

	@Test
	void testValidRemoveUser() {
		when(userRepository.findByEmail(userDTO.getUserEmail())).thenReturn(Optional.of(user));
		when(userRepository.findByEmailAndPassword(loginDTO.getEmail(), PasswordEncryption.md5(loginDTO.getPassword())))
				.thenReturn(Optional.of(user));
//		try {
//
//			assertEquals("User deleted successfully", userService.removeUser(loginDTO));
//
//		} catch (UserNotFoundException e) {
//
//			log.info(e.getMessage());
//		}
	}

	@Test
	void testInvalidPasswordRemoveUser() {
		when(userRepository.findByEmail(userDTO.getUserEmail())).thenReturn(Optional.of(user));
		when(userRepository.findByEmailAndPassword(loginDTO.getEmail(), loginDTO.getPassword()))
				.thenReturn(Optional.empty());
//		try {
//			userService.removeUser(loginDTO);
//
//		} catch (UserNotFoundException e) {
//
//			assertEquals("Invalid Password", e.getMessage());
//		}
	}

	@Test
	void testInvalidRemoveUser() {
		when(userRepository.findByEmail(userDTO.getUserEmail())).thenReturn(Optional.empty());
//		try {
//			userService.removeUser(loginDTO);
//
//		} catch (UserNotFoundException e) {
//
//			assertEquals(USERNOTFOUND, e.getMessage());
//		}
	}

	@Test
	void testValidShowAllUser() {
		List<User> list = new ArrayList<User>();
		list.add(user);
		when(userRepository.findAll()).thenReturn(list);
		try {
			assertEquals(list, userService.showAllUser());
		} catch (UserNotFoundException e) {

			log.info(e.getMessage());
		}
	}

	@Test
	void testInvalidShowAllUser() {
		List<User> list = new ArrayList<User>();
		when(userRepository.findAll()).thenReturn(list);
		try {
			userService.showAllUser();
		} catch (UserNotFoundException e) {

			assertEquals(USERNOTFOUND, e.getMessage());
		}
	}

	@Test
	void testValidShowUser() {

		when(userRepository.findById(user.getUserId())).thenReturn(Optional.of(user));
		try {
			assertEquals(user, userService.showUser(user.getUserId()));
		} catch (UserNotFoundException e) {

			log.info(e.getMessage());
		}
	}

	@Test
	void testInvalidShowUser() {
		when(userRepository.findById(user.getUserId())).thenReturn(Optional.empty());
		try {
			userService.showUser(user.getUserId());
		} catch (UserNotFoundException e) {

			assertEquals(USERNOTFOUND, e.getMessage());
		}
	}

	@AfterAll
	public static void tearDownUser() {
		user = null;
	}

}
