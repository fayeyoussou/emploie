package servlet;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;
import java.util.Map;

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
import config.SecurityConfig;
import ejb_exam.dto.request.LoginRequest;
import ejb_exam.dto.request.RoleRequest;
import ejb_exam.dto.response.DiscussionListResponse;
import ejb_exam.dto.response.DiscussionMessagesRes;
import ejb_exam.dto.response.RoleResponse;
import ejb_exam.entities.Discussion;
import ejb_exam.service.auth.AuthLocalService;
import ejb_exam.service.forum.ForumServiceLocal;

/**
 * Servlet implementation class ForumServlet
 */
@WebServlet("/forum/*")
public class ForumServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
	private static final Logger logger = Logger.getLogger(ForumServlet.class);
	@EJB
	private ForumServiceLocal forumService;
	@EJB
	private AuthLocalService authService;
	private final SecurityConfig securityConfig = new SecurityConfig();
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ForumServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String[] actions = Config.setPath(request, "forum");
		response.setContentType("application/json");
		PrintWriter out = response.getWriter();
		ObjectMapper mapper = new ObjectMapper();
		try {
//			BufferedReader reader = request.getReader();
//			StringBuilder sb = new StringBuilder();
//			String line;
//			while ((line = reader.readLine()) != null) {
//				sb.append(line);
//			}
//			String jsonData = sb.toString();
//
//			// Parse the JSON data into a Java object
//			ObjectMapper objectMapper = new ObjectMapper();
//			RoleRequest role = objectMapper.readValue(jsonData, RoleRequest.class);
			if(securityConfig.isLogin(authService, request) == null) {
				response.sendRedirect(request.getContextPath() + "/auth");
			}
			else if(actions.length == 0) {
				List<DiscussionListResponse> discussions = forumService.listDiscussions();
				request.setAttribute("discussions", discussions);
				request.setAttribute("page", "forum");

				request.getRequestDispatcher("/index.jsp").forward(request, response);
			} else if(actions[0].matches("\\d+")) {
				Long id = Long.parseLong(actions[0]);
				DiscussionMessagesRes messages = forumService.listMessages(id);
				request.setAttribute("page", "messages");
				request.setAttribute("messages", messages);
				request.getRequestDispatcher("/index.jsp").forward(request, response);
			}
//			logger.info("ACTION ID : " + actions);
//			RoleResponse roleResponse = new RoleResponse();
//			if (!role.getNom().isBlank()) {
//				if (isCreate) {
//					roleResponse = roleService.saveRole(role);
//				} else if (actions.length > 0 && actions[0].matches("\\d+")) {
//
//					Long id = Long.parseLong(actions[0]);
//					roleResponse = roleService.editRole(id, role);
//
//				} else {
//					logger.error("error in request");
//					throw new Exception("request error");
//				}
//				JsonObject roleJson = Json.createObjectBuilder().add("id", roleResponse.getId())
//						.add("nom", roleResponse.getNom()).build();
//				writer.writeObject(roleJson);
//
//				logger.info("nom is not blank");
//			} else {
//				throw new Exception("nom is empty");
//
//			}

		} catch (Exception e) {
			logger.error("error on Catch doPost",e);
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		    response.getWriter().print(e.getMessage());
		} finally {
			out.close();
		}
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String[] actions = Config.setPath(request, "forum");
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
			if(actions.length == 0) {
				Map forum = objectMapper.readValue(jsonData, Map.class);
				logger.info(forum.get("nom"));
				Discussion discussion = new Discussion();
				discussion.setCreateur(securityConfig.isLogin(authService, request));
				discussion.setSujet((String)forum.get("nom"));
				DiscussionListResponse discussionListResponse = forumService.saveDiscussion(discussion);
				String discString = mapper.writeValueAsString(discussionListResponse);
				out.print(discString);
				out.flush();
			}
		} catch (Exception e) {
			logger.error("error on Catch doPost",e);
			response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
		    response.getWriter().print(e.getMessage());
		} finally {
			out.close();
		}
		
	}

}
