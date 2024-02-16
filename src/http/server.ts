import { PrismaClient } from "@prisma/client";
import fastify from "fastify";

import { z } from "zod";

const app = fastify();

const prisma = new PrismaClient();
app.post("/polls", async (req, reply) => {
  const createPollBody = z.object({
    title: z.string(),
  });

  const { title } = createPollBody.parse(req.body);

  const poll = await prisma.poll.create({ data: { title } });

  return reply.status(201).send({
    pollId: poll.id,
  });
});

app.get("/polls", async (req, reply) => {
    const polls = await prisma.poll.findMany();

    return reply.status(200).send({polls})
})

app.listen({ port: 3333 }).then(() => {
  console.log("Server is running on http://localhost:3333");
});
