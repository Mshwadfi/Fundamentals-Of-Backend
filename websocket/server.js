const WebSocket = require("ws");

const port = 8888;
const wss = new WebSocket.Server({ port });
let clients = new Set();
const broadcast = (msg) => {
  msg = typeof msg === "string" ? msg : JSON.stringify(msg);

  for (let client of clients) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(msg.toString());
    }
  }
};
wss.on("connection", (ws) => {
  clients.add(ws);
  console.log("New client connected");
  ws.send("Welcome to the WebSocket server!");

  ws.on("message", (message) => {
    console.log(`Received message: ${message}`);
    const text = message.toString();
    broadcast(text);
  });
  ws.on("close", () => {
    clients.delete(ws);
    console.log("Client disconnected");
  });

  ws.on("error", (error) => {
    console.error("WebSocket error:", error);
  });
});

console.log(`WebSocket server running on ws://localhost:${port}`);
