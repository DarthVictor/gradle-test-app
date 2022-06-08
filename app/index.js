import Fastify from "fastify";
import payload from "../data/payload.json" assert { type: "json" };

const fastify = Fastify({ logger: process.env.NODE_ENV === "development" });
const payloadString = JSON.stringify(payload);

fastify.get("/api/repos", (request, reply) => {
    reply.send(payloadString);
});

fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;
});
