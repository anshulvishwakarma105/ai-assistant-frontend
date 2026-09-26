import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (

        <div className="container vh-100 d-flex align-items-center justify-content-center text-center">
            <div>
                <h1 className="display-1 fw-bold" style={{ color: "#6f42c1" }}>
                    404
                </h1>

                <h2 className="fw-semibold mb-3">
                    Page Not Found
                </h2>

                <p className="text-secondary mb-4">
                    The page you are looking for doesn't exist or may have been moved.
                </p>

                <Link to="/" className="btn btn-primary px-4">
                    Go Home
                </Link>
            </div>
        </div>
    )
}

