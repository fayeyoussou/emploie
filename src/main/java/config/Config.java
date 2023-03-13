package config;

import java.util.Arrays;


import javax.servlet.http.HttpServletRequest;
public interface Config {
	public static String[] setPath(HttpServletRequest request , String route) {
		
		String fullpathString = request.getRequestURL().toString();
		String actionstr = fullpathString.substring(fullpathString.indexOf(route) + route.length());
		String[] action = actionstr.split("/");
		
		StringBuilder myroutes = new StringBuilder("");
		if (!actionstr.isBlank()) {
			for (int i = 1; i < action.length; i++) {
				myroutes.append("../");
			}
		}
		
		request.setAttribute("myPath", route);
		request.setAttribute("myroutes", myroutes.toString());
		return Arrays.copyOfRange(action, 1, action.length);
	}
	
//	public static String getRoute(String route,String action) {
//		if("error".equals(action))return "/common/error.jsp";
//		return "/"+Constante.BASEPATH+"/"+route+"/"+action+".jsp";
//	}
	
	
}
