package com.revature.dao;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;

import com.revature.model.Pokedex;
import com.revature.model.User;
import com.revature.util.JDBCConnectionUtil;

public class UserDaoImpl implements UserDao{
	
	final static Logger log = Logger.getLogger(UserDaoImpl.class);
	private static UserDaoImpl userDao = null;
	
	private UserDaoImpl() {};
	
	public static UserDaoImpl getUserDao() {
		if(userDao == null) {
			userDao = new UserDaoImpl();
		}
		
		return userDao;
	}
	
	public List<User> getLeaderBoard() {

		List<User> leaderBoard = new ArrayList<User>(100);
		ResultSet rs;
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_user order by score desc fetch first 100 rows only";
			PreparedStatement ps = conn.prepareStatement(sql);
			rs = ps.executeQuery();
			int index = 0;
			while(rs.next()) {
				User nextUser = new User();
				nextUser.setUsername(rs.getString("username"));
				nextUser.setEmail(rs.getString("email"));
				nextUser.setFirstName(rs.getString("first_name"));
				nextUser.setLastName(rs.getString("last_name"));
				nextUser.setUserId(rs.getInt("user_id"));
				nextUser.setScore(rs.getInt("score"));
				nextUser.setCredit(rs.getInt("credits"));
				leaderBoard.add(index, nextUser);
				index++;
			}
		}catch(SQLException e) {
			e.printStackTrace();
			leaderBoard = null;
			log.info("Error in Class UserDaoImpl: Method validateUsername()");
		}
		return leaderBoard;
	}

	public User checkUserCredentials(String username, String password) {
		User userQ = null;
		String hashedPassword = null;
		ResultSet rs = null;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			
			String sql1 = "{? = call get_user_hash(?,?)}";
			CallableStatement cs = conn.prepareCall( sql1 );
			cs.setString(2, username.toLowerCase());
			cs.setString(3, password);
			cs.registerOutParameter(1,java.sql.Types.VARCHAR);
			cs.execute();
			hashedPassword = cs.getString(1);
			log.info("pass hash is : " + hashedPassword);
			System.out.print("pass hash:" + hashedPassword);
			String sql3 = "select * from tbl_user where username = ? AND password = ?";
			PreparedStatement ps = conn.prepareStatement(sql3);
			ps.setString(1, username.toLowerCase());
			ps.setString(2, hashedPassword);
			
			
			rs = ps.executeQuery();
			if(rs.next()) {
				userQ = new User();
				userQ.setUsername(rs.getString("username"));
				userQ.setEmail(rs.getString("email"));
				userQ.setFirstName(rs.getString("first_name"));
				userQ.setLastName(rs.getString("last_name"));
				userQ.setUserId(rs.getInt("user_id"));
				userQ.setScore(rs.getInt("score"));
				userQ.setCredit(rs.getInt("credits"));
			}
		}catch(SQLException e) {
			e.printStackTrace();
			log.info("Error in Class UserDaoImpl: Method createUser()");
		}
		return userQ;
	}

	public boolean createUser(User newUser) {
		boolean userCreated = true;
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "call prc_insert_user(?,?,?,?,?)";
			CallableStatement ps = conn.prepareCall(sql);
			ps.setString(1, newUser.getUsername().toLowerCase());
			ps.setString(2,  newUser.getPassword());
			ps.setString(3, newUser.getFirstName());
			ps.setString(4, newUser.getLastName());
			ps.setString(5, newUser.getEmail().toLowerCase());
			ps.execute();
			
		}catch(SQLException e) {
			e.printStackTrace();
			userCreated = false;
			log.info("Error in Class UserDaoImpl: Method createUser()");
		}
		
		return userCreated;
	}

	public User getUserById(int uId) {
		ResultSet rs;
		User desiredUser = null;
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_user where user_id = ?";
			CallableStatement ps = conn.prepareCall(sql);
			ps.setInt(1,uId);
			rs = ps.executeQuery();
			
			if(rs.next()) {
				desiredUser = new User();
				desiredUser.setUsername(rs.getString("username"));
				desiredUser.setEmail(rs.getString("email"));
				desiredUser.setFirstName(rs.getString("first_name"));
				desiredUser.setLastName(rs.getString("last_name"));
				desiredUser.setCredit(rs.getInt("credits"));
				desiredUser.setScore(rs.getInt("score"));
				desiredUser.setUserId(rs.getInt("user_id"));
			}
			
		}catch(SQLException e) {
			e.printStackTrace();
			desiredUser = null;
			log.info("Error in Class UserDaoImpl: Method getUserById()");
		}
		
		return desiredUser;
	}

	public Pokedex getPokedex(int uId) {
		// TODO Auto-generated method stub
		return null;
	}

	public boolean validateUsername(String username) {
		
		boolean isValidUsername = true;
		ResultSet rs;
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_user where username = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, username.toLowerCase());
			rs = ps.executeQuery();
			if(rs.next()) {
				isValidUsername = false;
			}
		}catch(SQLException e) {
			e.printStackTrace();
			isValidUsername = false;
			log.info("Error in Class UserDaoImpl: Method validateUsername()");
		}
		return isValidUsername;
	}

	public boolean validateEmail(String email) {
		boolean isValidEmail = true;
		ResultSet rs;
		
		try(Connection conn = JDBCConnectionUtil.getConnection()){
			String sql = "select * from tbl_user where email = ?";
			PreparedStatement ps = conn.prepareStatement(sql);
			ps.setString(1, email.toLowerCase());
			rs = ps.executeQuery();
			if(rs.next()) {
				isValidEmail = false;
			}
		}catch(SQLException e) {
			e.printStackTrace();
			isValidEmail = false;
			log.info("Error in Class UserDaoImpl: Method validateEmail()");
		}
		return isValidEmail;
	}

}
