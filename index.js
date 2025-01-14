import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import chalk from "chalk";
import http from "http";
import { WebSocketServer } from "ws";

import connecttoDB from "./Config/connecttoDB.js";
import connecttoRedis from "./Config/connecttoRedis.js";
import checkforToken from "./Middleware/checkforToken.js";
import loginRoute from "./Routes/loginRoute.js";
import registerRoute from "./Routes/registerRoute.js";
import profileRoute from "./Routes/profileRoute.js";
import filterRoute from "./Routes/filterRoute.js";
import webRTCRoute from "./Routes/webRTCRoute.js";
import logoutController from "./Controller/logoutController.js";
import verifyUsing1CARD from "./Middleware/verifyUsing1CARD.js";

dotenv.config();
const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Middleware and Routes
app.post("/api/checkforToken", checkforToken);
app.use("/api/login", loginRoute);
app.use("/api/register", registerRoute);
app.use("/api/profile", profileRoute);
app.use("/api/filter", filterRoute);
app.use("/api/webrtc", webRTCRoute);
app.use("/api/logout", logoutController);
app.use("/api/verify", verifyUsing1CARD);

// WebSocket Signaling Server Logic
let rooms = new Map(); // Map to store clients by childId

wss.on("connection", (ws) => {
  console.log("New WebSocket connection established");

  ws.on("message", (message) => {
    const data = JSON.parse(message);

    if (data.type === "register") {
      // Register client in the room associated with childId
      const { childId, clientId } = data;
      if (!rooms.has(childId)) {
        rooms.set(childId, new Map());
      }
      rooms.get(childId).set(clientId, ws);
      console.log(`Client registered: ${clientId} in room: ${childId}`);
      return;
    }

    if (data.type === "message") {
      const { childId, senderId, message } = data;
      const room = rooms.get(childId);

      if (room) {
        // Relay the message to all clients in the room
        room.forEach((clientSocket, clientId) => {
          if (clientSocket.readyState === 1) {
            // 1 = WebSocket.OPEN
            clientSocket.send(
              JSON.stringify({
                type: "message",
                childId,
                senderId,
                message,
              })
            );
          }
        });
      } else {
        console.log(`No room found for childId: ${childId}`);
      }
    }
  });

  ws.on("close", () => {
    // Remove disconnected clients
    rooms.forEach((room, childId) => {
      for (const [clientId, clientSocket] of room.entries()) {
        if (clientSocket === ws) {
          room.delete(clientId);
          console.log(`Client disconnected: ${clientId} from room: ${childId}`);
          if (room.size === 0) {
            rooms.delete(childId);
          }
          break;
        }
      }
    });
  });
});

console.log(chalk.bgBlue("WebSocket server running on ws://localhost:3000"));

// Database and Redis Connections
connecttoDB();
// connecttoRedis();

const startServer = (port) => {
  server
    .listen(port, () => {
      console.log(chalk.bgBlue("Listening on port", port));
    })
    .on("error", (e) => {
      if (e.code === "EADDRINUSE") {
        console.log(chalk.yellow(`Port ${port} is busy, trying ${port + 1}`));
        startServer(port + 1);
      }
    });
};

const PORT = process.env.PORT || 3000;
startServer(PORT);
