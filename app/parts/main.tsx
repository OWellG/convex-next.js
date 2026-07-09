import Image from "next/image";
import Link from "next/link";

export default function Mainstrony() {
    return <main>
        <div className="film">
            <Link href="/video">
                <Image
                    src={"/images/white.png"}
                    alt="film"
                    className="miniatura"
                    width={500}
                    height={200}
                />
                <Image
                    src={"/images/white.png"}
                    alt="film"
                    className="autor"
                    width={50}
                    height={50}
                />
                Tytul<br />
                Autor<br />
                wyswietlenia rok
            </Link>
        </div>
        <div className="film">
            <Link href="/video">
                <Image
                    src={"/images/white.png"}
                    alt="film"
                    className="miniatura"
                    width={500}
                    height={200} />
                <Image
                    src={"/images/white.png"}
                    alt="film"
                    className="autor"
                    width={50}
                    height={50} />
                Tytul<br />
                Autor<br />
                wyswietlenia rok
            </Link>
        </div>
        <div className="film">
            <Link href="/video">
                <Image
                    src={"/images/white.png"}
                    alt="film"
                    className="miniatura"
                    width={500}
                    height={200} />
                <Image
                    src={"/images/white.png"}
                    alt="film"
                    className="autor"
                    width={50}
                    height={50} />
                Tytul<br />
                Autor<br />
                wyswietlenia rok
            </Link>
        </div>
    </main >
}