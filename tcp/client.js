const net = require("net");

const client = new net.Socket();

client.connect(12345, "localhost", () => {
  console.log("connected to tcp server");

  client.write("salam from tcp client\n");

  setTimeout(() => {
    client.write("2nd salam from client\n");
  }, 1000);

  setTimeout(() => {
    client.write("3rd salam from client\n");
  }, 2000);
});

client.on("data", (data) => {
  console.log("Received:", data.toString());
});

client.on("close", () => {
  console.log("Connection closed");
});

client.on("error", (err) => {
  console.error("Error:", err.message);
});
