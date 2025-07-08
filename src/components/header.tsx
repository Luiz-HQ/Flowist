import { Button } from "./ui/button";
import Image from "next/image";
import logotipo from "@/assets/logotipo.png";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-transparent border-b shadow text-white p-5 flex justify-between items-center">
      <Image src={logotipo} alt="logotipo" width={40} />

      <nav>
        <ul className="flex gap-x-4">
          <li>
            <Button onClick={() => router.push("/login")}>Login</Button>
          </li>
          <li>
            <Button onClick={() => router.push("/register")}>Register</Button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
