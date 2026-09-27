import React from 'react'
import { Link } from 'react-router-dom'
import { Footer, Navbar } from '../components/UiComponent'

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="position-relative h-100 w-100 overflow-hidden">
                <img
                    src="/Background.webp"
                    alt="Aesthetic background image"
                    className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover opacity-75"
                />
                <div className="position-relative h-100 d-flex flex-column align-items-center justify-content-center text-center px-3"
                    style={{
                        paddingBottom: "60px"
                    }}>
                    <img
                        src="/Chat.png"
                        alt="Chat Twins image"
                        className="flex-shrink-0 opacity-75"
                        style={{
                            width: "clamp(64px, 12vw, 120px)",
                            height: "clamp(64px, 12vw, 120px)"
                        }}
                    />
                    <h1 className="display-4 fw-bold mb-3" style={{ color: "#6f42c1" }}>
                        <i className="bi bi-stars"></i> AI Chat App
                    </h1>
                    <p className="text-dark fs-5 mb-4">
                        Fast and secure AI chat that keeps your information and data stored locally.
                    </p>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                        <Link to="/chat" className="btn btn-primary btn-lg px-4">
                            Get Started
                        </Link>
                        <Link to="/feedback" className="btn btn-outline-dark btn-lg px-4">
                            Feedback
                        </Link>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
