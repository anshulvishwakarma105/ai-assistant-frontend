import React from 'react';

export default function Footer() {
    return (
        <footer className="d-flex align-items-center justify-content-center flex-shrink-0 text-white px-2 py-2 py-md-3 position-relative" style={{ background: 'linear-gradient(110deg, #4b248b, #6f42c1, #8055ce)', boxShadow: '0 -3px 18px rgba(45,20,80,0.12)', zIndex: 1020 }}>
            <p className="m-0 d-flex flex-wrap align-items-center justify-content-center gap-1 text-center" style={{ fontSize: 'clamp(0.72rem, 1.5vw, 0.9rem)', letterSpacing: '0.15px' }}>
                <span className="opacity-75">Copyright © {new Date().getFullYear()}</span>
                <span className="fw-bold">AI-Twins<span className="d-none d-sm-inline">-app</span></span>
                <span className="mx-1 opacity-50">|</span>
                <span className="d-none d-md-inline opacity-75">Developed by</span>
                <span className="d-none d-md-inline fw-semibold">Anshul Vishwakarma</span>
                <span className="d-inline d-md-none fw-semibold">AV Dev</span>
            </p>
        </footer>
    );
}