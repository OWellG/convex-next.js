"use client";

import Image from "next/image";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

export default function Mainstrony() {
    // Pobieramy listę filmów na żywo z Convex
    const videos = useQuery(api.comments.getVideos);

    return (
        <main>
            {/* Pasek Kategorii/Tagów (Nienaruszony) */}
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
                {/* Stan ładowania danych */}
                {videos === undefined && (
                    <p style={{ color: "#888", gridColumn: "1 / -1", padding: "20px" }}>Loading clips...</p>
                )}

                {/* Stan braku filmów w bazie */}
                {videos && videos.length === 0 && (
                    <p style={{ color: "#888", gridColumn: "1 / -1", padding: "20px" }}>No clips uploaded yet. Be the first!</p>
                )}

                {/* Dynamiczna lista filmów */}
                {videos?.map((video) => (
                    <div className="film" key={video._id}>
                        {/* Dynamiczny link prowadzący do konkretnego ID filmu */}
                        <Link href={`/video/${video._id}`} className="film-link">
                            <div className="miniatura-kontener">
                                <Image
                                    src={"/images/white.png"}
                                    alt="miniatura"
                                    width={600}
                                    height={340}
                                />
                                <div className="czas-trwania">0:30</div>
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
                                    {/* Wyświetlamy prawdziwy tytuł i autora z bazy */}
                                    <h3 className="tytul-wideo">{video.title}</h3>
                                    <p className="dane-wideo">{video.author}</p>
                                    <p className="dane-wideo">0 views • just now</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}