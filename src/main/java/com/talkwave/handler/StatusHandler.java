package com.talkwave.handler;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;

public class StatusHandler {
    Connection con;
    PreparedStatement ps;
    ResultSet rs;
    Logger logger = Logger.getLogger(MessageHandler.class.getName());
    public StatusHandler() throws ClassNotFoundException, SQLException {
        Class.forName("com.mysql.cj.jdbc.Driver");
        con = DriverManager.getConnection("jdbc:mysql://localhost:3306/talkwave", "root", "qazi");
    }
    public void setUserStatus(String id, String status) throws SQLException  {
        ps = con.prepareStatement("UPDATE users SET status=? WHERE user_id = ?");

        ObjectMapper mapper = new ObjectMapper();
        ps.setString(1, status);
        ps.setString(2, id);
        ps.execute();
    }

    public List<String> getFriendList(String id) throws SQLException {
        ps = con.prepareStatement("SELECT y_id FROM friends WHERE x_id = ?");
        ps.setString(1, id);
        rs = ps.executeQuery();
        List<String> list = new ArrayList<>();
        while (rs.next()) {
            list.add(rs.getString(1));
        }
        return list;
    }

    public void close() throws SQLException {
        con.close();
    }
}
