"use client"
import { Show, SignInButton, SignOutButton } from "@clerk/nextjs";

import "./style.css";
import Navigationbar from "./parts/nav.tsx"
import Asidebar from "./parts/aside.tsx"
import Mainstrony from "./parts/main.tsx";

export default function Home() {
  return (
    <>
      <Show when="signed-out">
        <section className="sekcja">
          <h1>Witaj! Proszę sie zalogować</h1>
          <SignInButton forceRedirectUrl="/" />
        </section>
      </Show>

      <Show when="signed-in">

        <Navigationbar />
        <div id="container">
          <Asidebar />
          <Mainstrony />
        </div>
      </Show >
    </>
  );
}