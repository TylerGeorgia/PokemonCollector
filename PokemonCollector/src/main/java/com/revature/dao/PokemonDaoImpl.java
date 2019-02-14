package com.revature.dao;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.revature.model.Pokemon;
import com.revature.model.PokemonType;
import com.revature.util.JDBCConnectionUtil;

public class PokemonDaoImpl implements PokemonDao {
	
	final static Logger log = Logger.getLogger(PokemonDaoImpl.class);
	
	//Singleton Implementation
	private static PokemonDaoImpl pokemonDao = null;
	
	private PokemonDaoImpl() {}
	
	public static PokemonDaoImpl getPokemonDao() {
		if(pokemonDao == null) {
			pokemonDao = new PokemonDaoImpl();
		}
		return pokemonDao;
	}
	
	//Dao methods
	@Override
	public Pokemon getPokemonById(int pokemonId) {
		Pokemon pokeToGet = null;
		ResultSet rs;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_pokemon where pokemon_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt( 1 , pokemonId );
			rs = ps.executeQuery();
			if(rs.next()) {
				pokeToGet = new Pokemon();
				pokeToGet.setPokemonId(rs.getInt("pokemon_id"));
				pokeToGet.setPokemonName(rs.getString("pokemon_name"));
				pokeToGet.setPokemonRarity(rs.getInt("rarity"));
			}
		}catch(SQLException e) {
			e.printStackTrace();
			
			log.info("Error in Class PokemonDaoImpl: Method getPokemonById()");
		}
		return pokeToGet;
	}

	@Override
	public Pokemon getPokemonByName(String pokemonName) {
		Pokemon pokeToGet = null;
		ResultSet rs;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_pokemon where pokemon_name = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString( 1 , pokemonName );
			rs = ps.executeQuery();
			if(rs.next()) {
				pokeToGet = new Pokemon();
				pokeToGet.setPokemonId(rs.getInt("pokemon_id"));
				pokeToGet.setPokemonName(rs.getString("pokemon_name"));
				pokeToGet.setPokemonRarity(rs.getInt("rarity"));
			}
		}catch(SQLException e) {
			e.printStackTrace();
			
			log.info("Error in Class PokemonDaoImpl: Method getPokemonById()");
		}
		return pokeToGet;
	}

	@Override
	public List<Pokemon> getAllPokemon() {
		List<Pokemon> allPokemon = null;
		ResultSet rs;
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_pokemon";
			PreparedStatement ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			
			if(rs.next()) {
				allPokemon = new ArrayList<Pokemon>();
				Pokemon firstPokemon = new Pokemon();
				firstPokemon.setPokemonId(rs.getInt("pokemon_id"));
				firstPokemon.setPokemonName(rs.getString("pokemon_name"));
				firstPokemon.setPokemonRarity(rs.getInt("rarity"));
				allPokemon.add(firstPokemon);
			}
			while(rs.next()) {
				Pokemon nextPokemon = new Pokemon();
				nextPokemon.setPokemonId(rs.getInt("pokemon_id"));
				nextPokemon.setPokemonName(rs.getString("pokemon_name"));
				nextPokemon.setPokemonRarity(rs.getInt("rarity"));
				allPokemon.add(nextPokemon);
			}
		}catch(SQLException e) {
			e.printStackTrace();
			log.info("Error in Class PokemonDaoImpl: Method getAllPokemon()");
		}
		return allPokemon;
	}

	@Override
	public List<Pokemon> getPokemonByType(PokemonType pType) {
		List<Pokemon> pokemonOfType = null;
		ResultSet rs;
		String pokemonType = "" + pType;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_type where type_name = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString( 1 , pokemonType);
			rs = ps.executeQuery();
			if(rs.next()) {
				pokemonOfType = new ArrayList<Pokemon>();
				int typeId = rs.getInt("type_id");

				ResultSet rs2;
				String sql2 = "select * from tbl_pokemon_to_type where type_id = ?";
				PreparedStatement ps2 = conn.prepareStatement(sql2);
				ps2.setInt(1,  typeId);
				rs2 = ps2.executeQuery();
				
				while(rs2.next()) {
					Pokemon nextPokemon = getPokemonById(rs2.getInt("pokemon_id"));
					pokemonOfType.add(nextPokemon);
					
				}
			}
		}catch(SQLException e) {
			e.printStackTrace();
			log.info("Error in Class PokemonDaoImpl: Method getTypesByPokemonId()");
		}
		return pokemonOfType;
	}

	@Override
	public List<String> getTypesByPokemonId(int pokemonId) {
		List<String> pokemonsTypes = new ArrayList<String>();
		ResultSet rs;
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_pokemon_to_type where pokemon_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt( 1 , pokemonId );
			rs = ps.executeQuery();
			while(rs.next()) {
				ResultSet rs2;
				int typeId = rs.getInt("type_id");
				String sql2 = "select * from tbl_type where type_id = ?";
				PreparedStatement ps2 = conn.prepareStatement(sql2);
				ps2.setInt(1,  typeId);
				rs2 = ps2.executeQuery();
				if(rs2.next()) {
					pokemonsTypes.add(rs2.getString("type_name"));
				}
			}
		}catch(SQLException e) {
			e.printStackTrace();
			log.info("Error in Class PokemonDaoImpl: Method getTypesByPokemonId()");
		}
		return pokemonsTypes;
	}

	@Override
	public int getRarityByPokemonId(int pokemonId) {
		int rarity = -1;
		ResultSet rs;
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_pokemon where pokemon_id = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setInt( 1 , pokemonId );
			rs = ps.executeQuery();
			if(rs.next()) {
				rarity = rs.getInt("rarity");
			}
		}catch(SQLException e) {
			e.printStackTrace();
			rarity = -1;
			log.info("Error in Class PokemonDaoImpl: Method getRarityByPokemonId()");
		}
		return rarity;
	}

	@Override
	public int sellAllDuplicatePokemonByUserId(int userId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public int sellDuplicateByUserAndPokemonId(int uId, int pId) {
		// TODO Auto-generated method stub
		return 0;
	}

	@Override
	public Pokemon generateAndAddRandomPokemon(int uId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Pokemon buyPokemon(int uId, int pokeId) {
		// TODO Auto-generated method stub
		return null;
	}

}
