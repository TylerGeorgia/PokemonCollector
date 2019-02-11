package com.revature.util;

import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.log4j.Logger;

public class JDBCConnectionUtil {
	final static Logger log = Logger.getLogger(JDBCConnectionUtil.class);

	// JDBC - Java Data Base Connectivity
	static 
	{
		try {
			Class.forName("oracle.jdbc.OracleDriver");
		} catch (ClassNotFoundException e) {
			log.error(e);
		}
	}

	public static Connection getConnection() throws SQLException {
		Properties prop = new Properties();
		InputStream input = null;
		String url = null;
		String user = null;
		String pass = null;
		
		try {
			input = new FileInputStream("src\\main\\resources\\config.properties");

			// load a properties file
			prop.load(input);

			// get the property value and set them to variables
			url = prop.getProperty("url");
			user = prop.getProperty("user");
			pass = prop.getProperty("pass");

		} catch (IOException ex) {
			log.error(ex);
		} finally {
			if (input != null) {
				try {
					input.close();
				} catch (IOException e) {
					log.error(e);
				}
			}
		}

		// Establish connection using jdbc
		Connection conn = DriverManager.getConnection(url, user, pass);

		return conn;
	}
}