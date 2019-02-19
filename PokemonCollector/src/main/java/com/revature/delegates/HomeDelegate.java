package com.revature.delegates;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.model.Pokedex;
import com.revature.model.PokedexBuilder;
import com.revature.model.Pokemon;
import com.revature.model.User;
import com.revature.services.AppServices;

public class HomeDelegate {
	
	private final ObjectMapper mapper = new ObjectMapper();
	Pokedex pokedex = new Pokedex();
	PokedexBuilder pokebuild = new PokedexBuilder();
	
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
		int id = Integer.parseInt(request.getParameter("USERID"));
		Pokemon poke = AppServices.getAppService().generateAndAddRandomPokemon(id);
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(poke));
	}
	
	/** Sells all duplicate Pokemon for a user
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void sellAllPokemon(HttpServletRequest request, HttpServletResponse response) throws IOException {
		int id = Integer.parseInt(request.getParameter("USERID"));
		int score = AppServices.getAppService().sellAllDuplicatePokemonByUserId(id);
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(score));
	}
	
	/** Sells a specific Pokemon the user specifies
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void sellSpecificPokemon(HttpServletRequest request, HttpServletResponse response) throws IOException {
		int id = Integer.parseInt(request.getParameter("USERID"));
		Pokemon pokeparam = mapper.readValue(request.getReader(), Pokemon.class); 
		int score = AppServices.getAppService().sellDuplicateByUserAndPokemonId(id, pokeparam.getPokemonId());
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(score));
	}
	
	/**Buys a specific Pokemon and removes credits from users account
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void buyPokemon(HttpServletRequest request, HttpServletResponse response) throws IOException {
		int id = Integer.parseInt(request.getParameter("USERID")); 
		Pokemon pokeParam = mapper.readValue(request.getReader(), Pokemon.class); 
		Pokemon poke = AppServices.getAppService().buyPokemon(id, pokeParam.getPokemonId());
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(poke));
	}

	/**Gets a user collection
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void getUserCollection(HttpServletRequest request, HttpServletResponse response) throws IOException {
		int id = Integer.parseInt(request.getParameter("USERID"));
		pokedex.setOwner(pokebuild.buildUser(id));
		pokedex.setOwnedPokemon(pokebuild.buildPokemonList(id));
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(pokedex));
	}
	
	/**Gets the duplicates of the pokemon
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	public void getUserDuplicates(HttpServletRequest request, HttpServletResponse response) throws IOException {
		int id = Integer.parseInt(request.getParameter("USERID")); 
		pokedex.setOwner(pokebuild.buildUser(id));
		pokedex.setOwnedPokemon(pokebuild.buildPokemonList(id));
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(pokedex.getOwner()));
		for (Pokemon p : pokedex.getOwnedPokemon()) {
			if (p.getCount() > 1) {
				response.getWriter().append(mapper.writeValueAsString(p));
			}
		}
	}
}
