import Image from "next/image";
import Link from "next/link";

export default function Mainstrony() {
    return (
        <main>
            {/* Pasek Kategorii/Tagów */}
            <div className="kategorie">
                <div className="tag active">All</div>
                <div className="tag">Next.js</div>
                <div className="tag">React</div>
                <div className="tag">Convex</div>
                <div className="tag">TypeScript</div>
                <div className="tag">CSS</div>
                <div className="tag">Rust</div>
                <div className="tag">Databases</div>
                <div className="tag">DevOps</div>
            </div>

            {/* Siatka Wideo */}
            <div className="video-grid">
                {/* Element Wideo 1 */}
                <div className="film">
                    <Link href="/video" className="film-link">
                        <div className="miniatura-kontener">
                            <Image
                                src={"/images/white.png"}
                                alt="miniatura"
                                width={600}
                                height={340}
                            />
                            <div className="czas-trwania">24:10</div>
                        </div>
                        <div className="info-wideo">
                            <Image
                                src={"/images/white.png"}
                                alt="autor"
                                className="autor-avatar"
                                width={36}
                                height={36}
                            />
                            <div className="tekst-wideo">
                                <h3 className="tytul-wideo">Build a YouTube clone with Next.js & Convex</h3>
                                <p className="dane-wideo">Convex</p>
                                <p className="dane-wideo">128K views • 2 weeks ago</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Element Wideo 2 */}
                <div className="film">
                    <Link href="/video" className="film-link">
                        <div className="miniatura-kontener">
                            <Image
                                src={"/images/white.png"}
                                alt="miniatura"
                                width={600}
                                height={340}
                            />
                            <div className="czas-trwania">41:07</div>
                        </div>
                        <div className="info-wideo">
                            <Image
                                src={"/images/white.png"}
                                alt="autor"
                                className="autor-avatar"
                                width={36}
                                height={36}
                            />
                            <div className="tekst-wideo">
                                <h3 className="tytul-wideo">Real-time apps with Convex — the complete guide</h3>
                                <p className="dane-wideo">DevMastery</p>
                                <p className="dane-wideo">45K views • 1 month ago</p>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Element Wideo 3 */}
                <div className="film">
                    <Link href="/video" className="film-link">
                        <div className="miniatura-kontener">
                            <Image
                                src={"/images/white.png"}
                                alt="miniatura"
                                width={600}
                                height={340}
                            />
                            <div className="czas-trwania">18:44</div>
                        </div>
                        <div className="info-wideo">
                            <Image
                                src={"/images/white.png"}
                                alt="autor"
                                className="autor-avatar"
                                width={36}
                                height={36}
                            />
                            <div className="tekst-wideo">
                                <h3 className="tytul-wideo">Master the terminal: 20 commands every dev needs</h3>
                                <p className="dane-wideo">ShellSmith</p>
                                <p className="dane-wideo">302K views • 3 days ago</p>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        </main>
    );
}