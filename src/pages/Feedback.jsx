import React, { useState } from 'react'
import { Footer, Navbar } from '../components/UiComponent'

export default function Feedback() {

    const [fname, setFname] = useState("Adams Mayers");
    const [email, setEmail] = useState("sample@example.com");
    const [rating, setRating] = useState(5);
    const [satisfied, setSatisfied] = useState(true);
    const [feedback, setFeedback] = useState("");

    const handleRateSubmit = (rate) => {
        if (rate === rating && rate !== 1) {
            setRating(rate - 1);
            return;
        };
        setRating(rate);
    }
    const handleFeedbackSubmit = (e) => {
        // Later i Will Connect it to Send & Store Feedback
        e.preventDefault();
        console.log("feeback form submited");
        console.table({
            fname: fname,
            email: email,
            rating: rating,
            satisfied: satisfied,
            feedback: feedback
        })
    }
    return (
        <>
            <Navbar />
            <div className="d-flex align-items-center justify-content-center gap-4">
                <form
                    className="overflow-auto hide-scrollbar"
                    onSubmit={handleFeedbackSubmit}
                    style={{
                        height: "calc(100dvh - 85px)",
                        width: "650px"
                    }}
                >
                    <div
                        className="w-100 shadow-sm p-4 d-flex flex-column gap-3 mx-auto"
                        style={{ maxWidth: "650px",
                            marginBottom:"60px"
                         }}
                    >
                        <div className="text-center">
                            <h2 className="fw-bold mb-2" style={{ color: "#6f42c1" }}>Share Your Feedback</h2>
                            <p className="text-secondary mb-0 fst-italic">
                                Help us improve your AI Chat App experience.
                            </p>
                        </div>
                        <div className="row g-3 mb-3">
                            <div className="col-12 col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={fname}
                                        onChange={(e) => setFname(e.target.value)}
                                        id="feedbackName"
                                        placeholder="Adam Mayers"
                                    />
                                    <label htmlFor="feedbackName">Full Name</label>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="form-floating">
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        id="feedbackEmail"
                                        placeholder="name@example.com"
                                    />
                                    <label htmlFor="feedbackEmail">Email Address</label>
                                </div>
                            </div>
                        </div>
                        <div className="text-center  border rounded">
                            <p className="fw-semibold mb-2">How would you rate our application?</p>
                            <div className="d-flex justify-content-center gap-2">
                                {[1, 2, 3, 4, 5].map((rate) => (
                                    <button
                                        type="button"
                                        key={rate}
                                        onClick={() => handleRateSubmit(rate)}
                                        className="btn p-0 border-0"
                                        style={{ fontSize: "1.8rem" }}
                                    >
                                        <i
                                            className={
                                                rate <= rating
                                                    ? "bi bi-star-fill text-warning"
                                                    : "bi bi-star text-secondary"
                                            }
                                        ></i>
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="text-center  border rounded">
                            <p className="fw-semibold mb-2">
                                Are you satisfied with our application?
                            </p>
                            <div className="d-flex justify-content-center gap-4">
                                <label
                                    className="d-flex align-items-center gap-2"
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        className="form-check-input m-0"
                                        type="radio"
                                        name="satisfied"
                                        checked={satisfied === true}
                                        onChange={() => setSatisfied(true)}
                                    />
                                    <i className="bi bi-emoji-smile-fill text-warning fs-4"></i>
                                    <span>Yes</span>
                                </label>
                                <label
                                    className="d-flex align-items-center gap-2"
                                    style={{ cursor: "pointer" }}
                                >
                                    <input
                                        className="form-check-input m-0"
                                        type="radio"
                                        name="satisfied"
                                        checked={satisfied === false}
                                        onChange={() => setSatisfied(false)}
                                    />
                                    <i className="bi bi-emoji-frown-fill text-danger fs-4"></i>
                                    <span>No</span>
                                </label>
                            </div>
                        </div>
                        <div >
                            <label htmlFor="feedbackDesc" className="form-label fw-semibold">
                                Your Feedback
                            </label>
                            <textarea
                                value={feedback}
                                onChange={(e) => setFeedback(e.target.value)}
                                className="form-control"
                                placeholder="Share your thoughts and tell us how we can improve your experience."
                                id="feedbackDesc"
                                rows="4"
                            ></textarea>
                        </div>
                        <div className="d-flex gap-2">
                            <button
                                type="submit"
                                className="btn btn-success w-100 py-2"
                            >
                                Submit <span className='d-none d-md-inline'>Feedback</span>
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger w-100 py-2"
                                onClick={() => {
                                    setFname("")
                                    setEmail("")
                                    setRating(0)
                                    setSatisfied(true)
                                    setFeedback("")
                                }}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </form>
                <div className="d-none d-lg-block">
                    <img
                        src="/Feedback.png"
                        alt="Shakespeare Quote"
                        className="img-fluid"
                        style={{ maxWidth: "350px" }}
                    />
                </div>
            </div>
            <Footer />
        </>
    )
}
