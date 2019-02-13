package com.revature;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.revature.delegates.HomeDelegate;
import com.revature.delegates.LoginDelegate;

public class Dispatcher {
	
	//Handles user session/account manipulation
	private HomeDelegate hd = new HomeDelegate();
	
	//Handles login and logout processes and user creation
	private LoginDelegate ld = new LoginDelegate();
	
	/**
	 * @param request HttpServletRequest
	 * @param response HttpServletResponse
	 * @throws ServletException
	 * @throws IOException
	 */
	public void process(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String switchString = request.getRequestURI().substring(request.getContextPath().length()+1);
		while (switchString.indexOf("/") > 0) {
			//If there the URL contains /, get the substring of the URL
			switchString = switchString.substring(0,switchString.indexOf("/"));
		}
		switch(switchString) {
		/* Creates a new user for the website
		 * @POST: Creates a user
		 * @return: true if successful, false if unsuccessful
		 */
		case "create":
			break;
		/*Validates existing user login
		 * @POST: Checks login
		 * @return: JSON with user information (null if empty)
		 */
		case "login":
			
			break;
		/*Manipulates collection for the user
		 * @POST: Gets all duplicates for a user
		 * @GET: Get a users current collection
		 * @return: JSON with Pokemon IDs for a particular user
		 */
		case "collection":
			break;
		/*Generates a random pokemon for a user
		 * @GET: Generates a random pokemon for a user
		 * @return: JSON with a random Pokemon
		 * @POST: Returns the users current collection
		 */
		case "generate":
			break;
		/* Shop sell and buy functions
		 * @GET: Redeems all or specific pokemon selected by user
		 * @POST: Adds a Pokemon to a user collection
		 * @return: The updated user collection 
		 */
		case "redeem":
			break;
		/* Logs the user out
		 * @POST: Destroys the current session and logs the user out
		 * @return: True if successful
		 */
		case "logout":
			break;
		default:
			System.out.println("Not yet implemented");
	
		}
	}
}
