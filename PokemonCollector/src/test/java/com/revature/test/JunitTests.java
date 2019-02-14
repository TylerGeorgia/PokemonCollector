package com.revature.test;

import static org.junit.Assert.*;
import org.junit.Test;
import com.revature.model.*;
import com.revature.services.AppServices;
public class JunitTests {
	//
	
//	@Test -WORKED
//	public void legitUser() {
//		User new_user = new User();
//		new_user.setFirstName("Test");
//		new_user.setLastName("Case");
//		new_user.setUsername("TestUsername");
//		new_user.setPassword("password");
//		new_user.setEmail("Test@Email.com");
//		assertTrue(AppServices.getAppServices().createUser(new_user));
//	}
	@Test
	public void badLogin() {
		assertEquals(null,AppServices.getAppService().checkUserCredentials("Bad", "Login"));
	}
	@Test
	public void goodLogin() {
		User new_user = new User();
		new_user.setFirstName("Test");
		new_user.setLastName("Case");
		new_user.setUsername("TestUsername");
		new_user.setPassword("password");
		new_user.setEmail("Test@Email.com");
		assertEquals("TestUsername",AppServices.getAppService().checkUserCredentials("TestUsername", "password").getUsername());
	}
	
	
}
