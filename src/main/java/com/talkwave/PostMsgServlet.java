package com.talkwave;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.logging.Logger;
import java.util.stream.Collectors;

@WebServlet(name = "postServlet", value = "/api-post-msg")
public class PostMsgServlet extends HttpServlet {
    private static final Logger logger = Logger.getLogger(PostMsgServlet.class.getName());

    public void init() {
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json");
        ObjectMapper objectMapper = new ObjectMapper();
        PrintWriter out = response.getWriter();
        Connection con = null;
        PreparedStatement ps;
        ResultSet rs;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/talkwave", "root", "qazi");
            ps = con.prepareStatement("INSERT INTO messages (sender_id, receiver_id, content, timestamp) VALUES (?,?,?,?)");
            String jsonData = request.getReader().lines().collect(Collectors.joining());

            JsonNode jsonNode = objectMapper.readTree(jsonData);
            String sender = jsonNode.get("senderID").asText();
            String receiver = jsonNode.get("receiverID").asText();
            String message = jsonNode.get("message").asText();
            String timestamp = jsonNode.get("timestamp").asText();

            ps.setString(1, sender);
            ps.setString(2, receiver);
            ps.setString(3, message);
            ps.setString(4, timestamp);

            logger.info(jsonData);
            int num = ps.executeUpdate();
            logger.info(String.valueOf(num));

            out.print("{\"message\":\"" + num + "\"}");

            con.close();
        } catch (ClassNotFoundException | SQLException e) {
            e.printStackTrace();
        }
    }

    public void destroy() {
    }
}
