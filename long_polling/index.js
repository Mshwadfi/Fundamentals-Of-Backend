const express = require("express");

const app = express();

// long polling: keep the connection open until there's new data
// server holds the request and responds when there's new data

let messages = ["salam"];
let clients = [];

app.get("/long-poll", (req, res) => {
  // store the response object
  clients.push(res);
});

setInterval(() => {
  let newMessage = "New Message" + new Date();
  messages.push(newMessage);

  // respond to all waiting clients when new data arrives
  clients.forEach((res) => res.send(newMessage));

  // since we have responded to all clients, clear the array
  clients = [];
}, 2000);
app.listen(3000, () => console.log("Server is running on port 3000"));
