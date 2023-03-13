package servlet;

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

import config.Config;
import ejb_exam.dao.RoleDao;
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
				JsonObject roleJson = Json.createObjectBuilder().add("id", 0).add("nom", "").build();
				writer.writeObject(roleJson);
			} finally {
				writer.close();
				out.flush();
			}

		} else {
			List<RoleResponse> roles = roleService.list();
			request.setAttribute("roles", roles);
			request.setAttribute("page", "role");
			request.setAttribute("entity", "Role");
			request.getRequestDispatcher("/index.jsp").forward(request, response);
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
