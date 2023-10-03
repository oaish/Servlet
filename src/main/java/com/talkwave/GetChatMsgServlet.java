package com.talkwave;

import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

@WebServlet(name = "getChatMsgServlet", value = "/api-get-chat-msg")
public class GetChatMsgServlet extends HttpServlet {
    Connection con = null;
    PreparedStatement ps;
    ResultSet rs;
    String jsonMsgData;
    Logger logger = Logger.getLogger(JSPServlet.class.getName());
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        resp.setContentType("application/json");
        String senderID = req.getParameter("senderID");
        String receiverID = req.getParameter("receiverID");
        PrintWriter out = resp.getWriter();

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            con = DriverManager.getConnection("jdbc:mysql://localhost:3306/talkwave", "root", "qazi");
            ps = con.prepareStatement("SELECT * FROM messages WHERE (sender_id = ? AND receiver_id = ?) OR (sender_id = ? AND receiver_id = ?) ORDER BY message_id");

            ps.setInt(1, Integer.parseInt(senderID));
            ps.setInt(2, Integer.parseInt(receiverID));
            ps.setInt(3, Integer.parseInt(receiverID));
            ps.setInt(4, Integer.parseInt(senderID));

            logger.info(ps.toString());

            rs = ps.executeQuery();

            ObjectMapper mapper = new ObjectMapper();
            List<Object> jsonArray = new ArrayList<>();

            while (rs.next()) {
                Message message = new Message();
                message.setMessageId(rs.getInt("message_id"));
                message.setSenderId(rs.getInt("sender_id"));
                message.setReceiverId(rs.getInt("receiver_id"));
                message.setContent(rs.getString("content"));
                message.setTimestamp(rs.getString("timestamp"));

                String json = mapper.writeValueAsString(message);
                jsonArray.add(json);
            }

            jsonMsgData = mapper.writeValueAsString(jsonArray);
            logger.info(jsonMsgData);

            out.println(jsonMsgData);
        } catch (ClassNotFoundException | SQLException e) {
            logger.info("Error: " + e.getMessage());
        }

    }
}
