import { Button } from "@/components/ui/button";
import Image from "next/image";
import logotipo from "@/assets/logotipo.png";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();

  return (
    <header className="bg-transparent border-b shadow text-white p-5 flex justify-between items-center">
      <Image src={logotipo} alt="logotipo" width={40} />

      <Button className="rounded-[4px]" onClick={() => router.push("/login")}>
        Login
      </Button>
    </header>
  );
}
