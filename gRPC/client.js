import grpc from "@grpc/grpc-js";
import protoLoader from "@grpc/proto-loader";
import path from "path";

const __dirname = process.cwd();
const PROTO_PATH = path.join(__dirname, "proto", "todo.proto");

const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const todoProto = grpc.loadPackageDefinition(packageDefinition).todo;

const client = new todoProto.TodoService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

// Test calls
client.ListTodos({}, (err, response) => {
  if (err) return console.error("Error:", err);
  console.log("📋 Todos:", response.todos);
});

client.CreateTodo(
  { title: "New Task", description: "Created from client" },
  (err, response) => {
    if (err) return console.error("Error:", err);
    console.log("✅ Created:", response.todo);

    // Fetch single todo
    client.GetTodo({ id: response.todo.id }, (err, res) => {
      if (err) return console.error("Error:", err);
      console.log("🔍 Fetched:", res.todo);
    });
  }
);
