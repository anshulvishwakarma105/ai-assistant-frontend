import React from 'react';
import { Link } from 'react-router-dom';
import { PageTitle } from '../components/Calculations';
import OopsImg from '../assets/images/NotFound.jpg';

export default function NotFound() {
    return (
        <>
            <PageTitle title="404 | AI Twins" />
            <div className="position-relative d-flex align-items-center justify-content-center text-center overflow-auto" style={{ minHeight: '100vh', minHeight: '100dvh', isolation: 'isolate' }}>
                <img src={OopsImg} alt="" aria-hidden="true" className="position-fixed top-0 start-0 w-100 h-100" style={{ objectFit: 'cover', objectPosition: 'center', zIndex: -2 }} />
                <div className="position-fixed top-0 start-0 w-100 h-100" style={{ background: 'rgba(20,10,35,0.35)', zIndex: -1, pointerEvents: 'none' }} />
                <div className="position-relative d-flex flex-column align-items-center justify-content-center px-3 py-5">
                    <p className="text-uppercase fw-semibold mb-2" style={{ color: '#e1caff', letterSpacing: '4px', fontSize: '0.85rem', textShadow: '0 2px 8px rgba(0,0,0,0.5)' }}>Oops! Page lost</p>
                    <h1 className="fw-bold m-0" style={{ fontSize: 'clamp(6rem, 22vw, 12rem)', lineHeight: 0.95, background: 'linear-gradient(135deg, #d9b8ff, #ffffff, #85dfff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', filter: 'drop-shadow(0 5px 15px rgba(0,0,0,0.3))' }}>404</h1>
                    <h2 className="fw-bold mt-4 mb-2 text-white" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.4rem)', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Page Not Found</h2>
                    <p className="mb-4 text-white" style={{ maxWidth: '430px', lineHeight: 1.7, fontSize: 'clamp(0.9rem, 2vw, 1.05rem)', textShadow: '0 2px 8px rgba(0,0,0,0.7)' }}>The page you're looking for doesn't exist or may have been moved.</p>
                    <Link to="/" className="btn btn-lg rounded-pill px-4 py-2 d-inline-flex align-items-center gap-2 text-white fw-semibold" style={{ background: 'linear-gradient(110deg, #6f42c1, #168de2)', border: '1px solid rgba(255,255,255,0.35)', boxShadow: '0 8px 25px rgba(0,0,0,0.25)' }}>
                        <i className="bi bi-house-door-fill"></i> Go Home <i className="bi bi-arrow-right"></i>
                    </Link>
                    <p className="mt-4 mb-0 text-white-50 small">AI Twins App <span className="mx-1">·</span> Let's get you back on track</p>
                </div>
            </div>
        </>
    );
}