package com.revature.delegates;

import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.model.*;
import com.revature.services.*;

public class HomeDelegate {
	
	private final ObjectMapper mapper = new ObjectMapper();
	
	/**Returns the current top 100 users in a JSON format
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void returnLeaderboard(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(AppServices.getAppService().getLeaderBoard()));
	}
	
	/**Generates and adds a random Pokemon and returns a JSON of the random Pokemon added
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void generatePokemon(HttpServletRequest request, HttpServletResponse response) throws IOException{
		HttpSession session = request.getSession();
		int user_ID = (int) session.getAttribute("U_ID");
		Pokemon poke = AppServices.getAppService().generateAndAddRandomPokemon(user_ID);
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(poke));
	}

}
