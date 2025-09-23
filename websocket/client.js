const WebSocket = require("ws");
const readline = require("readline");
const ws = new WebSocket(`ws://localhost:8888`);

const readL = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "you> ",
});

ws.on("open", () => {
  console.log("i am connected✅");
  readL.prompt();

  readL.on("line", (line) => {
    const msg = line.trim();
    if (msg.toLowerCase() === "q") {
      ws.close();
      readL.close();
    }
    if (msg !== "") {
      ws.send(msg);
      readL.prompt();
    }
  });
});

ws.on("message", (message) => {
  console.log(`recieved message from server: ${message}`);
});

ws.on("close", () => {});
