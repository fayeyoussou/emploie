package servlet;

import java.io.BufferedReader;
import java.io.IOException;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.jboss.logging.Logger;

import com.fasterxml.jackson.databind.ObjectMapper;

import config.Config;
import ejb_exam.dto.request.LoginRequest;
import ejb_exam.dto.request.RegisterRequest;
import ejb_exam.dto.request.RoleRequest;

/**
 * Servlet implementation class AuthServlet
 */
@WebServlet("/auth/*")
public class AuthServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger log = Logger.getLogger(AuthServlet.class);
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AuthServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		request.setAttribute("page", "auth");

		request.getRequestDispatcher("/index.jsp").forward(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
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
			log.info("ACTION ID : "+actions);
			if(actions[0] == "login") {
				LoginRequest loginRequest = objectMapper.readValue(jsonData, LoginRequest.class);

			}else if(actions[0] == "register") {
				RegisterRequest  registerRequest = objectMapper.readValue(jsonData, RegisterRequest.class);
			}else throw new Exception("incorrect route");
		}catch (Exception e) {
			log.error(e.fillInStackTrace());
			
		}
	}

}
