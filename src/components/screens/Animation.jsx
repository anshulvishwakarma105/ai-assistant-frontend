import React from 'react'

export default function Animation() {
    return (
        <div className="app bg-primary text-light d-flex flex-column align-items-center justify-content-center gap-4">
            <img
                src="/Loading.png"
                alt="Loading icon image"
                className=" flex-shrink-0"
                style={{
                    width: "clamp(64px, 12vw, 120px)",
                    height: "clamp(64px, 12vw, 120px)"
                }}
            />

            <div className="fw-semibold fs-4 fs-md-3 text-center px-3">
                Wait, It Is Loading
                <span className="ms-1" style={{ letterSpacing: "8px" }}>...</span>
            </div>
        </div>
    )
}
