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

let todos = [
  {
    id: 1,
    title: "Learn gRPC",
    description: "Understand gRPC basics",
    done: false,
  },
  {
    id: 2,
    title: "Build API",
    description: "Implement TodoService",
    done: false,
  },
];

let currentId = todos.length;

// Implement service methods
const todoService = {
  ListTodos: (_, callback) => {
    callback(null, { todos });
  },

  GetTodo: (call, callback) => {
    const todo = todos.find((t) => t.id === call.request.id);
    if (!todo)
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Todo not found",
      });
    callback(null, { todo });
  },

  CreateTodo: (call, callback) => {
    const newTodo = {
      id: ++currentId,
      title: call.request.title,
      description: call.request.description,
      done: false,
    };
    todos.push(newTodo);
    callback(null, { todo: newTodo });
  },

  UpdateTodo: (call, callback) => {
    const index = todos.findIndex((t) => t.id === call.request.todo.id);
    if (index === -1)
      return callback({
        code: grpc.status.NOT_FOUND,
        message: "Todo not found",
      });
    todos[index] = call.request.todo;
    callback(null, { todo: todos[index] });
  },

  DeleteTodo: (call, callback) => {
    const index = todos.findIndex((t) => t.id === call.request.id);
    if (index === -1) return callback(null, { success: false });
    todos.splice(index, 1);
    callback(null, { success: true });
  },
};

// Start gRPC server
const server = new grpc.Server();
server.addService(todoProto.TodoService.service, todoService);
server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  () => {
    console.log("🚀 gRPC server running on 0.0.0.0:50051");
    server.start();
  }
);
