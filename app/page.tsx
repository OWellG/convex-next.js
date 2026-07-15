"use client"
import { useState } from "react"; // 1. Importujemy useState do kontrolowania stanu paska
import { Show, SignInButton } from "@clerk/nextjs";

import "./style.css";
import Navigationbar from "./parts/nav.tsx"
import Asidebar from "./parts/aside.tsx"
import Mainstrony from "./parts/main.tsx";

export default function Home() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <>
      <Show when="signed-out">
        <section className="sekcja">
          <h1>Witaj! Proszę sie zalogować</h1>
          <SignInButton forceRedirectUrl="/" />
        </section>
      </Show>

      <Show when="signed-in">
        {/* 3. Przekazujemy naszą funkcję pod zdefiniowany przez Ciebie prop `onMenuClick` */}
        <Navigationbar onMenuClick={toggleSidebar} />

        <div id="container">
          {/* 4. Przekazujemy aktualny stan (true/false) do bocznego paska */}
          <Asidebar isOpen={isSidebarOpen} />
          <Mainstrony />
        </div>
      </Show >
    </>
  );
}