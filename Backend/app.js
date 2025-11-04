import Fastify from "fastify";
import dotenv from "dotenv";
dotenv.config();
import pool from "./lib/db.js";
import fastifyCors from "@fastify/cors";
import cookie from "fastify-cookie";
const fastify = Fastify({ logger: true });

fastify.register(cookie);

fastify.register(fastifyCors, {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});

import authRoutes from "./Routes/authRoutes.js";
import productsRoutes from "./Routes/productsRoute.js";
import TopupRoutes from "./Routes/TopupRoute.js";
fastify.register(authRoutes);
fastify.register(productsRoutes);
fastify.register(TopupRoutes);

const startServer = async () => {
  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    fastify.log.info(`Server listening on http://localhost:3001`);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

startServer();
