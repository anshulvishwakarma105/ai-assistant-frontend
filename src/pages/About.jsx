import React from 'react'
import { Footer, Navbar } from '../components/UiComponent'
import { Link } from 'react-router-dom'
import { PageTitle } from '../components/utils'
import AboutImg from "../assets/About.png"

export default function About() {
    return (
        <>
        <PageTitle title="About | Ai Twins" />
            <Navbar />
            <div
                className="pt-3 pt-md-0 container d-flex align-items-start overflow-auto hide-scrollbar"
                style={{
                    height: "calc(100dvh - 85px)",
                    marginBottom: "60px"
                }}
            >
                <div className="row align-items-center g-3 g-md-5 w-100 mx-auto py-2">
                    <div className="col-12 col-md-6">
                        <h1 className="fw-bold display-6 mb-3">
                            Welcome To AI Chat App!
                        </h1>

                        <p className="text-secondary fs-5 fw-semibold mb-4">
                            We are here to provide you with a fast and private service
                            that doesn't track or store your data.
                        </p>

                        <div className="pt-3">
                            <h2
                                className="fw-semibold mb-3"
                                style={{ color: "#6f42c1" }}
                            >
                                About Us
                            </h2>

                            <p className="text-secondary mb-4">
                                AI Chat App is designed to provide a simple, fast and
                                privacy-focused chat experience. Your conversations and
                                information are kept locally, giving you greater control
                                over your data.
                            </p>

                            <div className="d-flex align-items-center justify-content-start gap-3">
                                <Link to="/chat" className="btn btn-primary btn-lg px-4">
                                    Get Started
                                </Link>

                                <Link to="/feedback" className="btn btn-outline-secondary btn-lg px-4">
                                    Rate Us
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 d-flex justify-content-center">
                        <img
                            src={AboutImg}
                            alt="Group of people together"
                            className="about-img img-fluid"
                        />
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}