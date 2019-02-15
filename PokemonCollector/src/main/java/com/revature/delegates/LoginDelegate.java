package com.revature.delegates;

import java.io.IOException;
import java.util.ArrayList;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.model.User;
import com.revature.services.AppServices;

public class LoginDelegate {
	
	//Mapper that marshals the POJOs to JSON
	private final ObjectMapper mapper = new ObjectMapper();
	
	/**Creates a user and generates a JSON of the user information
	 * @param request HttpRequest
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void createUser(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
		if (AppServices.getAppService().createUser(new_user)) {
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString("true"));
		}
		else {
			response.setContentType("application/json");
			response.getWriter().append(mapper.writeValueAsString("false"));
		}
	}
	
	/**Processes user login, validates, sends back JSON with all user credentials
	 * @param request HttpRequest 
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void processLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String user = request.getParameter("USERNAME");
		String pwd = request.getParameter("PASSWORD");
		HttpSession session = request.getSession();
		User current_user = AppServices.getAppService().checkUserCredentials(user, pwd);
		session.setAttribute("U_ID",current_user.getUserId());
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(current_user));
	}

	/**Performs the verification of the user name, checks for duplicates
	 * @param request HttpRequest 
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void processUsername(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String user = request.getParameter("USERNAME");
		response.setContentType("application/json");
		//User name exists
		if (AppServices.getAppService().validateUsername(user)) {
			response.getWriter().append(mapper.writeValueAsString("false"));
		}
		else { //User name is unique
			response.getWriter().append(mapper.writeValueAsString("true"));
		}
	}
	
	/**Performs the verification of the email, checks for duplicates
	 * @param request HttpRequest 
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void processEmail(HttpServletRequest request, HttpServletResponse response) throws IOException {
		String email = request.getParameter("EMAIL");
		response.setContentType("application/json");
		//Email exists
		if (AppServices.getAppService().validateEmail(email)) {
			response.getWriter().append(mapper.writeValueAsString("false"));
		}
		else { //Email is unique
			response.getWriter().append(mapper.writeValueAsString("true"));
		}
	}
	
	/** Invalidates the current user session
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void logout(HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpSession oldSession = request.getSession();
		oldSession.invalidate();
	}
}
