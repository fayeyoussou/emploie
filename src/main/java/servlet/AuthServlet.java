package servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.jboss.logging.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;

import config.Config;
import ejb_exam.dto.request.LoginRequest;
import ejb_exam.dto.request.RegisterRequest;
import ejb_exam.dto.request.RoleRequest;
import ejb_exam.entities.User;
import ejb_exam.service.Role.RoleLocalService;
import ejb_exam.service.auth.AuthLocalService;
import ejb_exam.service.auth.AuthService;

/**
 * Servlet implementation class AuthServlet
 */
@WebServlet("/auth/*")
public class AuthServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(AuthServlet.class);
	@EJB
	private AuthLocalService authService;

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public AuthServlet() {
		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		String[] actions = Config.setPath(request, "auth");
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		ObjectMapper mapper = new ObjectMapper();
		try {
			Map<String, Object> mapres = new HashMap<>();
			if (actions.length > 0 && actions[0].equalsIgnoreCase("islogin")) {
				HttpSession session = request.getSession();
				Object buser = session.getAttribute("user");
				String user = buser == null ? "" : (String)buser;
				Object bpass = session.getAttribute("pass");
				String pass = bpass == null ? "" : (String)bpass;
				if(user.isBlank() || pass.isBlank()) {
					log.info("user is blacnk");
					mapres.put("result", false);
					
				}else {
					User users = authService.isLogin(user,pass);
					if(users == null) {
						log.info("user is null");
						mapres.put("result", false);
					}
					else {
						log.info("login");
						mapres.put("result", true);
						mapres.put("value",users);
					}
				}
				String userJson = mapper.writeValueAsString(mapres);
				out.print(userJson);
				out.flush();
			} else {
				request.setAttribute("page", "auth");

				request.getRequestDispatcher("/index.jsp").forward(request, response);
			}
		} catch (Exception e) {
			// TODO: handle exception
		} finally {
			
		}
		
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		ObjectMapper mapper = new ObjectMapper();
		try {
			BufferedReader reader = request.getReader();
			StringBuilder sb = new StringBuilder();
			String line;
			while ((line = reader.readLine()) != null) {
				sb.append(line);
			}
			String jsonData = sb.toString();

			// Parse the JSON data into a Java object
			ObjectMapper objectMapper = new ObjectMapper();
			String[] actions = Config.setPath(request, "auth");
			log.info("ACTION ID : " + actions[0]);
			if ("login".equalsIgnoreCase(actions[0].trim())) {
				LoginRequest loginRequest = objectMapper.readValue(jsonData, LoginRequest.class);
				User user = authService.login(loginRequest);
				if (user == null) {
					throw new Exception("Bad Credentials !!!");
				} else {
					HttpSession httpSession = request.getSession();
					httpSession.setAttribute("user", user.getLogin());
					httpSession.setAttribute("pass", user.getPassword());
					httpSession.setAttribute("id", user.getId());
					String userJson = mapper.writeValueAsString(user);
					out.print(userJson);
					out.flush();
				}

			} else if ("register".equals(actions[0].trim())) {
				RegisterRequest registerRequest = objectMapper.readValue(jsonData, RegisterRequest.class);
				User user = authService.register(registerRequest);
				String userJson = mapper.writeValueAsString(user);
				out.print(userJson);
				out.flush();
			} else
				throw new Exception("incorrect route");
		} catch (Exception e) {
			log.error("error on Catch doPost",e);
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		    response.getWriter().print(e.getMessage());
		} finally {
			out.close();
		}
	}

}
