package com.revature.dao;

import java.util.List;

import com.revature.model.Pokemon;
import com.revature.model.PokemonType;
import com.revature.model.User;

public interface PokemonDao {
	
	public Pokemon getPokemonById(int pokemonId);
	
	public Pokemon getPokemonByName( String pokemonName);
	
	public List<Pokemon> getAllPokemon();
	
	public List<Pokemon> getPokemonByType(PokemonType pType);
	
	public List<String> getTypesByPokemonId(int pokemonId);
	
	public int getRarityByPokemonId(int pokemonId);
	
	public int sellAllDuplicatePokemonByUserId(int userId);
	
	public int sellDuplicateByUserAndPokemonId(int uId, int pId);

	public Pokemon generateAndAddRandomPokemon(int uId);	
	
	public Pokemon buyPokemon(int uId, int pokeId);
	
}
