const dgram = require("dgram");

// creating a udp protocol server on top of ipv4 for simplicity
const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log(`server got: ${msg} from ${rinfo.address}:${rinfo.port}`);
  server.send("salam from udp server", rinfo.port, rinfo.address);
});

server.on("error", (err) => {
  console.log("server got an error: ", err.stack);
  server.close();
});

server.bind(12345, () => {
  console.log("server is listening on port 12345");
});
