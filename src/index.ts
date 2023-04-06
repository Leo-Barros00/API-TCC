import 'dotenv/config';
import 'reflect-metadata';
import Server from "./server";

const PORT = parseInt(process.env.PORT ?? '3000');

const server = new Server(PORT)

server.start()