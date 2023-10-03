package com.talkwave;

import java.io.*;
import java.sql.*;
import java.util.logging.Logger;
import javax.servlet.http.*;
import javax.servlet.annotation.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ArrayNode;
import com.fasterxml.jackson.databind.node.ObjectNode;

@WebServlet(name = "getServlet", value = "/api-get-friends")
public class GetFriendsServlet extends HttpServlet {

    Logger logger = Logger.getLogger(GetFriendsServlet.class.getName());

    public void init() {
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String senderID = request.getParameter("senderID");
        response.setContentType("application/json");
        PrintWriter out = response.getWriter();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/talkwave", "root", "qazi");
            PreparedStatement ps = con.prepareStatement("SELECT user_id, username, password, profile_name, status FROM friends f JOIN users u ON u.user_id = f.y_id WHERE x_id = ?");
            ps.setString(1, senderID);
            logger.info(ps.toString());
            ResultSet rs = ps.executeQuery();

            ObjectMapper objectMapper = new ObjectMapper();

            ArrayNode arrayNode = objectMapper.createArrayNode();

            while (rs.next()) {
                ObjectNode userNode = objectMapper.createObjectNode();
                userNode.put("id", rs.getString(1));
                userNode.put("username", rs.getString(2));
                userNode.put("password", rs.getString(3));
                userNode.put("profileName", rs.getString(4));
                userNode.put("status", rs.getString(5));
                arrayNode.add(userNode);
            }

            String json = arrayNode.toString();

            logger.info(json);

            out.println(json);
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    public void destroy() {
    }
}