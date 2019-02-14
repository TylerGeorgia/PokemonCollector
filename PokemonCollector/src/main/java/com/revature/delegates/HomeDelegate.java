package com.revature.delegates;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.revature.services.AppServices;

public class HomeDelegate {
	
	private final ObjectMapper mapper = new ObjectMapper();
	
	public void returnLeaderboard(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/json");
		response.getWriter().append(mapper.writeValueAsString(AppServices.getAppService().getLeaderBoard()));
	}
}
