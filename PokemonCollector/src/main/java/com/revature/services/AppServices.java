package com.revature.services;

import java.util.List;

import com.revature.dao.UserDaoImpl;
import com.revature.model.Pokedex;
import com.revature.model.Pokemon;
import com.revature.model.PokemonType;
import com.revature.model.User;

public class AppServices {
	
	private static AppServices appServices = null;
	
	private AppServices() {};
	
	public static AppServices getAppServices() {
		if(appServices == null) {
			appServices = new AppServices();
		}
		
		return appServices;
	}
	
	public Pokemon getPokemonById(int pokemonId) {
		return null;
	}
	
	public Pokemon getPokemonByName( String pokemonName){
		return null;
	}
	
	public List<Pokemon> getAllPokemon(){
		return null;
	}
	
	public int generateSaleValue(int pokemonId){
		return 0;
	}
	
	public List<Pokemon> getPokemonByType(PokemonType pType){
		return null;
	}
	
	public List<String> getTypesByPokemonId(int pokemonId){
		return null;
	}
	
	public int getRarityByPokemonId(int pokemonId){
		return 0;
	}
	
	public int sellAllDuplicatePokemonByUserId(int userId){
		return 0;
	}
	
	public int sellDuplicateByUserAndPokemonId(int uId, int pId){
		return 0;
	}

	public Pokemon generateAndAddRandomPokemon(int uId){
		return null;
	}
	
	public Pokemon buyPokemon(int uId, int pokeId){
		return null;
	}
	
	public List<User> getLeaderBoard (int pgNumber){
		return null;
	}
	public User checkUserCredentials(String username, String password){
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.checkUserCredentials(username, password);
	}
	public boolean createUser(User newUser){
		UserDaoImpl userDao = UserDaoImpl.getUserDao();
		return userDao.createUser(newUser);
	}
	public User getUserById(int uId){
		return null;
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
