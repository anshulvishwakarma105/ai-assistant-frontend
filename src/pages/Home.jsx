import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/uiComponents/Navbar';
import Footer from '../components/uiComponents/Footer';
import { PageTitle } from '../components/Calculations';
import { Advertise } from '../components/RenderComponents';
import BackgroundImg from '../assets/images/Home.jpg';

export default function Home() {
    const [showAd, setShowAd] = useState(true);
    return (
        <>
            <PageTitle title="Home | AI Twins" />
            <div className="d-flex flex-column w-100 overflow-hidden" style={{ height: '100vh', height: '100dvh' }}>
                <Navbar />
                <main className="position-relative flex-grow-1 d-flex flex-column overflow-hidden" style={{ minHeight: 0, isolation: 'isolate' }}>
                    <img src={BackgroundImg} alt="" aria-hidden="true" className="position-absolute top-0 start-0 w-100 h-100" style={{ objectFit: 'cover', objectPosition: 'center', zIndex: -2 }} />
                    <div className="position-absolute top-0 start-0 w-100 h-100" style={{ background: 'linear-gradient(135deg, rgba(248,245,255,0.28), rgba(235,225,255,0.16), rgba(255,255,255,0.24))', zIndex: -1, pointerEvents: 'none' }} />
                    <div className="position-absolute rounded-circle" style={{ width: 'clamp(180px, 30vw, 400px)', height: 'clamp(180px, 30vw, 400px)', background: 'rgba(111,66,193,0.1)', filter: 'blur(65px)', top: '-12%', left: '-8%', zIndex: -1, pointerEvents: 'none' }} />
                    <div className="position-absolute rounded-circle" style={{ width: 'clamp(180px, 28vw, 360px)', height: 'clamp(180px, 28vw, 360px)', background: 'rgba(155,109,232,0.1)', filter: 'blur(65px)', bottom: '-15%', right: '-6%', zIndex: -1, pointerEvents: 'none' }} />
                    <section className="position-relative flex-grow-1 d-flex flex-column align-items-center justify-content-center text-center px-3 py-3 overflow-auto" style={{ minHeight: 0, gap: 'clamp(8px, 1.5vh, 16px)', zIndex: 1 }}>
                        <div className="d-flex align-items-center justify-content-center rounded-4 p-2 mt-2 flex-shrink-0" style={{ background: 'rgba(255,255,255,0.65)', border: '1px solid rgba(111,66,193,0.15)', boxShadow: '0 15px 45px rgba(75,42,130,0.12)', backdropFilter: 'blur(8px)' }}>
                            <img src="/Chat.png" alt="AI Twins" style={{ width: 'clamp(65px, 11vh, 115px)', height: 'clamp(65px, 11vh, 115px)', objectFit: 'contain' }} />
                        </div>
                        <div className="flex-shrink-0">
                            <h1 className="fw-bold m-0" style={{ fontSize: 'clamp(2rem, 6vh, 4.5rem)', lineHeight: 1.08, letterSpacing: '-0.04em', color: '#24143f' }}>Your Ideas.<br /><span style={{ background: 'linear-gradient(90deg, #6f42c1, #a855f7)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Two AI Minds.</span></h1>
                            <p className="mx-auto mt-3 mb-0" style={{ maxWidth: '540px', color: '#40344f', fontSize: 'clamp(0.85rem, 1.8vh, 1.05rem)', lineHeight: 1.65 }}>Chat, explore ideas and get AI-powered assistance in a clean, simple workspace. Your conversations stay stored locally on your device.</p>
                        </div>
                        <div className="d-flex flex-wrap justify-content-center gap-3 mt-1 flex-shrink-0">
                            <Link to="/chat" className="btn btn-lg rounded-pill px-4 d-inline-flex align-items-center justify-content-center gap-2 text-white shadow" style={{ background: 'linear-gradient(135deg, #6f42c1, #8b5cf6)', border: 'none', fontSize: 'clamp(0.9rem, 1.8vh, 1.05rem)', boxShadow: '0 8px 22px rgba(111,66,193,0.28)' }}>Start Chatting <i className="bi bi-arrow-right"></i></Link>
                            <Link to="/feedback" className="btn btn-lg rounded-pill px-4 d-inline-flex align-items-center justify-content-center gap-2" style={{ color: '#59349b', background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(111,66,193,0.3)', fontSize: 'clamp(0.9rem, 1.8vh, 1.05rem)' }}><i className="bi bi-chat-square-text"></i> Feedback</Link>
                        </div>
                        {showAd && <div className="w-100 flex-shrink-0" style={{ maxWidth: '550px' }}><Advertise setAd={setShowAd} variant="home" /></div>}
                        <p className="m-0 pb-1 user-select-none flex-shrink-0" style={{ fontSize: 'clamp(0.65rem, 1.35vh, 0.8rem)', color: '#40344f' }}>AI can make mistakes. Please review our <Link to="/terms" className="text-decoration-none fw-semibold" style={{ color: '#6f42c1', borderBottom: '1px solid #6f42c1' }}>Terms &amp; Conditions</Link>.</p>
                    </section>
                </main>
                <Footer />
            </div>
        </>
    );
}