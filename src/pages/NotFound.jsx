import React from 'react'
import { Link } from 'react-router-dom'
import { PageTitle } from '../components/utils'
import OopsImg from "../assets/Oops.webp"

export default function NotFound() {
    return (
        <>
            <PageTitle title="Not Found | Ai Twins" />
            <div className="container vh-100 d-flex align-items-center justify-content-center text-center">
                <img
                    src={OopsImg}
                    alt="Aesthetic background image"
                    className="position-absolute top-0 start-0 w-100 h-100 object-fit-cover opacity-75"
                />
                <div className="position-relative h-100 d-flex flex-column align-items-center justify-content-center text-center px-3">
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
        </>
    )
}

