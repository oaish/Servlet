package com.talkwave;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.websocket.OnClose;
import javax.websocket.OnMessage;
import javax.websocket.OnOpen;
import javax.websocket.Session;
import javax.websocket.server.ServerEndpoint;
import java.io.IOException;
import java.util.Map;
import java.util.UUID;
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
    public void onMessage(String message, Session session) throws IOException, ServletException {
        if (message.contains("$id:")) {
            sessions.put(message.substring(4), session);
            session.getBasicRemote().sendText("Session added: " + sessions);
            return;
        }

        ObjectMapper mapper = new ObjectMapper();

        JsonNode msg = mapper.readTree(message);

        Session recipientSession = sessions.get(ext("" + msg.get("receiverID")));
        logger.info("#####" + msg.get("receiverID") + "#####" + recipientSession);

        try {
            logger.info("##### OAISH QAZI MESSAGE #####" + recipientSession);
            recipientSession.getAsyncRemote().sendText(message);
            return;
//            session.getBasicRemote().sendText(message);
        } catch (NullPointerException e) {
            session.getBasicRemote().sendText("Null Pointer: " + msg);
        }

    }

    @OnClose
    public void onClose(Session session) {
        // Connection closed, perform cleanup here
    }

    private String ext(String str) {
        return str.substring(1,2);
    }


}
