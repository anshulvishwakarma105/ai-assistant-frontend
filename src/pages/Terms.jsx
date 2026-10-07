import React from 'react'
import { Footer, Navbar } from '../components/UiComponent'
import { Link } from 'react-router-dom'
import { PageTitle } from '../components/utils'

export default function Terms() {
    return (
        <>
            <PageTitle title="Terms | Ai Twins" />
            <Navbar />
            <div
                className="container overflow-auto py-4 custom-scrollbar"
                style={{ height: "calc(100dvh - 85px)" }}
            >
                <div className="mx-auto" style={{ maxWidth: "800px" }}>
                    <h1 className="fw-bold" style={{ color: "#6f42c1" }}>
                        Terms and Conditions
                    </h1>
                    <hr />
                    <p className="ps-2 fs-5 fw-semibold">
                        Welcome to AI Twins App. By accessing or using this application,
                        you agree to follow these Terms & Conditions.
                    </p>
                    <p className="ps-2 fw-medium text-danger">
                        If you do not agree with these terms, please do not use the application.
                    </p>
                    <h5 className="fw-semibold mt-4">1. Use of the Service</h5>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        <Link to="/chat">AI Twins App</Link> provides an interface for interacting
                        with AI services. You agree to use the application only for lawful and
                        appropriate purposes.
                    </p>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        You must not misuse the application, attempt unauthorized access,
                        upload harmful content, or interfere with its normal operation.
                    </p>
                    <h5 className="fw-semibold mt-4">2. AI-Generated Responses</h5>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        AI-generated responses may sometimes be inaccurate, incomplete,
                        outdated, or unsuitable for your particular situation.
                    </p>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        Important information should be independently verified before you
                        rely on it, especially for medical, legal, financial, or academic decisions.
                    </p>
                    <h5 className="fw-semibold mt-4">3. User Content</h5>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        You are responsible for the messages, files, documents, and other
                        content that you provide through the application.
                    </p>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        Avoid uploading sensitive, confidential, or personal information
                        unless you understand and accept the associated risks.
                    </p>
                    <h5 className="fw-semibold mt-4">4. Local Data Storage</h5>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        Some application data may be stored locally in your browser using
                        technologies such as localStorage.
                    </p>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        Clearing browser data or changing browsers may remove locally stored
                        conversations or settings. You are responsible for keeping important backups.
                    </p>
                    <h5 className="fw-semibold mt-4">5. Third-Party Services</h5>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        AI Twins App may use third-party AI or infrastructure services to
                        process requests and generate responses.
                    </p>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        The availability, functionality, and policies of these third-party
                        services are outside the direct control of AI Twins App.
                    </p>
                    <h5 className="fw-semibold mt-4">6. Availability</h5>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        We do not guarantee that the application will always be available,
                        uninterrupted, secure, or error-free.
                    </p>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        Features may be modified, temporarily unavailable, or discontinued
                        without prior notice.
                    </p>
                    <h5 className="fw-semibold mt-4">7. Intellectual Property</h5>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        The application's design, source code, branding, and original content
                        may be protected by applicable intellectual property laws.
                    </p>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        You may not copy, modify, or distribute protected parts of the
                        application without appropriate permission or applicable license.
                    </p>
                    <h5 className="fw-semibold mt-4">8. Limitation of Liability</h5>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        To the extent permitted by applicable law, AI Twins App and its
                        developers are not responsible for losses resulting from use of the application.
                    </p>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        This includes reliance on AI responses, loss of locally stored data,
                        service interruptions, or issues caused by third-party services.
                    </p>
                    <h5 className="fw-semibold mt-4">9. Changes to These Terms</h5>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        These Terms & Conditions may be updated from time to time to reflect
                        changes to the application or its features.
                    </p>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        Updated terms become effective when published within the application.
                        Continued use of the application means you accept the updated terms.
                    </p>
                    <h5 className="fw-semibold mt-4">10. Contact</h5>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        If you have questions or concerns about these Terms & Conditions,
                        you can <Link to="/feedback">contact the developer</Link> through
                        the application's feedback section.
                    </p>
                    <p className="fst-italic">
                        <i className="bi bi-dot me-2"></i>
                        By using <Link to="/chat">AI Twins App</Link>, you acknowledge that
                        you have read and understood these Terms & Conditions and agree to
                        comply with them.
                    </p>
                </div>
            </div>
            <Footer />
        </>
    )
}
