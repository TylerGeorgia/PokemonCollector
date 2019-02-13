package com.revature.delegates;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;

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
		/* PSEUDO-CODE
		request.getParameter("USERNAME");
		request.getParameter("PASSWORD");
		User user = new User();
		if (AppService.getAppService().createUser() != null) {
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString("true"));
		}
		else {
			response.setContentType("application/json");
			response.getWriter().append(mapper.writeValueAsString("false"));
		}
		*/
	}
	/**Processes user login, validates, sends back JSON with 
	 * @param request HttpRequest 
	 * @param response HttpResponse
	 * @throws IOException
	 */
	public void processLogin(HttpServletRequest request, HttpServletResponse response) throws IOException {
		/* PSEUDO-CODE
		 * 
		 * response.setContentType("application/json");
		 * response.getWriter().append(mapper.writeValueAsString("INSERT_JSON_HERE"));
		 */
	}
	
	
	
}
