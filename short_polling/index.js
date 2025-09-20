const express = require("express");

const app = express();

// short polling: client asks repeatedly

let messages = ["salam"];
app.get("/short-poll", (req, res) => {
  res.send("Hello from Express");
});

setInterval(() => {
  messages.push("salam at" + new Date());
}, 2000);
app.listen(3000, () => console.log("Server is running on port 3000"));
