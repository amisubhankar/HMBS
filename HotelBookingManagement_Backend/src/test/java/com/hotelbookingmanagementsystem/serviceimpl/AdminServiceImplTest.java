package com.hotelbookingmanagementsystem.serviceimpl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import com.hotelbookingmanagementsystem.entites.Admin;
import com.hotelbookingmanagementsystem.exception.UserNotFoundException;
import com.hotelbookingmanagementsystem.repository.IAdminRepository;
import com.hotelbookingmanagementsystem.service.IAdminService;
import com.hotelbookingmanagementsystem.utility.PasswordEncryption;

@RunWith(SpringRunner.class)
@SpringBootTest
 class AdminServiceImplTest {

	private static final Logger log = 
			LoggerFactory.getLogger(Admin.class);
	
	static Admin admin;
	
	@MockBean
	IAdminRepository adminRepository;
	
	@Autowired
	IAdminService adminService;
	
	@BeforeAll
	static void createAdminObject() {
		admin = new Admin(1,"name","password");
	}
	
	@Test
	void testValidAdminSignIn() throws UserNotFoundException {
		String password = PasswordEncryption.md5("password");
		//when(adminRepository.findByAdminNameAndPassword("name", password)).thenReturn(admin);
		//assertEquals("Sign In successfully", adminService.signIn(admin.getAdminName(), admin.getPassword()));
	}
	@Test
	void testInvalidAdminSignIn() {
		String password = PasswordEncryption.md5("password");
		when(adminRepository.findByAdminNameAndPassword("name", password)).thenReturn(null);
		try {
			//adminService.signIn(admin.getAdminName(), admin.getPassword());
		} catch (Exception e) {
			assertEquals("Wrong Credentials", e.getMessage());
		}
	}
	
	@Test
	void testAdminAlreadySignedIn() throws UserNotFoundException {
		AdminServiceImpl.setCurrentAdmin(admin);
		//assertEquals("A admin is already signed in", adminService.signIn(admin.getAdminName(), admin.getPassword()));
	}
	
	@Test
	void testValidAdminFirstSignUp() throws UserNotFoundException {
		AdminServiceImpl.setFirstAdmin(true);
		when(adminRepository.save(admin)).thenReturn(admin);
		assertEquals("Admin added successfully", adminService.signUp(admin));
	}
	
	@Test
	void testValidAdminSignUp() {
		AdminServiceImpl.setFirstAdmin(false);
		AdminServiceImpl.setCurrentAdmin(admin);
		when(adminRepository.findByAdminName(admin.getAdminName())).thenReturn(null);
		when(adminRepository.save(admin)).thenReturn(admin);
		assertEquals("Admin added successfully", adminService.signUp(admin));
	}
	
	@Test 
	void testInvalidAdminName() {
		AdminServiceImpl.setFirstAdmin(false);
		AdminServiceImpl.setCurrentAdmin(admin);
		when(adminRepository.findByAdminName(admin.getAdminName())).thenReturn(admin);
		assertEquals("Admin with same name is already present", adminService.signUp(admin));
	}
	
	@Test
	void testInvalidAdminSignUp() {
		assertEquals("No admin is logged in", adminService.signUp(admin));
	}
	
	@Test
	void testValidAdminSignOut() {
		AdminServiceImpl.setCurrentAdmin(admin);
		assertEquals("Logged Out Successfully", adminService.signOut());		
	}
	
	@Test
	void testInValidAdminSignOut() {
		AdminServiceImpl.setCurrentAdmin(null);
		assertEquals("No Admin is currently logedIn", adminService.signOut());		
	}
	
}
