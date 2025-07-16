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
    }, 5000); // Change word every 2 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-1 flex-col items-center justify-center">
          <div className="flex justify-center w-full p-5 ">
            <h2 className="flex flex-col items-center w-full text-5xl font-semibold">
              Bem vindo ao seu TodoApp
              <p className="text-3xl pt-5">
                <span
                  className={`text-purple-600 transition-opacity duration-500 mr-2 ${
                    visible ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {words[index]}
                </span>
                tarefas, organize seu dia.
              </p>
            </h2>
          </div>

          <div className="flex justify-between w-full p-10">
            <Image
              src={todoImg}
              alt="todo image"
              className="w-1/3 m-auto border-2 rounded-2xl border-gray-500"
            />
            <p className="bg-gray-50 rounded-2xl p-5 text-xl w-1/2">
              Organize suas tarefas diárias de forma simples e eficiente. Com o
              TodoApp, você pode criar, editar, concluir e excluir suas tarefas
              a qualquer momento. Tenha controle do seu dia, aumente sua
              produtividade e nunca mais esqueça de nada importante. <br />
              <br />
              Nosso objetivo é facilitar sua rotina com uma interface intuitiva
              e responsiva, permitindo que você se concentre no que realmente
              importa. Com o TodoApp, você pode priorizar tarefas, acompanhar
              seu progresso e transformar sua organização pessoal em um hábito
              natural. <br />
              <br />
              Seja para estudos, trabalho ou tarefas domésticas, o TodoApp está
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
