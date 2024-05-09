package com.example.webchatserver;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.websocket.*;
import jakarta.websocket.server.PathParam;
import jakarta.websocket.server.ServerEndpoint;
import org.json.JSONObject;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * This class represents a web socket server that manages chat rooms identified by roomIDs.
 **/
@ServerEndpoint(value="/ws/{roomID}")
public class ChatServer {

    // Map of roomIDs to a set of sessions (users) in that room
    private static Map<String, Set<Session>> roomList = new HashMap<>();

    // Map to keep track of usernames associated with user sessions
    private Map<String, String> usernames = new HashMap<>();

    @OnOpen
    public void open(Session session, @PathParam("roomID") String roomID) throws IOException{
        // Add the session to the room
        roomList.computeIfAbsent(roomID, k -> new HashSet<>()).add(session);
        // Send welcome message
        session.getBasicRemote().sendText("{\"type\": \"chat\", \"message\":\"(Server): Welcome to the chat room. Please state your username to begin.\"}");
    }

    @OnClose
    public void close(Session session) throws IOException {
        String userId = session.getId();
        String roomID = findRoomIdBySession(userId);
        if (roomID != null && usernames.containsKey(userId)) {
            String username = usernames.remove(userId);
            roomList.get(roomID).remove(session);  // Remove session from the room
            // Broadcast that this user has left
            broadcastMessage(roomID, "{\"type\": \"chat\", \"timeStamp\": \"" + getCurrentTimeStamp() + "\", \"message\":\"(Server " + roomID + "): " + username + " left the chat room.\"}");
        }
    }

    @OnMessage
    public void handleMessage(String comm, Session session, @PathParam("roomID") String roomID) throws IOException {
        JSONObject jsonmsg = new JSONObject(comm);
        String type = jsonmsg.getString("type");
        String message = jsonmsg.getString("msg");

        if ("chat".equals(type)) {
            if (usernames.containsKey(session.getId())) {
                // User already exists, send their message
                broadcastMessage(roomID, "{\"type\": \"chat\", \"timeStamp\": \"" + getCurrentTimeStamp() + "\", \"message\":\"(" + usernames.get(session.getId()) + "): " + message + "\"}");
            } else {
                // New user, set their username
                usernames.put(session.getId(), message);
                session.getBasicRemote().sendText("{\"type\": \"chat\", \"timeStamp\": \"" + getCurrentTimeStamp() + "\", \"message\":\"(Server): Welcome, " + message + "!\"}");
                // Broadcast that a new user has joined
                broadcastMessage(roomID, "{\"type\": \"chat\", \"timeStamp\": \"" + getCurrentTimeStamp() + "\", \"message\":\"(Server " + roomID + "): " + message + " joined the chat room.\"}");
            }
        }
    }

    // Helper method to broadcast a message to all users in the same room
    private void broadcastMessage(String roomID, String message) throws IOException {
        if (roomList.containsKey(roomID)) {
            for (Session peer : roomList.get(roomID)) {
                peer.getBasicRemote().sendText(message);
            }
        }
    }

    // Helper method to find the room ID associated with a user session
    private String findRoomIdBySession(String userId) {
        for (Map.Entry<String, Set<Session>> entry : roomList.entrySet()) {
            for (Session session : entry.getValue()) {
                if (session.getId().equals(userId)) {
                    return entry.getKey();
                }
            }
        }
        return null;  // Not found
    }

    // Helper method to get the current timestamp
    private String getCurrentTimeStamp() {
        SimpleDateFormat sdf = new SimpleDateFormat("HH:mm:ss");
        return sdf.format(new Date());
    }
}
