import Image from "next/image";
import Link from 'next/link';
import posthog from "posthog-js";

// Definiujemy typ dla propsów w TypeScript
interface AsidebarProps {
    isOpen: boolean;
}

export default function Asidebar({ isOpen }: AsidebarProps) {
    const showHistoryButton = posthog.isFeatureEnabled("history-button");
    return (
        /* Jeśli isOpen jest true, dodajemy klasę "active" */
        <aside className={`boczny ${isOpen ? "active" : ""}`}>
            <Link href="/" className="Link active">
                <Image src={"/images/home.png"} alt="home" width={20} height={20} />
                <button>Home</button>
            </Link>
            <Link href="/" className="Link">
                <Image src={"/images/shorts.png"} alt="clips" width={20} height={20} />
                <button>Clips</button>
            </Link>
            <Link href="/" className="Link">
                <Image src={"/images/playlist.png"} alt="subscriptions" width={20} height={20} />
                <button>Subscriptions</button>
            </Link>

            <hr />

            <div className="sekcja-tytul">YOU</div>

            {showHistoryButton && (<Link href="/" className="Link">
                <Image src={"/images/history.png"} alt="history" width={20} height={20} />
                <button>History</button>
            </Link>)}

            <Link href="/" className="Link">
                <Image src={"/images/video.png"} alt="your videos" width={20} height={20} />
                <button>Your videos</button>
            </Link>
            <Link href="/" className="Link">
                <Image src={"/images/like.png"} alt="liked clips" width={20} height={20} />
                <button>Liked clips</button>
            </Link>
            <Link href="/" className="Link">
                <Image src={"/images/watchlater.png"} alt="watch later" width={20} height={20} />
                <button>Watch later</button>
            </Link>
            <Link href="/" className="Link">
                <Image src={"/images/download.png"} alt="downloads" width={20} height={20} />
                <button>Downloads</button>
            </Link>
        </aside>
    );
}