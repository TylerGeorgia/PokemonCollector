package com.revature.delegates;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.model.User;
import com.revature.services.AppServices;

public class LoginDelegate {
	
	//Mapper that marshals the POJOs to JSON
	private final ObjectMapper mapper = new ObjectMapper();
	//TODO: I need instances of the DAO
	
	
	/**Creates a user and generates a JSON of the user information
	 * @param request HttpRequest
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void createUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
		System.out.println("In create User");
		String user = request.getParameter("USERNAME");
		String pwd = request.getParameter("PASSWORD");
		String first = request.getParameter("FIRSTNAME");
		String last = request.getParameter("LASTNAME");
		String email = request.getParameter("EMAIL");
		User new_user = new User();
		new_user.setUsername(user);
		new_user.setPassword(pwd);
		new_user.setFirstName(first);
		new_user.setLastName(last);
		new_user.setEmail(email);
		if (AppServices.getAppServices().createUser(new_user)) {
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString("true"));
		}
		else {
			response.setContentType("application/json");
			response.getWriter().append(mapper.writeValueAsString("false"));
		}
	}
	/**Processes user login, validates, sends back JSON with 
	 * @param request HttpRequest 
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void processUsername(HttpServletRequest request, HttpServletResponse response) throws IOException {
		 response.setContentType("application/json");
		 ArrayList<User> current_user = new ArrayList<User>();
		 
	}
	
	
	
}
