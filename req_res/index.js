const express = require("express");

const app = express();

// client sends a req and server return back with an appropriate response
// req -> request works better with crud operations
app.get("/greeting", (req, res) => {
  res.send("Hello from Express");
});

app.listen(3000, () => console.log("Server is running on port 3000"));
