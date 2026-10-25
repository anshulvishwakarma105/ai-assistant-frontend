
import React, { useState } from 'react';
import Navbar from '../components/uiComponents/Navbar';
import Footer from '../components/uiComponents/Footer';
import { useLocation } from 'react-router-dom';
import { PageTitle } from '../components/Calculations';
import FeedbackImg from "../assets/images/Feedback.png";

export default function Feedback({ setAlert }) {
    const { state } = useLocation();
    const userName = JSON.parse(localStorage.getItem("history"))?.userInfo?.name || "";
    const [fname, setFname] = useState(userName);
    const [email, setEmail] = useState("");
    const [rating, setRating] = useState(5);
    const [satisfied, setSatisfied] = useState(true);
    const [feedback, setFeedback] = useState(state?.message || "");

    const handleFeedbackSubmit = (e) => {
        e.preventDefault();
        if (!fname.trim() || !feedback.trim()) {
            setAlert({ message: `Please fill in your name and ${state?.type || "feedback"}.`, bgColor: "warning", icon: "exclamation-triangle-fill" });
            return;
        }
        console.log("Feedback submitted");
        console.table({ fname: fname.trim(), email: email.trim(), rating, satisfied, feedback: feedback.trim() });
        setAlert({ message: `${state?.type || "Feedback"} submitted successfully!`, bgColor: "success", icon: "check-circle-fill" });
    };

    const resetForm = () => {
        setFname(userName);
        setEmail("");
        setRating(5);
        setSatisfied(true);
        setFeedback(state?.message || "");
    };

    return (
        <>
            <PageTitle title="Feedback | AI Twins" />
            <div className="d-flex flex-column" style={{ height: "100vh", height: "100dvh", minHeight: 0 }}>
                <Navbar />
                <main className="flex-grow-1 overflow-auto custom-scrollbar pb-4">
                    <div className="container-fluid px-3 px-xl-5 pt-3 pt-lg-4 pb-5">
                        <div className="row align-items-start justify-content-center g-4 g-xl-5 mx-auto" style={{ maxWidth: "1250px" }}>
                            <div className="col-12 col-lg-7">
                                <div className="mb-3 mb-lg-4">
                                    <span className="badge rounded-pill px-3 py-2 mb-2" style={{ backgroundColor: "#6f42c1" }}>
                                        <i className="bi bi-chat-heart me-2"></i>YOUR VOICE MATTERS
                                    </span>
                                    <h1 className="display-6 fw-bold mb-2">Share Your Feedback</h1>
                                    <p className="text-secondary mb-0">Help us make AI Twins better. Tell us what works and what we can improve.</p>
                                </div>
                                <form onSubmit={handleFeedbackSubmit} className="card border-0 shadow-sm rounded-4">
                                    <div className="card-body p-3 p-md-4">
                                        <div className="row g-3 mb-4">
                                            <div className="col-12 col-md-6">
                                                <label htmlFor="feedbackName" className="form-label fw-semibold">Full Name <span className="text-danger">*</span></label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-body"><i className="bi bi-person text-secondary"></i></span>
                                                    <input id="feedbackName" type="text" className="form-control" placeholder="Enter your name" value={fname} onChange={(e) => setFname(e.target.value)} required />
                                                </div>
                                            </div>
                                            <div className="col-12 col-md-6">
                                                <label htmlFor="feedbackEmail" className="form-label fw-semibold">Email <span className="text-secondary fw-normal">(Optional)</span></label>
                                                <div className="input-group">
                                                    <span className="input-group-text bg-body"><i className="bi bi-envelope text-secondary"></i></span>
                                                    <input id="feedbackEmail" type="email" className="form-control" placeholder="name@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded-4 p-3 mb-4 text-center" style={{ backgroundColor: "rgba(111,66,193,0.07)" }}>
                                            <h2 className="fs-6 fw-bold mb-2">How would you rate AI Twins?</h2>
                                            <p className="small text-secondary mb-3">Choose a rating from 1 to 5 stars.</p>
                                            <div className="d-flex justify-content-center gap-2 mb-2">
                                                {[1, 2, 3, 4, 5].map((rate) => (
                                                    <button key={rate} type="button" className="btn p-0 border-0" aria-label={`Rate ${rate} out of 5 stars`} aria-pressed={rating === rate} onClick={() => setRating(rate)} style={{ fontSize: "clamp(1.8rem, 5vw, 2.4rem)", color: rate <= rating ? "#f5ad24" : "#adb5bd", lineHeight: 1.2 }}>
                                                        <i className={`bi ${rate <= rating ? "bi-star-fill" : "bi-star"}`}></i>
                                                    </button>
                                                ))}
                                            </div>
                                            <span className="small fw-semibold" style={{ color: "#6f42c1" }}>
                                                {["", "Needs improvement", "Fair experience", "Good experience", "Very good experience", "Excellent experience"][rating]}
                                            </span>
                                        </div>
                                        <div className="mb-4">
                                            <label className="form-label fw-semibold d-block">Are you satisfied with the application?</label>
                                            <div className="row g-2">
                                                <div className="col-6">
                                                    <label className="border rounded-3 p-3 d-flex justify-content-center align-items-center gap-2 h-100" style={{ cursor: "pointer", borderColor: satisfied ? "#6f42c1" : "var(--bs-border-color)", backgroundColor: satisfied ? "rgba(111,66,193,0.07)" : "transparent" }}>
                                                        <input className="form-check-input m-0" type="radio" name="satisfied" checked={satisfied} onChange={() => setSatisfied(true)} />
                                                        <i className="bi bi-emoji-smile fs-5" style={{ color: "#6f42c1" }}></i><span className="fw-semibold">Yes</span>
                                                    </label>
                                                </div>
                                                <div className="col-6">
                                                    <label className="border rounded-3 p-3 d-flex justify-content-center align-items-center gap-2 h-100" style={{ cursor: "pointer", borderColor: !satisfied ? "#6f42c1" : "var(--bs-border-color)", backgroundColor: !satisfied ? "rgba(111,66,193,0.07)" : "transparent" }}>
                                                        <input className="form-check-input m-0" type="radio" name="satisfied" checked={!satisfied} onChange={() => setSatisfied(false)} />
                                                        <i className="bi bi-emoji-frown fs-5 text-danger"></i><span className="fw-semibold">No</span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="feedbackDesc" className="form-label fw-semibold">Your {state?.type || "Feedback"} <span className="text-danger">*</span></label>
                                            <textarea id="feedbackDesc" className="form-control custom-scrollbar" rows="4" placeholder="What did you like? What could we improve?" value={feedback} onChange={(e) => setFeedback(e.target.value)} required style={{ resize: "vertical" }}></textarea>
                                            <div className="form-text">Please avoid sharing passwords or other sensitive information.</div>
                                        </div>
                                        <div className="d-flex flex-column flex-sm-row gap-2">
                                            <button type="submit" className="btn text-white py-2 flex-grow-1" style={{ backgroundColor: "#6f42c1" }}>
                                                <i className="bi bi-send me-2"></i>Submit {state?.type || "Feedback"}
                                            </button>
                                            <button type="button" className="btn btn-outline-secondary py-2 px-4" onClick={resetForm}>
                                                <i className="bi bi-arrow-counterclockwise me-2"></i>Reset
                                            </button>
                                        </div>
                                    </div>
                                </form>
                                <p className="text-secondary small text-center mt-3 mb-0">
                                    Questions? <a href="mailto:anshulvishwkarma58@gmail.com" className="text-decoration-none fw-semibold" style={{ color: "#6f42c1" }}>Contact us</a>
                                </p>
                            </div>
                            <div className="col-12 col-lg-5">
                                <div className="rounded-4 p-3 p-md-4 text-center" style={{ background: "linear-gradient(145deg, rgba(111,66,193,0.12), rgba(111,66,193,0.025))" }}>
                                    <div className="d-none d-lg-block pt-2">
                                        <span className="badge rounded-pill px-3 py-2" style={{ backgroundColor: "rgba(111,66,193,0.12)", color: "#6f42c1" }}>
                                            <i className="bi bi-stars me-2"></i>LET'S IMPROVE TOGETHER
                                        </span>
                                    </div>
                                    <img src={FeedbackImg} alt="AI twins welcoming your feedback" className="img-fluid d-block mx-auto" style={{ width: "100%", maxWidth: "390px", maxHeight: "340px", objectFit: "contain" }} />
                                    <h2 className="fs-3 fw-bold mb-2">Every opinion counts.</h2>
                                    <p className="text-secondary mb-3 mx-auto" style={{ maxWidth: "340px" }}>Your ideas help us improve your AI Twins experience.</p>
                                    <div className="d-flex justify-content-center flex-wrap gap-3 small text-secondary">
                                        <span><i className="bi bi-star-fill me-1" style={{ color: "#f5ad24" }}></i>Rate your experience</span>
                                        <span><i className="bi bi-chat-dots me-1" style={{ color: "#6f42c1" }}></i>Share your ideas</span>
                                    </div>
                                </div>
                                <div className="d-none d-lg-flex align-items-start gap-3 p-3 mt-3">
                                    <i className="bi bi-shield-check fs-4" style={{ color: "#6f42c1" }}></i>
                                    <div>
                                        <h3 className="fs-6 fw-bold mb-1">Your feedback matters</h3>
                                        <p className="small text-secondary mb-0">Constructive feedback helps identify what to improve next.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
