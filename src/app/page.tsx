"use client";
import Header from "@/components/layout/header";
import { useEffect, useState } from "react";
import todoImg from "@/assets/todoimg.webp";
import Image from "next/image";
import Footer from "@/components/layout/footer";

export default function Home() {
  const words = ["crie", "complete", "edite", "delete"];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);

      setTimeout(() => {
        setIndex((prevIndex) => (prevIndex + 1) % words.length);
        setVisible(true);
      }, 300); // time to transition
    }, 3000); // Change word every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex-col items-center justify-center">
          <div className="flex flex-col items-center   justify-center w-full p-5 ">
            <h2 className="w-full text-5xl font-semibold text-center">
              Bem vindo ao <span className="text-blue-600">Flowist</span>
            </h2>
            <p className="text-3xl text-center pt-5">
              <span
                className={`text-blue-600 transition-opacity duration-500 mr-2 ${
                  visible ? "opacity-100" : "opacity-0"
                }`}
              >
                {words[index]}
              </span>
              tarefas, organize seu dia.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-center items-center w-full p-10 gap-8">
            <Image
              src={todoImg}
              alt="todo image"
              className="w-full md:w-1/3 border-2 rounded-[4px] border-gray-500"
            />
            <p className="bg-gray-50 rounded-[4px] p-5 text-xl w-full md:w-1/2">
              Organize suas tarefas diárias de forma simples e eficiente. Com o
              Flowist, você pode criar, editar, concluir e excluir suas tarefas
              a qualquer momento. Tenha controle do seu dia, aumente sua
              produtividade e nunca mais esqueça de nada importante. <br />
              <br />
              Nosso objetivo é facilitar sua rotina com uma interface intuitiva
              e responsiva, permitindo que você se concentre no que realmente
              importa. Com o Flowist, você pode priorizar tarefas, acompanhar
              seu progresso e transformar sua organização pessoal em um hábito
              natural. <br />
              <br />
              Seja para estudos, trabalho ou tarefas domésticas, o Flowist está
              sempre com você. Comece agora a mudar sua forma de planejar o dia
              — de forma prática, clara e eficiente.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
