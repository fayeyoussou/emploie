package config;

import java.util.HashMap;
import java.util.Map;

import javax.ejb.EJB;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import ejb_exam.entities.User;
import ejb_exam.service.auth.AuthLocalService;

public class SecurityConfig {
	
	public User isLogin(AuthLocalService authService,HttpServletRequest request) {
			HttpSession session = request.getSession();
			Object buser = session.getAttribute("user");
			String user = buser == null ? "" : (String)buser;
			Object bpass = session.getAttribute("pass");
			String pass = bpass == null ? "" : (String)bpass;
			if(user.isBlank() || pass.isBlank()) {
				return null;
				
			}else {
				return authService.isLogin(user,pass);
				
			}
	}
}
