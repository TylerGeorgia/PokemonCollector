package com.revature.model;

public class Pokemon {
	
	//TODO: make dynamic if numPokemon will change
	private static int numPokemon = 151;
	
	//instance members
	private int pokemonId;
	private String pokemonName;
	private int pokemonRarity;
	
	public Pokemon(int pId, String pName, int pRarity) {
		this.pokemonId =  pId;
		this.pokemonName = pName;
		this.pokemonRarity = pRarity;
	}
	
	public Pokemon() {
		
	}

	public int getPokemonId() {
		return pokemonId;
	}

	public void setPokemonId(int pokemonId) {
		this.pokemonId = pokemonId;
	}

	public String getPokemonName() {
		return pokemonName;
	}

	public void setPokemonName(String pokemonName) {
		this.pokemonName = pokemonName;
	}

	public int getPokemonRarity() {
		return pokemonRarity;
	}

	public void setPokemonRarity(int pokemonRarity) {
		this.pokemonRarity = pokemonRarity;
	}

}
