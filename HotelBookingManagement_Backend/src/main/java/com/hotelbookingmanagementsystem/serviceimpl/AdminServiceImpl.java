package com.hotelbookingmanagementsystem.serviceimpl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hotelbookingmanagementsystem.entites.Admin;
import com.hotelbookingmanagementsystem.exception.UserNotFoundException;
import com.hotelbookingmanagementsystem.model.LoginDTO;
import com.hotelbookingmanagementsystem.repository.IAdminRepository;
import com.hotelbookingmanagementsystem.service.IAdminService;
import com.hotelbookingmanagementsystem.utility.PasswordEncryption;

@Service
public class AdminServiceImpl implements IAdminService {

	private static final Logger log = 
			LoggerFactory.getLogger(AdminServiceImpl.class);
	
	@Autowired
	private IAdminRepository adminRepository;

	private static Admin currentAdmin = null;
	private static boolean firstAdmin = true;

	public static Admin getCurrentAdmin() {
		return currentAdmin;
	}

	public static void setCurrentAdmin(Admin currentAdmin) {
		AdminServiceImpl.currentAdmin = currentAdmin;
	}

	public static boolean isFirstAdmin() {
		return firstAdmin;
	}

	public static void setFirstAdmin(boolean firstAdmin) {
		AdminServiceImpl.firstAdmin = firstAdmin;
	}


	/**
	 * signOut() is doing sign out for admin. making currentAdmin null and returning
	 * message
	 * 
	 * @return Admin : returning success message
	 */
	@Override
	public String signOut() {
		if (currentAdmin != null) {
			log.info("Signing out");
			currentAdmin = null;
			return "Logged Out Successfully";
		}
		log.info("Can't sign out as no admin is looged in");
		return "No Admin is currently logedIn";
	}

	/**
	 * signUp() is doing sign up for admin using credentials. if firstAdmin is true
	 * encrypting password using MD5 method and saving in database and make
	 * firstAdmin false else and if currentAdmin!=null check if adminName is already
	 * present return "Admin with same name is already present" else encrypt
	 * password and save in database and if currentAdmin is null return "No admin is logged in"
	 * 
	 * @param Admin : admin
	 * @return String : success message or other message
	 */

	@Override
	public String signUp(Admin admin) {
		if (firstAdmin) {
			log.info("Signing up first admin");
			admin.setPassword(PasswordEncryption.md5(admin.getPassword()));
			adminRepository.save(admin);
			firstAdmin = false;
			return "Admin added successfully";
		} else {
			if (currentAdmin != null) {
				if (adminRepository.findByAdminName(admin.getAdminName()) == null) {
					log.info("Signing up a admin");
					admin.setPassword(PasswordEncryption.md5(admin.getPassword()));
					adminRepository.save(admin);
					return "Admin added successfully";
				} 
				else {
					log.info("Can't sign up as a admin is already present with this name");
					return "Admin with same name is already present";
				}
			} 
			else {
				log.info("Can't signing up as no admin is logged in");
				return "No admin is logged in";
			}
		}
	}

	/**
	 * adminLogin() is doing sign in for admin using credentials. encrypting password
	 * and if currentAdmin=null find admin using findByAdminNameAndPassword() if
	 * present save in currentAdmin else throw an exception
	 * 
	 * @param String : adminName - name of admin String : admin password - password
	 *               of admin
	 * 
	 * @return Admin : a object of Admin class
	 */
	@Override
	public Admin adminLogin(LoginDTO adminLogin) throws UserNotFoundException {
		adminLogin.setPassword(PasswordEncryption.md5(adminLogin.getPassword()));
		if(adminRepository.findByAdminNameAndPassword(adminLogin.getUserName(),adminLogin.getPassword()).isPresent())
		{
			return adminRepository.findByAdminNameAndPassword(adminLogin.getUserName(),adminLogin.getPassword()).get();
		}
		throw new UserNotFoundException("WRONG CREDINTIALS");
	}

}
