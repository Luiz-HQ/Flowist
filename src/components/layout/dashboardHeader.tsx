"use client";

import Image from "next/image";
import logotipo from "@/assets/logotipo.png";
import { Input } from "../ui/input";
import { Icon } from "@iconify/react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { NextRequest } from "next/server";
import { logout } from "@/services/auth";

interface DashboardHeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onSearchSubmit?: (event: React.FormEvent) => void;
}

export default function DashboardHeader({
  searchTerm,
  onSearchChange,
  onSearchSubmit,
}: DashboardHeaderProps) {
  const router = useRouter();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Você tem certeza que deseja sair?");
    if (confirmLogout) {
      logout();
      router.push("/");
    }
  };

  return (
    <header className="bg-white border-b p-5 flex justify-between items-center">
      <Image src={logotipo} alt="logotipo" width={40} />

      <div className="flex items-center gap-x-4">
        <form
          onSubmit={onSearchSubmit}
          className="relative flex items-center w-70"
        >
          {/* 2. Position the icon absolutely within the container */}
          <Icon
            icon="ic:baseline-search"
            width="20"
            height="20"
            className="absolute left-3 text-gray-400" // Positioned on the left
          />
          {/* 3. Add padding to the input to make space for the icon */}
          <Input
            className="w-full pl-10 py-4 border rounded-[4px]" // `pl-10` makes space
            type="text"
            placeholder="Procure sua tarefa..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </form>

        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>

        <Button
          onClick={handleLogout}
          className=" bg-transparent size-[25px] shadow-none hover:bg-transparent focus:ring-0 border-0 transition-transform duration-200 hover:scale-140"
        >
          <Icon
            icon="material-symbols:logout"
            width={25}
            height={25}
            className="text-red-500 size-[20px]"
          />
        </Button>
      </div>
    </header>
  );
}
