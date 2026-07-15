"use client"
import Image from "next/image"
import Navigationbar from "../parts/nav"
import Asidebar from "../parts/aside" // <-- Importujemy Twój gotowy komponent (dostosuj ścieżkę jeśli trzeba)
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

    // Stan odpowiedzialny za otwieranie/zamykanie menu bocznego
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const currentUserInitial = user?.username?.[0]?.toUpperCase() || user?.firstName?.[0]?.toUpperCase() || "A";

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
                    <div className="video-player-container">
                        <Image src="/images/white.png" alt="film" fill className="video-image" />
                    </div>
                    <h1 className="video-title">Build a YouTube clone with Next.js & Convex</h1>

                    <div className="author-bar">
                        <div className="author-left">
                            <div className="avatar-text-large">CV</div>
                            <div className="author-info">
                                <h3>Convex</h3>
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
                            <strong>128,402 views • 2 weeks ago</strong>
                            <span className="tag">Next.js</span>
                            <span className="tag">Convex</span>
                        </div>
                        <p className="desc-text">
                            In this build-along we wire up a full clip-sharing app: upload with Convex file storage, a real-time feed, a watch page, and live comments — no backend boilerplate. Chapters, source code and the deploy walkthrough are linked below.
                        </p>
                    </div>

                    <div className="comments-section">
                        <div className="comments-header">
                            <h2>{messages?.length || 328} comments</h2>
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