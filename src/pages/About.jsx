
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/uiComponents/Navbar';
import Footer from '../components/uiComponents/Footer';
import { PageTitle } from '../components/Calculations';
import AboutImg from "../assets/images/About.png";

export default function About() {
    const features = [
        { icon: "bi-chat-square-text", title: "AI Conversations", description: "Interact with AI through a simple and intuitive chat experience." },
        { icon: "bi-lightning-charge", title: "Simple & Fast", description: "A clean interface designed to help you get started without unnecessary complexity." },
        { icon: "bi-shield-check", title: "Privacy Awareness", description: "We aim to minimize data collection and provide more control over locally stored information." }
    ];

    return (
        <>
            <PageTitle title="About | AI Twins" />
            <div className="d-flex flex-column" style={{ height: "100vh", height: "100dvh", minHeight: 0 }}>
                <Navbar />
                <main className="flex-grow-1 overflow-auto custom-scrollbar">
                    <div className="container px-3 py-4 py-md-5">
                        <section className="rounded-4 p-3 p-md-5 mb-4 mb-md-5 overflow-hidden" style={{ background: "linear-gradient(135deg, rgba(111,66,193,0.12), rgba(111,66,193,0.03))" }}>
                            <div className="row align-items-center g-4 g-lg-5">
                                <div className="col-12 col-md-6 order-2 order-md-1">
                                    <span className="badge rounded-pill px-3 py-2 mb-3" style={{ backgroundColor: "#6f42c1" }}>
                                        ABOUT AI TWINS
                                    </span>
                                    <h1 className="display-5 fw-bold mb-3">
                                        Your space for <span style={{ color: "#6f42c1" }}>AI conversations.</span>
                                    </h1>
                                    <p className="text-secondary fs-5 lh-base mb-4">
                                        AI Twins brings a straightforward chat experience to your everyday ideas, questions, and creativity.
                                    </p>
                                    <div className="d-flex flex-wrap gap-3">
                                        <Link to="/chat" className="btn btn-lg text-white px-4" style={{ backgroundColor: "#6f42c1" }}>
                                            <i className="bi bi-chat-dots me-2"></i>Get Started
                                        </Link>
                                        <Link to="/feedback" className="btn btn-lg btn-outline-secondary px-4">
                                            <i className="bi bi-star me-2"></i>Rate Us
                                        </Link>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 order-1 order-md-2 text-center">
                                    <img
                                        src={AboutImg}
                                        alt="People connecting and collaborating"
                                        className="img-fluid"
                                        style={{ maxHeight: "360px", width: "100%", objectFit: "contain" }}
                                    />
                                </div>
                            </div>
                        </section>
                        <section className="mb-4 mb-md-5">
                            <div className="text-center mb-4">
                                <h2 className="fw-bold mb-2">What is AI Twins?</h2>
                                <p className="text-secondary mx-auto mb-0" style={{ maxWidth: "650px" }}>
                                    A simple platform designed to make interacting with AI accessible, convenient, and easy to use.
                                </p>
                            </div>
                            <div className="row g-3">
                                {features.map((feature) => (
                                    <div className="col-12 col-md-4" key={feature.title}>
                                        <div className="card h-100 border-0 shadow-sm rounded-4">
                                            <div className="card-body p-4">
                                                <div className="d-flex align-items-center justify-content-center rounded-3 mb-3" style={{ width: "52px", height: "52px", backgroundColor: "rgba(111,66,193,0.12)" }}>
                                                    <i className={`bi ${feature.icon} fs-3`} style={{ color: "#6f42c1" }}></i>
                                                </div>
                                                <h3 className="fs-5 fw-bold">{feature.title}</h3>
                                                <p className="text-secondary mb-0 lh-lg">{feature.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>
                        <section className="rounded-4 border p-4 p-md-5 mb-4" style={{ borderColor: "rgba(111,66,193,0.2)" }}>
                            <div className="row align-items-center g-3">
                                <div className="col-12 col-md">
                                    <div className="d-flex align-items-center gap-3 mb-3">
                                        <div className="rounded-circle d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: "58px", height: "58px", backgroundColor: "rgba(111,66,193,0.12)" }}>
                                            <i className="bi bi-code-slash fs-3" style={{ color: "#6f42c1" }}></i>
                                        </div>
                                        <div>
                                            <h2 className="fs-4 fw-bold mb-1">Meet the Developer</h2>
                                            <p className="text-secondary mb-0">Designed and developed by</p>
                                        </div>
                                    </div>
                                    <h3 className="fs-5 fw-semibold mb-2" style={{ color: "#6f42c1" }}>Anshul Vishwakarma</h3>
                                    <p className="text-secondary mb-0 lh-lg">
                                        Built with a focus on usability, thoughtful design, and making AI tools easier to access.
                                    </p>
                                </div>
                                <div className="col-12 col-md-auto">
                                    <Link to="/feedback" className="btn btn-outline-secondary px-4">
                                        Share Feedback <i className="bi bi-arrow-right ms-2"></i>
                                    </Link>
                                </div>
                            </div>
                        </section>
                        <section className="text-center py-3 py-md-4">
                            <h2 className="fw-bold mb-2">Ready to start a conversation?</h2>
                            <p className="text-secondary mb-4">Explore AI Twins and see where your next question takes you.</p>
                            <Link to="/chat" className="btn btn-lg text-white px-5" style={{ backgroundColor: "#6f42c1" }}>
                                Open AI Chat <i className="bi bi-arrow-up-right ms-2"></i>
                            </Link>
                            <div className="mt-4">
                                <Link to="/terms" className="small text-secondary text-decoration-none">
                                    Terms & Conditions
                                </Link>
                            </div>
                        </section>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}