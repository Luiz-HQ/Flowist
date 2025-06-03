import type { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma/default.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export const signUp = async (req: Request, res: Response) => {
  const { email, password, name } = req.body;

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "É necessario preencher os campos de email e senha!" });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Email inválido! " });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "A senha deve ter no minimo 6 caracteres." });
  }

  const hashPassword = bcrypt.hashSync(password, 10);

  try {
    const result = await prisma.user.create({
      data: { email, password: hashPassword, ...(name && { name }) },
    });
    return res.status(201).json(`Conta criada com sucesso! ${result}`);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro no servidor, tente novamente mais tarde!" });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "É necessario preencher os campos de email e senha!" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuário não encontrado!" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Senha ou email incorreto, tente novamente!" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, ...(user.name && { name: user.name }) },
      process.env.JWT_SECRET || "default_secret_key",
      { expiresIn: "1h" }
    );

    return res
      .status(200)
      .json({ message: `Login realizado com sucesso! ${token}` });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Erro no servidor, tente novamente mais tarde!" });
  }
};
