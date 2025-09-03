"use client";

import { login, register } from "@/services/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [error, setError] = useState("");
  const [tab, setTab] = useState("login");
  const router = useRouter();

  const handleLogin = async () => {
    setError("");

    try {
      const res = await login(email, password);
      console.log(res);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.message || "Erro ao fazer login");
    }
  };

  const handleRegister = async () => {
    setError("");

    try {
      const res = await register(name, email, password);
      console.log(res);
      setTab("login");
      setEmail("");
      setPasword("");
      setName("");
    } catch (error: any) {
      setError(error.message || "Erro ao registrar");
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
        <TabsList className="w-full ">
          <TabsTrigger className="cursor-pointer" value="login">
            Logar
          </TabsTrigger>
          <TabsTrigger className="cursor-pointer" value="register">
            Cadastrar
          </TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Todo-App</CardTitle>
              <CardDescription>
                Já tem uma conta? Faça login aqui.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Email</Label>
                <Input
                  type="email"
                  id="tabs-demo-name"
                  placeholder="seuemail@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Senha</Label>
                <Input
                  type="password"
                  id="tabs-demo-username"
                  onChange={(e) => setPasword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                onClick={handleLogin}
                className="w-full bg-blue-600 hover:bg-blue-500 transition duration-200"
              >
                Entrar
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="register">
          <Card>
            <CardHeader>
              <CardTitle>Todo-App</CardTitle>
              <CardDescription>
                Não tem uma conta? Cadastre-se aqui.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Nome</Label>
                <Input
                  id="tabs-demo-current"
                  type="name"
                  placeholder="Seu nome"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Email</Label>
                <Input
                  id="tabs-demo-current"
                  type="email"
                  placeholder="seuemail@email.com"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">Senha</Label>
                <Input
                  id="tabs-demo-new"
                  type="password"
                  onChange={(e) => setPasword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
              <Button
                onClick={handleRegister}
                className="w-full bg-blue-600 hover:bg-blue-500 transition duration-200"
              >
                Criar conta
              </Button>
              {error && <p className="text-red-500">{error}</p>}
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
