// ESM
import Fastify from "fastify";
import payload from "../data/payload.json" assert { type: "json" };

const fastify = Fastify();

// Declare a route
fastify.get("/api/repos", (request, reply) => {
    reply.send(payload);
});

// Run the server!
fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err;
});
