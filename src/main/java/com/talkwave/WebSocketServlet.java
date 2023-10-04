package com.talkwave;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.talkwave.handler.MessageHandler;
import com.talkwave.handler.StatusHandler;

import javax.servlet.ServletException;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.logging.Logger;

@ServerEndpoint("/websocket")
public class WebSocketServlet {
    Logger logger = Logger.getLogger(WebSocketServlet.class.getName());
    private static final Map<String, Session> sessions = new ConcurrentHashMap<>();

    @OnOpen
    public void onOpen(Session session) {
        logger.info(session.getId());
    }

    @OnMessage
    public void onMessage(String message, Session session) throws IOException, ServletException, SQLException, ClassNotFoundException {
        if (message.contains("$id:")) {
            String id = message.substring(4);
            sessions.put(id, session);
            handleStatus(id, "online");
            return;
        }

        if (message.contains("$offline:")) {
            String id = message.substring(9);
            logger.info("###>>>>> Offline Call <<<<<###");
            handleStatus(id, "offline");
            logger.info("###>>>>> Offline Call <<<<<###");
            return;
        }

        MessageHandler msgHandler = new MessageHandler();
        msgHandler.insertMessage(message);
        msgHandler.updateLastMessage(message);
        msgHandler.close();

        ObjectMapper mapper = new ObjectMapper();

        JsonNode msg = mapper.readTree(message);
        String receiverID = msg.get("receiverID").toString().substring(1, 2);

        Session recipientSession = sessions.get(receiverID);

        try {
            recipientSession.getAsyncRemote().sendText(message);
            logger.info("### Websocket onMessage Try ###");
        } catch (NullPointerException e) {
            session.getAsyncRemote().sendText("NullPointerException");
        }

        logger.info("### Websocket onMessage End ###");
    }

    @OnClose
    public void onClose(Session session) {

    }

    public void handleStatus(String id, String status) throws SQLException, ClassNotFoundException, IOException {
        StatusHandler statusHandler = new StatusHandler();
        statusHandler.setUserStatus(id, status);
        List<String> list = statusHandler.getFriendList(id);
        for (String item : list) {
            Session s = sessions.get(item);
            if (s != null) {
                s.getBasicRemote().sendText("$" + status + ":" + id);
            }
        }
    }

}
