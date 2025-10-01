"use client";

import { login, register } from "@/services/auth";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "react-toastify";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [tab, setTab] = useState("login");
  const router = useRouter();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await login(email, password);
      if (res) {
        router.push("/dashboard");
      }
    } catch (error: any) {
      toast.error(
        error.message || "Erro ao fazer login. Verifique suas credenciais."
      );
    }
  };

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const res = await register(name, email, password);
      if (res) {
        toast.success("Conta criada com sucesso! Faça o login para continuar.");
        setTab("login");
        setEmail("");
        setPasword("");
        setName("");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro ao registrar. Tente novamente.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="w-full max-w-sm m-4 md:m-0 gap-6"
        defaultValue="login"
      >
        <TabsList className="w-full">
          <TabsTrigger className="rounded-[4px] cursor-pointer" value="login">
            Logar
          </TabsTrigger>
          <TabsTrigger
            className="rounded-[4px] cursor-pointer"
            value="register"
          >
            Cadastrar
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <Card className=" rounded-[4px]">
              <CardHeader>
                <CardTitle className="text-blue-600">Flowist</CardTitle>
                <CardDescription>
                  Já tem uma conta? Faça login aqui.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    type="email"
                    id="login-email"
                    placeholder="seuemail@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-[4px]"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="login-password">Senha</Label>
                  <Input
                    type="password"
                    id="login-password"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                    className="rounded-[4px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="rounded-[4px] w-full bg-blue-600 hover:bg-blue-500 transition duration-200"
                >
                  Entrar
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
        <TabsContent value="register">
          <form onSubmit={handleRegister}>
            <Card className="rounded-[4px]">
              <CardHeader>
                <CardTitle className="text-blue-600">Flowist</CardTitle>
                <CardDescription>
                  Não tem uma conta? Cadastre-se aqui.
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="register-name">Nome</Label>
                  <Input
                    id="register-name"
                    type="text"
                    placeholder="Seu nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="rounded-[4px]"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="register-email">Email</Label>
                  <Input
                    id="register-email"
                    type="email"
                    placeholder="seuemail@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="rounded-[4px]"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="register-password">Senha</Label>
                  <Input
                    id="register-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPasword(e.target.value)}
                    className="rounded-[4px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="rounded-[4px] w-full bg-blue-600 hover:bg-blue-500 transition duration-200"
                >
                  Criar conta
                </Button>
              </CardFooter>
            </Card>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
