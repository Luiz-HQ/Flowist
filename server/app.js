import express from "express";
import { PrismaClient } from "./generated/prisma/default.js";

const prisma = new PrismaClient();

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.post("/signup", async (req, res) => {
  const { email, name } = req.body;
  const result = await prisma.user.create({
    data: { email, name },
  });
  res.json(result);
});

app.listen(port, () => {
  console.log(`Servidor Ligado! http://localhost:${port}`);
});
