"use client"
import { useState, useRef, FormEvent } from "react"
import "./styles.css"
import { useMutation } from "convex/react"
import { useUser } from "@clerk/nextjs"
import { api } from "@/convex/_generated/api"
import posthog from "posthog-js"

export default function UploadPage() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibility, setVisibility] = useState("public");
    const [selectedVideo, setSelectedVideo] = useState<File | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const { user } = useUser();
    const authorName = user?.username || user?.firstName || "Anonymous";
    const generateUploadUrl = useMutation(api.comments.generateUploadUrl);
    const sendVideo = useMutation(api.comments.sendVideo);

    const handleDropzoneClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedVideo(event.target.files[0]);
        }
    };

    async function handleUploadVideo(event: FormEvent) {
        event.preventDefault();
        if (!selectedVideo) return alert("Please select a video file first!");

        setIsUploading(true);
        posthog.capture("upload_started", {
            file_type: selectedVideo.type,
            file_size_bytes: selectedVideo.size,
            visibility,
            has_title: title.trim().length > 0,
            has_description: description.trim().length > 0,
        });

        try {
            // 1. Pobranie bezpiecznego adresu URL do uploadu pliku z Convex
            const postUrl = await generateUploadUrl();

            // 2. Wysłanie pliku binarnego bezpośrednio do storage
            const result = await fetch(postUrl, {
                method: "POST",
                headers: { "Content-Type": selectedVideo.type },
                body: selectedVideo,
            });

            if (!result.ok) throw new Error("Upload to storage failed");

            // 3. Odebranie storageId pliku
            const { storageId } = await result.json();

            // 4. Zapisanie metadanych w bazie danych (dorzucone title i description)
            await sendVideo({
                storageId,
                author: authorName,
                title: title || "Untitled Clip",
                description: description || "No description provided."
            });

            posthog.capture("video_published", {
                file_type: selectedVideo.type,
                file_size_bytes: selectedVideo.size,
                visibility,
                has_title: title.trim().length > 0,
                has_description: description.trim().length > 0,
            });
            alert("Clip published successfully!");

            // Czyszczenie formularza po sukcesie
            setTitle("");
            setDescription("");
            setSelectedVideo(null);
            window.history.back(); // Powrót na poprzednią stronę
        } catch (error) {
            posthog.capture("video_upload_failed", {
                file_type: selectedVideo.type,
                file_size_bytes: selectedVideo.size,
                visibility,
            });
            posthog.captureException(error);
            console.error("Upload error:", error);
            alert("Something went wrong during the upload. Please try again.");
        } finally {
            setIsUploading(false);
        }
    }

    return (
        <div className="upload-page-wrapper">
            <header className="upload-header">
                <div className="logo">
                    <div className="logo-icon">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="24" height="24" rx="6" fill="#6366f1" />
                            <path d="M10 8L15 12L10 16V8Z" fill="white" />
                        </svg>
                    </div>
                    <span>Clip</span>
                </div>
                <button className="close-btn" onClick={() => window.history.back()}>
                    <span className="close-x">✕</span> Close
                </button>
            </header>

            <main className="upload-container">
                <div className="upload-title-section">
                    <h1>Upload a clip</h1>
                    <p>Drop your video and add the details — it'll appear in the feed once published.</p>
                </div>

                <form className="upload-grid" onSubmit={handleUploadVideo}>

                    <div className="upload-form">

                        <div className="dropzone" onClick={handleDropzoneClick} style={{ cursor: "pointer" }}>
                            <input
                                type="file"
                                ref={fileInputRef}
                                onChange={handleFileChange}
                                accept="video/*"
                                style={{ display: "none" }}
                            />
                            <div className="upload-icon-container">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="12" y1="15" x2="12" y2="3"></line>
                                    <polyline points="17 8 12 3 7 8"></polyline>
                                    <line x1="4" y1="17" x2="20" y2="17"></line>
                                    <line x1="4" y1="21" x2="20" y2="21"></line>
                                </svg>
                            </div>

                            <h2>
                                {selectedVideo
                                    ? `Selected: ${selectedVideo.name}`
                                    : "Drag & drop a clip to upload"
                                }
                            </h2>
                            <p>
                                {selectedVideo
                                    ? `${(selectedVideo.size / (1024 * 1024)).toFixed(2)} MB`
                                    : "MP4, MOV or WebM • up to 2 GB"
                                }
                            </p>
                            <button type="button" className="select-file-btn">
                                {selectedVideo ? "Change file" : "Select file"}
                            </button>
                        </div>

                        {/* Pole: Title */}
                        <div className="input-group">
                            <label>Title</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="The title of your video"
                            />
                        </div>

                        {/* Pole: Description */}
                        <div className="input-group">
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Describe your video"
                                rows={6}
                            />
                        </div>

                        {/* Pole: Thumbnail */}
                        <div className="input-group">
                            <label>Thumbnail</label>
                            <div className="thumbnails-grid">
                                <div className="thumbnail-box active"></div>
                                <div className="thumbnail-box empty"></div>
                                <div className="thumbnail-box add-new">
                                    <span className="plus-icon">+</span>
                                </div>
                            </div>
                        </div>

                        {/* Pole: Visibility */}
                        <div className="input-group">
                            <label>Visibility</label>
                            <div className="visibility-options">
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="public"
                                        checked={visibility === "public"}
                                        onChange={() => setVisibility("public")}
                                    />
                                    <span className="custom-radio"></span>
                                    Public
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="unlisted"
                                        checked={visibility === "unlisted"}
                                        onChange={() => setVisibility("unlisted")}
                                    />
                                    <span className="custom-radio"></span>
                                    Unlisted
                                </label>
                                <label className="radio-label">
                                    <input
                                        type="radio"
                                        name="visibility"
                                        value="private"
                                        checked={visibility === "private"}
                                        onChange={() => setVisibility("private")}
                                    />
                                    <span className="custom-radio"></span>
                                    Private
                                </label>
                            </div>
                        </div>

                        {/* Pole: Tags */}
                        <div className="input-group">
                            <label>Tags</label>
                            <div className="tags-container">
                                <span className="tag active-tag">Next.js</span>
                                <span className="tag">Convex</span>
                                <span className="tag">TypeScript</span>
                                <button type="button" className="add-tag-btn">+ add tag</button>
                            </div>
                        </div>

                        {/* Kontener na przyciski akcji */}
                        <div className="form-actions">
                            <button
                                type="button"
                                className="save-draft-btn"
                            >
                                Save draft
                            </button>
                            <button
                                type="submit"
                                className="publish-btn"
                                disabled={isUploading || !selectedVideo}
                            >
                                {isUploading ? "Uploading..." : "Publish"}
                            </button>
                        </div>

                    </div>

                    {/* PRAWA KOLUMNA: Dynamiczny podgląd */}
                    <div className="upload-preview-column">
                        <span className="preview-label">FEED PREVIEW</span>
                        <div className="preview-card">
                            <div className="preview-video-box">
                                <div className="preview-video-content">
                                    <span className="tutorial-badge">TUTORIAL</span>
                                    <h3>{title || "Build a YouTube clone with Next.js & Convex"}</h3>
                                </div>
                                <span className="duration-tag">24:10</span>
                            </div>
                            <div className="preview-details">
                                <div className="avatar-preview">
                                    {authorName.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="preview-text">
                                    <h4>{title || "Build a YouTube clone with Next.js & Convex"}</h4>
                                    <p className="preview-channel">{authorName}</p>
                                    <p className="preview-meta">No views • just now</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>
            </main>
        </div>
    );
}