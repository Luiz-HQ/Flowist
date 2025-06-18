export default function Footer() {
  return (
    <footer className="bg-[#18181B] text-white p-5 mt-10 w-full h-full">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} TodoApp. Todos os direitos
          reservados.
        </p>
        <p className="text-xs mt-2">
          Desenvolvido por{" "}
          <a
            href="https://www.linkedin.com/in/luizhenriquecomunicador/"
            className="text-blue-400 hover:underline"
          >
            Luiz Henrique{" "}
          </a>
        </p>
      </div>
    </footer>
  );
}
