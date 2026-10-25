import React from 'react';

export default function Animation() {
    return (
        <div className="d-flex flex-column align-items-center justify-content-center gap-4 text-light" style={{ width: '100%', minHeight: '100vh', minHeight: '100dvh', background: 'linear-gradient(135deg, #321568, #6f42c1, #176fbd)', overflow: 'hidden' }}>
            <div className="loading-logo-wrapper d-flex align-items-center justify-content-center rounded-4 p-3">
                <img src="/Loading.png" alt="Loading" className="loading-logo" />
            </div>
            <div className="text-center px-3">
                <h2 className="fw-semibold mb-3" style={{ fontSize: 'clamp(1.2rem, 3vw, 1.75rem)', letterSpacing: '0.3px' }}>Getting things ready</h2>
                <p className="mb-0" style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem' }}>AI Twins is preparing your experience</p>
            </div>
            <div className="d-flex align-items-center gap-2" role="status" aria-label="Loading">
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
                <span className="loading-dot"></span>
            </div>
        </div>
    );
}