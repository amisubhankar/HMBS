package com.hotelbookingmanagementsystem.serviceimpl;

import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.hotelbookingmanagementsystem.entites.User;
import com.hotelbookingmanagementsystem.exception.UserNotFoundException;
import com.hotelbookingmanagementsystem.model.LoginDTO;
import com.hotelbookingmanagementsystem.model.UserDTO;
import com.hotelbookingmanagementsystem.model.UserLoginDTO;
import com.hotelbookingmanagementsystem.repository.IUserRepository;
import com.hotelbookingmanagementsystem.service.IUserService;
import com.hotelbookingmanagementsystem.utility.PasswordEncryption;

@Service
public class UserServiceImpl implements IUserService {

	private static final Logger log = LoggerFactory.getLogger(UserServiceImpl.class);
	private static final String USERNOTFOUND = "User Not Found";
	@Autowired
	IUserRepository userRepository;

	/**
	 * addUser() is adding user. encrypting password and if user is not present
	 * findByEmail() then saving the user else throw an exception Email already
	 * exists
	 * 
	 * @param user : a User object
	 * 
	 * @return String : success message or exception
	 */

	public User addUser(User user) throws UserNotFoundException {
		log.info("Inside addUser() method");
		// checking whether user with same email is not present
		if (!(userRepository.findByEmail(user.getEmail()).isPresent())) {
			// encrypting the password
			user.setPassword(PasswordEncryption.md5(user.getPassword()));
			// saving the user
			return userRepository.save(user);
			
		} else {
			log.info("Email already exist");
			throw new UserNotFoundException("Email already exists");
		}
	}

	/**
	 * updateUser() is updating user. encrypting password and if user is present
	 * using findByEmail() then checking if the password match for the same and
	 * updating the fields given by user
	 * 
	 * @param user : a UserDTO object
	 * 
	 * @return String : success message or exception
	 */

	public User updateUser(User user) throws UserNotFoundException {
		log.info("Inside updateUser() method");
		// encrypting the password
		
		if(userRepository.findById(user.getUserId()).isPresent())
		{
				log.info("Provided details updated");
				
				log.info("Success message returned");
				return userRepository.save(user);
				
		
		}
		log.info(USERNOTFOUND);
		throw new UserNotFoundException(USERNOTFOUND);

	}

	/**
	 * removeUser() is deleting user if user is present using findByEmail() and the
	 * password matches by findByEmailAndPassword else throw an appropriate
	 * exception
	 * 
	 * @param user : a UserDTO object
	 * 
	 * @return String : success message or exception
	 */

	public String removeUser(int  userId) throws UserNotFoundException {
		log.info("Inside removeUser() method");
			if(userRepository.findById(userId).isPresent()) {
				userRepository.deleteById(userId);
				log.info("User deleted successfully");
				return "User deleted successfully";
			
		}

		else {
			log.info(USERNOTFOUND);
			throw new UserNotFoundException(USERNOTFOUND);
		}

	}

	/**
	 * showAllUser() is showing all users if list is empty then throw exception else
	 * return the list of users
	 *
	 * @return List of users
	 */
	public List<User> showAllUser() throws UserNotFoundException {
		log.info("Inside showAllUser() method");
		List<User> list = userRepository.findAll();
		if (list.isEmpty()) {
			log.info(USERNOTFOUND);
			throw new UserNotFoundException(USERNOTFOUND);
		} else
			log.info("Users found and returned");
		return list;
	}

	/**
	 * showUser() shows the user by user id if id is present then return the user
	 * else throw an exception
	 * 
	 * @param int : id of user
	 * 
	 * @return user details
	 */
	public User showUser(int id) throws UserNotFoundException {
		log.info("Inside showUser() method");
		// finding the user
		if (userRepository.findById(id).isPresent()) {
			return userRepository.findById(id).orElse(null);
		} else {
			log.info(USERNOTFOUND);
			throw new UserNotFoundException(USERNOTFOUND);
		}
	}

	/**
	 * userLogin() is doing sign in for user using credentials. encrypting password
	 * if the credentials are wrong throw a UserNotFounException
	 * 
	 * @param userLogin : a LoginDTO object
	 * 
	 * @return User : a object of user class
	 */
	@Override
	public User userLogin(LoginDTO userLogin) throws UserNotFoundException{
		userLogin.setPassword(PasswordEncryption.md5(userLogin.getPassword()));
		if(userRepository.findByEmailAndPassword(userLogin.getUserName(),userLogin.getPassword()).isPresent())
		{
			return userRepository.findByEmailAndPassword(userLogin.getUserName(),userLogin.getPassword()).get();
		}
		throw new UserNotFoundException(USERNOTFOUND);
	}
	
	@Override
	public User getByEmail(String email) throws UserNotFoundException {
		if(userRepository.findByEmail(email).isPresent())
		{
			return userRepository.findByEmail(email).get();
		}
		throw new UserNotFoundException(USERNOTFOUND);
	}

}
