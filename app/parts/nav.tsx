import Image from "next/image";
import Form from 'next/form'
import { SignOutButton } from "@clerk/nextjs";

export default function Navigationbar() {
    return <nav className="nawigacja">
        <Image
            src={"/images/menuicon.png"}
            alt="menu"
            width={25}
            height={25}
            id="menu"
        />
        <div id="searchbar">
            <Form action="page.tsx" className="formularz">
                <input type="text" placeholder="Szukaj"></input>
            </Form>
            <Image
                src={"/images/searchicon.png"}
                alt="ikona wyszukiwania"
                width={25}
                height={25}
            /></div>
        <div id="prawastrona">
            <Image
                src={"/images/notifications.png"}
                alt="Powiadomienia"
                width={25}
                height={25} />
            <SignOutButton>
                <button>Wyloguj się</button>
            </SignOutButton>
        </div>
    </nav>
}
