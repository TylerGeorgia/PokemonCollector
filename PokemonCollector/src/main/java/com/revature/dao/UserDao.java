package com.revature.dao;

import java.util.List;

import com.revature.model.Pokedex;
import com.revature.model.User;

public interface UserDao {
	public List<User> getLeaderBoard ();
	public User checkUserCredentials(String username, String password);
	public boolean createUser(User newUser);
	public User getUserById(int uId);
	public Pokedex getPokedex(int uId);
	public boolean validateUsername(String username);
	public boolean validateEmail(String email);
}