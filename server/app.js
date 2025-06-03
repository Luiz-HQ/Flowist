import express from "express";
import { signIn, signUp } from "./controllers/auth.ts";

const app = express();
const port = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Vai corinthians!!!");
});

app.post("/signup", signUp);
app.post("/signin", signIn);

app.listen(port, () => {
  console.log(`Servidor Ligado! http://localhost:${port}`);
});
