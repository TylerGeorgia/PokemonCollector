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
	
	/** Sells all duplicate Pokemon for a user
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void sellAllPokemon(HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();
		int user_ID = (int) session.getAttribute("U_ID");
		int score = AppServices.getAppService().sellAllDuplicatePokemonByUserId(user_ID);
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(score));
	}
	
	/** Sells a specific Pokemon the user specifies
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void sellSpecificPokemon(HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();
		int user_ID = (int) session.getAttribute("U_ID");
		int poke_ID = Integer.parseInt(request.getParameter("POKE_ID").trim());
		int score = AppServices.getAppService().sellDuplicateByUserAndPokemonId(user_ID, poke_ID);
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(score));
	}
	
	public void buyPokemon(HttpServletRequest request, HttpServletResponse response) throws IOException {
		HttpSession session = request.getSession();
		int user_ID = (int) session.getAttribute("U_ID");
		int poke_ID = Integer.parseInt(request.getParameter("POKE_ID").trim());
		Pokemon poke = AppServices.getAppService().buyPokemon(user_ID, poke_ID);
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(poke));
	}

}
