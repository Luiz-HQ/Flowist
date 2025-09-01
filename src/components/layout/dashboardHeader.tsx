"use client";

import Image from "next/image";
import logotipo from "@/assets/logotipo.png";
import { Input } from "../ui/input";
import { Icon } from "@iconify/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const router = useRouter();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Você tem certeza que deseja sair?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      router.push("/");
    }
  };

  return (
    <header className="bg-white border-b p-5 flex justify-between items-center">
      <Image src={logotipo} alt="logotipo" width={40} />

      <div className="flex items-center gap-x-4">
        <div className="relative flex items-center w-70">
          {/* 2. Position the icon absolutely within the container */}
          <Icon
            icon="ic:baseline-search"
            width="20"
            height="20"
            className="absolute left-3 text-gray-400" // Positioned on the left
          />
          {/* 3. Add padding to the input to make space for the icon */}
          <Input
            className="w-full pl-10 py-4 border rounded-lg" // `pl-10` makes space
            type="text"
            placeholder="Procure sua tarefa..."
          />
        </div>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>

        <Button
          onClick={handleLogout}
          className="bg-transparent hover:bg-red-300 focus:ring-0 border-0 transition-transform duration-200 hover:scale-125"
        >
          <Icon
            icon="material-symbols:logout"
            width={25}
            height={25}
            className="text-red-600"
          />
        </Button>
      </div>
    </header>
  );
}
