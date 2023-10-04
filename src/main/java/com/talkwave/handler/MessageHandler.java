package com.talkwave.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.sql.*;
import java.util.logging.Logger;

public class MessageHandler {
    Connection con;
    PreparedStatement ps;
    Logger logger = Logger.getLogger(MessageHandler.class.getName());

    public MessageHandler() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        con = DriverManager.getConnection("jdbc:mysql://localhost:3306/talkwave", "root", "qazi");
    }

    public void insertMessage(String jsonData) {
        try {
            ps = con.prepareStatement("INSERT INTO messages (sender_id, receiver_id, content, timestamp) VALUES (?,?,?,?)");

            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(jsonData);

            String sender = jsonNode.get("senderID").asText();
            String receiver = jsonNode.get("receiverID").asText();
            String message = jsonNode.get("message").asText();
            String timestamp = jsonNode.get("timestamp").asText();

            ps.setString(1, sender);
            ps.setString(2, receiver);
            ps.setString(3, message);
            ps.setString(4, timestamp);

            ps.execute();
        } catch (SQLException | JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void updateLastMessage(String jsonData) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode jsonNode = mapper.readTree(jsonData);

            String sender = jsonNode.get("senderID").asText();
            String receiver = jsonNode.get("receiverID").asText();
            String message = jsonNode.get("message").asText();

            ps = con.prepareStatement("UPDATE friends SET last_msg = ? WHERE (x_id = ? AND y_id = ?)");

            ps.setString(1, "You: " + message);
            ps.setString(2, sender);
            ps.setString(3, receiver);
            ps.execute();

            ps.setString(1, message);
            ps.setString(2, receiver);
            ps.setString(3, sender);
            ps.execute();

        } catch (SQLException | JsonProcessingException e) {
            e.printStackTrace();
        }
    }

    public void close() throws SQLException {
        con.close();
    }
}
