package com.revature.services;

import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.revature.dao.UserDaoImpl;
import com.revature.model.Pokedex;
import com.revature.model.Pokemon;
import com.revature.model.PokemonType;
import com.revature.model.User;

public class AppServices {
	
	final static Logger log = Logger.getLogger(UserDaoImpl.class);
	
	private static AppServices appService= null;
	
	private AppServices() {}
	
	public static AppServices getAppService() {
		if(appService == null) {
			appService = new AppServices();
		}
		return appService;
	}
	
	//TODO: test
	public Pokemon getPokemonById(int pokemonId) {
		return null;
	}
	
	//TODO: test
	public Pokemon getPokemonByName( String pokemonName){
		return null;
	}
	
	//TODO: test
	public List<Pokemon> getAllPokemon(){
		return null;
	}
	
	//TODO: test
	public int generateSaleValue(int pokemonId){
		return 0;
	}
	
	//TODO: test
	public List<Pokemon> getPokemonByType(PokemonType pType){
		return null;
	}
	
	//TODO: test
	public List<String> getTypesByPokemonId(int pokemonId){
		return null;
	}
	
	//TODO: test
	public int getRarityByPokemonId(int pokemonId){
		return 0;
	}
	
	//TODO: test
	public int sellAllDuplicatePokemonByUserId(int userId){
		return 0;
	}
	
	//TODO: test
	public int sellDuplicateByUserAndPokemonId(int uId, int pId){
		return 0;
	}

	//TODO: test
	public Pokemon generateAndAddRandomPokemon(int uId){
		return null;
	}
	
	//TODO: test
	public Pokemon buyPokemon(int uId, int pokeId){
		return null;
	}
	
	//TODO: test
	public List<User> getLeaderBoard (){
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.getLeaderBoard();
	}
	
	public User checkUserCredentials(String username, String password){
		
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.checkUserCredentials(username, password);
	}
	
	public boolean createUser(User newUser){
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.createUser(newUser);
	}
	
	//TODO: test
	public User getUserById(int uId){
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.getUserById(uId);
	}
	
	public Pokedex getPokedex(int uId) {
		return null;
	}
	
	public boolean validateUsername(String username) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.validateUsername(username);
	}
	
	public boolean validateEmail(String email) {
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.validateUsername(email);
	}
}
