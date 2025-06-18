export default function Home() {
  return (
    <>
      <header className="bg-gray-800 text-white p-5 flex justify-between items-center">
        <h2>logo</h2>

        <nav>
          <ul className="flex gap-x-8">
            <li>
              <a href="/login" className="hover:underline">
                Login
              </a>
            </li>
            <li>
              <a href="/register" className="hover:underline">
                Register
              </a>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
