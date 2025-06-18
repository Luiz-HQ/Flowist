import { Button } from "./ui/button";
import Image from "next/image";
import logotipo from "@/assets/logotipo.png";

export default function Header() {
  return (
    <header className="bg-transparent border-b shadow text-white p-5 flex justify-between items-center">
      <Image src={logotipo} alt="logotipo" width={40} />

      <nav>
        <ul className="flex gap-x-4">
          <li>
            <Button>
              <a href="/login">Login</a>
            </Button>
          </li>
          <li>
            <Button>
              <a href="/register">Register</a>
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
