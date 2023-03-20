package servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.ejb.EJB;
import javax.json.Json;
import javax.json.JsonObject;
import javax.json.JsonWriter;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.jboss.logging.Logger;
import com.fasterxml.jackson.databind.ObjectMapper;
import config.Config;

import ejb_exam.dto.request.RoleRequest;
import ejb_exam.dto.response.RoleResponse;

import ejb_exam.service.Role.RoleLocalService;

/**
 * Servlet implementation class RoleServlet
 */
@WebServlet("/role/*")
public class RoleServlet extends HttpServlet {
	@EJB
	private RoleLocalService roleService;
	private static final long serialVersionUID = 1L;
	private static final Logger logger = Logger.getLogger(RoleServlet.class);

	/**
	 * @see HttpServlet#HttpServlet()
	 */
	public RoleServlet() {

		super();
		// TODO Auto-generated constructor stub
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
//		RoleRequest roleRequest = new RoleRequest();
//		roleRequest.setNom("ADMIN");
//		roleService.saveRole(roleRequest);
		// response.getWriter().append("Served at: ").append(request.getContextPath());
		String[] actions = Config.setPath(request, "role");
		if (actions.length > 0) {
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();
			JsonWriter writer = Json.createWriter(out);
			try {
				Long id = Long.parseLong(actions[0]);
				RoleResponse roleResponse = roleService.getRoleById(id);
				JsonObject roleJson = Json.createObjectBuilder().add("id", roleResponse.getId())
						.add("nom", roleResponse.getNom()).build();

				writer.writeObject(roleJson);

			} catch (Exception e) {

				JsonObject errorJson = Json.createObjectBuilder().add("message", e.getMessage()).build();
				response.setStatus(400);
				writer.writeObject(errorJson);

			} finally {
				writer.close();
				out.flush();
			}

		} else {
			List<RoleResponse> roles = roleService.list();
			request.setAttribute("roles", roles);
			request.setAttribute("page", "role");

			request.getRequestDispatcher("/index.jsp").forward(request, response);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		handleRequest(request, response, true);
		
	}

	private void handleRequest(HttpServletRequest request, HttpServletResponse response,Boolean isCreate) throws IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		JsonWriter writer = Json.createWriter(out);
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
			RoleRequest role = objectMapper.readValue(jsonData, RoleRequest.class);
			String[] actions = Config.setPath(request, "role");
			logger.info("ACTION ID : "+actions);
			RoleResponse roleResponse = new RoleResponse();
			if (!role.getNom().isBlank()) {
				if(isCreate)
				{
					roleResponse = roleService.saveRole(role);
				}else if (actions.length > 0 && actions[0].matches("\\d+")){
					
					Long id = Long.parseLong(actions[0]);
					roleResponse = roleService.editRole(id, role);
					
				}else {
					logger.error("error in request");
					throw new Exception("request error");
				}
				JsonObject roleJson = Json.createObjectBuilder().add("id", roleResponse.getId())
						.add("nom", roleResponse.getNom()).build();
				writer.writeObject(roleJson);


				logger.info("nom is not blank");
			} else {
				throw new Exception("nom is empty");

			}

			


		} catch (Exception e) {
			logger.error(e.fillInStackTrace());
			JsonObject errorJson = Json.createObjectBuilder().add("message", e.getMessage()).build();
			response.setStatus(400);
			writer.writeObject(errorJson);
		} finally {
			writer.close();
			out.flush();
		}
	}

	@Override
	protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		JsonWriter writer = Json.createWriter(out);
		try {
			String[] actions = Config.setPath(request, "role");
			logger.info("ACTION ID : "+actions);
			if (actions.length  > 0  && actions[0].matches("\\d+")) {
				Long idRole = Long.parseLong(actions[0]);
				roleService.delete(idRole);
				JsonObject roleJson = Json.createObjectBuilder()
						.add("message", "")
						.build();
				writer.writeObject(roleJson);


				logger.info("nom is not blank");
			} else {
				throw new Exception("id should be given is empty");

			}
		} catch (Exception e) {
			logger.error(e.fillInStackTrace());
			JsonObject errorJson = Json.createObjectBuilder().add("message", e.getMessage()).build();
			response.setStatus(400);
			writer.writeObject(errorJson);
		} finally {
			writer.close();
			out.flush();
		}		
	}

	@Override
	protected void doPut(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		handleRequest(req, resp, false);
	}

}
