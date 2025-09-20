const dgram = require("dgram");

const client = dgram.createSocket("udp4");

const message = Buffer.from("salam from udp client");

client.send(message, 12345, "localhost", (err) => {
  if (err) {
    console.log("client got an error: ", err.stack);
  }
  console.log("client sent message to server");
});

client.on("message", (msg, rinfo) => {
  console.log(
    `Client got reply: ${msg.toString()} from ${rinfo.address}:${rinfo.port}`
  );
  client.close(); // close after receiving response
});
