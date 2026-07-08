import Image from "next/image";

export default function Mainstrony() {
    return <main>
        <div className="film">
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
        </div>
        <div className="film">
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
        </div>
        <div className="film">
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

        </div>
    </main>
}