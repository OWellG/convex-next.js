"use client"
import Image from "next/image"; // <-- To jest kluczowy import, który naprawia błąd!
import Form from 'next/form';
import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

// Definiujemy typ dla propsów nawigacji
interface NavigationbarProps {
    onMenuClick: () => void; // Funkcja przekazywana z app/page.tsx
}

export default function Navigationbar({ onMenuClick }: NavigationbarProps) {
    return (
        <nav className="nawigacja">
            <div className="nav-left">
                {/* Twoja oryginalna ikona menu obsługująca kliknięcie */}
                <Image
                    src="/images/menuicon.png"
                    alt="menu"
                    width={24}
                    height={24}
                    id="menu"
                    onClick={onMenuClick} // Wywołanie funkcji wysuwającej sidebar
                    style={{ cursor: "pointer" }}
                />
                <div className="logo">
                    <Image src="/images/yourchannelicon.png" alt="logo" width={28} height={28} />
                    <span>Clip</span>
                </div>
            </div>

            <div id="searchbar">
                <Form action="/search" className="formularz">
                    <Image
                        src="/images/searchicon.png"
                        alt="szukaj"
                        width={18}
                        height={18}
                    />
                    <input type="text" placeholder="Search clips" />
                </Form>
            </div>

            <div id="prawastrona">
                <Link className="upload-btn" href="/upload">
                    + Upload
                </Link>
                <Image
                    src="/images/notifications.png"
                    alt="Powiadomienia"
                    width={22}
                    height={22}
                />
                <UserButton />
            </div>
        </nav>
    );
}