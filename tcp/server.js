const net = require("net");

const server = net.createServer((socket) => {
  console.log(
    `new client connected from ${socket.remoteAddress}:${socket.remotePort}`
  );

  socket.on("data", (data) => {
    console.log("message from client: ", data.toString());
    socket.write("salam from tcp server");
  });

  socket.on("end", () => {
    console.log("client disconnected");
  });

  socket.on("error", (err) => {
    console.log("socket error: ", err);
  });
});

server.listen(12345, () => {
  console.log("server is listening on port 12345");
});
