import http from "node:http";
import app from "../../config/app";

const server = http.createServer(app);

server.listen(3001, () => console.log("> Server listening on port: 3001"));
