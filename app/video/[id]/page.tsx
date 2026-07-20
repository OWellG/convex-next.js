"use client"
import Image from "next/image"
import Navigationbar from "../../parts/nav"
import Asidebar from "../../parts/aside"
import "../styles.css"
import { useQuery, useMutation } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import { useState } from "react";
import { useParams } from "next/navigation";

export default function Page() {
    const params = useParams();
    const id = params.id as string; // To jest ID filmu (np. j772bx91...)

    // 2. Pobieramy dane TEGO KONKRETNEGO filmu z Convex
    const video = useQuery(api.comments.getVideoById, { id: id });

    const sendMessage = useMutation(api.comments.sendMessage);
    const messages = useQuery(api.comments.getMessages);
    const [newMessageText, setNewMessageText] = useState("");
    const { user } = useUser();

    // Stan odpowiedzialny za otwieranie/zamykanie menu bocznego
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const currentUserInitial = user?.username?.[0]?.toUpperCase() || user?.firstName?.[0]?.toUpperCase() || "A";

    // 3. Obsługa stanu ładowania danych z bazy
    if (video === undefined) {
        return (
            <div className="page-wrapper" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: '#fff', height: '100vh' }}>
                <h2>Loading clip...</h2>
            </div>
        );
    }

    // Dynamiczny inicjał autora filmu (np. "Convex" -> "CO")
    const authorInitial = video.author ? video.author.substring(0, 2).toUpperCase() : "CH";

    return (
        <div className="page-wrapper">
            {/* Przekazujemy funkcję przełączającą stan do nawigacji */}
            <Navigationbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Twój komponent boczny sterowany stanem */}
            <Asidebar isOpen={isSidebarOpen} />

            {/* Ciemny podkład pod menu – kliknięcie w niego zamyka sidebar */}
            {isSidebarOpen && (
                <div className="sidebar-backdrop" onClick={() => setIsSidebarOpen(false)} />
            )}

            <main className="video-layout">
                <div className="main-column">
                    {/* 5. ZAMIENIAMY STATYCZNY OBRAZEK NA PRAWDZIWY ODTWARZACZ WIDEO */}
                    <div className="video-player-container" style={{ position: 'relative', overflow: 'hidden', background: '#000' }}>
                        <video
                            src={video.videoUrl} // Prawdziwy link do pliku wideo z Convex Storage
                            controls
                            autoPlay
                            style={{ width: "100%", height: "100%", objectFit: "contain" }}
                        />
                    </div>

                    {/* DYNAMICZNY TYTUŁ */}
                    <h1 className="video-title">{video.title}</h1>

                    <div className="author-bar">
                        <div className="author-left">
                            {/* DYNAMICZNY INICJAŁ AUTORA */}
                            <div className="avatar-text-large">{authorInitial}</div>
                            <div className="author-info">
                                {/* DYNAMICZNA NAZWA AUTORA */}
                                <h3>{video.author}</h3>
                                <p>184K subscribers</p>
                            </div>
                            <button className="subscribe-btn">Subscribe</button>
                        </div>

                        <div className="actions-group">
                            <div className="like-dislike-group">
                                <button className="like-btn">
                                    <Image src="/images/like.png" alt="like" width={18} height={18} /> 4.2K
                                </button>
                                <div className="separator"></div>
                                <button className="dislike-btn">
                                    <Image src="/images/dislike.png" alt="dislike" width={18} height={18} /> 62
                                </button>
                            </div>
                            <button className="action-btn">
                                <Image src="/images/share.png" alt="udostepnij" width={18} height={18} /> Share
                            </button>
                            <button className="action-btn">
                                <Image src="/images/save.png" alt="zapisz" width={18} height={18} /> Save
                            </button>
                            <button className="action-btn">
                                <Image src="/images/download.png" alt="pobierz" width={18} height={18} /> Download
                            </button>
                        </div>
                    </div>

                    <div className="description-box">
                        <div className="desc-stats">
                            {/* Tutaj możesz w przyszłości dodać dynamiczną datę */}
                            <strong>128,402 views • Just now</strong>
                            <span className="tag">Next.js</span>
                            <span className="tag">Convex</span>
                        </div>
                        {/* DYNAMICZNY OPIS FILMU */}
                        <p className="desc-text" style={{ whiteSpace: "pre-wrap" }}>
                            {video.description || "No description provided."}
                        </p>
                    </div>

                    <div className="comments-section">
                        <div className="comments-header">
                            <h2>{messages?.length || 0} comments</h2>
                            <button className="sort-btn">≡ Sort by</button>
                        </div>

                        <form
                            className="comment-form"
                            onSubmit={async (e) => {
                                e.preventDefault();
                                if (newMessageText.trim() === "") {
                                    alert("Komentarz nie może być pusty");
                                    return;
                                }
                                await sendMessage({
                                    user: user?.username || user?.firstName || "Anonim",
                                    body: newMessageText,
                                    // Wskazówka: w przyszłości warto przesyłać tu videoId: id, aby komentarze były przypisane do konkretnego filmu!
                                });
                                setNewMessageText("");
                            }}
                        >
                            <div className="comment-input-area">
                                <div className="avatar-text">{currentUserInitial}</div>
                                <div className="input-wrapper">
                                    <input
                                        type="text"
                                        placeholder="Add a comment..."
                                        className="comment-input"
                                        value={newMessageText}
                                        onChange={(e) => setNewMessageText(e.target.value)}
                                    />
                                    {newMessageText.trim() !== "" && (
                                        <button type="submit" className="submit-comment-btn">
                                            Skomentuj
                                        </button>
                                    )}
                                </div>
                            </div>
                        </form>

                        <div className="comments-list">
                            {messages?.map((message) => {
                                const initials = message.user ? message.user.substring(0, 2).toUpperCase() : "AN";

                                return (
                                    <div className="comment-item" key={message._id}>
                                        <div className="avatar-text">{initials}</div>
                                        <div className="comment-content">
                                            <div className="comment-meta">
                                                <span className="comment-author">{message.user}</span>
                                            </div>
                                            <p className="comment-text">{message.body}</p>
                                            <div className="comment-actions">
                                                <button>👍</button>
                                                <button>👎</button>
                                                <button>Reply</button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <aside className="sidebar-column">
                    <h3 className="up-next-title">Up next</h3>

                    <div className="up-next-list">
                        <div className="up-next-item">
                            <div className="thumbnail">
                                <span className="time-badge">41:07</span>
                            </div>
                            <div className="up-next-info">
                                <h4>Real-time apps with Convex<br />— the complete guide</h4>
                                <p>DevMastery</p>
                                <p>45K views • 1 month ago</p>
                            </div>
                        </div>
                        <div className="up-next-item">
                            <div className="thumbnail">
                                <span className="time-badge">18:44</span>
                            </div>
                            <div className="up-next-info">
                                <h4>Master the terminal: 20<br />commands every dev needs</h4>
                                <p>ShellSmith</p>
                                <p>302K views • 3 days ago</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </main>
        </div>
    )
}