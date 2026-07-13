"use client"
import Image from "next/image"
import Navigationbar from "../parts/nav"
import "./styles.css"
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
export default function Page() {
    const sendMessage = useMutation(api.comments.sendMessage);
    const messages = useQuery(api.comments.getMessages);
    const [newMessageText, setNewMessageText] = useState("");
    const { user } = useUser();
    return (
        <>
            <Navigationbar />
            <main>
                <section className="videopanel">
                    <Image src="/images/white.png" alt="film" width={1000} height={1000} className="video"></Image>
                    <h1>Tytul</h1>
                    <div id="container">
                        <Image src={"/images/white.png"} alt="film" className="autor" width={50} height={50} />
                        <h2>Autor</h2>
                        <button className="odnosnik">Subskrybuj</button>
                        <div id="polubienia"><button className="like"><Image src="/images/like.png" alt="like" width={25} height={25} className="dzwonek" /> liczba</button><div className="separator"></div><button className="dislike"><Image src="/images/dislike.png" alt="dislike" width={25} height={25} className="dzwonek" /></button></div>
                        <button className="przycisk"><Image src="/images/share.png" alt="udostepnij" className="dzwonek" width={25} height={25} /> Udostępnij</button><button className="przycisk"><Image src="/images/save.png" alt="zapisz" className="dzwonek" width={25} height={25} /> Zapisz</button><button className="przycisk"><Image src="/images/download.png" alt="pobierz" className="dzwonek" width={25} height={25} /> Pobierz</button>
                    </div>
                    <div id="description">
                        <p>OPIS</p>
                    </div>
                    <br />
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();

                            await sendMessage({
                                user: user?.username || user?.firstName || "Anonim",
                                body: newMessageText,
                            });

                            setNewMessageText("");
                        }}
                    >
                        <input
                            type="text"
                            placeholder="Dodaj komentarz"
                            value={newMessageText}
                            onChange={(e) => setNewMessageText(e.target.value)}
                        />
                        <hr />
                        <button type="submit" id="przycisk2">
                            Skomentuj
                        </button>
                    </form>

                    <div id="komentarze">
                        {messages?.map((message) => (
                            <div key={message._id}>
                                <strong>{message.user}:</strong> {message.body}
                            </div>
                        ))}
                    </div>

                </section >
                <section>

                </section>
            </main >
        </>
    )
}