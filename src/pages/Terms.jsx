
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/uiComponents/Navbar';
import Footer from '../components/uiComponents/Footer';
import { PageTitle } from '../components/Calculations';

export default function Terms() {
    const sections = [
        {
            title: 'Use of the Service',
            icon: 'bi-shield-check',
            content: [
                <> <Link to="/chat" className="link-primary text-decoration-none fw-semibold">AI Twins App</Link> provides an interface for interacting with AI services. You agree to use the application only for lawful and appropriate purposes.</>,
                <>You must not misuse the application, attempt unauthorized access, upload harmful content, or interfere with its normal operation.</>
            ]
        },
        {
            title: 'AI-Generated Responses',
            icon: 'bi-robot',
            content: [
                <>AI-generated responses may sometimes be inaccurate, incomplete, outdated, or unsuitable for your particular situation.</>,
                <>Important information should be independently verified before you rely on it, especially for medical, legal, financial, or academic decisions.</>
            ]
        },
        {
            title: 'User Content',
            icon: 'bi-chat-square-text',
            content: [
                <>You are responsible for the messages, files, documents, and other content that you provide through the application.</>,
                <>Avoid uploading sensitive, confidential, or personal information unless you understand and accept the associated risks.</>
            ]
        },
        {
            title: 'Local Data Storage',
            icon: 'bi-database',
            content: [
                <>Some application data may be stored locally in your browser using technologies such as localStorage.</>,
                <>Clearing browser data or changing browsers may remove locally stored conversations or settings. You are responsible for keeping important backups.</>
            ]
        },
        {
            title: 'Third-Party Services',
            icon: 'bi-diagram-3',
            content: [
                <>AI Twins App may use third-party AI or infrastructure services to process requests and generate responses.</>,
                <>The availability, functionality, and policies of these third-party services are outside the direct control of AI Twins App.</>
            ]
        },
        {
            title: 'Availability',
            icon: 'bi-cloud-check',
            content: [
                <>We do not guarantee that the application will always be available, uninterrupted, secure, or error-free.</>,
                <>Features may be modified, temporarily unavailable, or discontinued without prior notice.</>
            ]
        },
        {
            title: 'Intellectual Property',
            icon: 'bi-lightbulb',
            content: [
                <>The application's design, source code, branding, and original content may be protected by applicable intellectual property laws.</>,
                <>You may not copy, modify, or distribute protected parts of the application without appropriate permission or applicable license.</>
            ]
        },
        {
            title: 'Limitation of Liability',
            icon: 'bi-exclamation-triangle',
            content: [
                <>To the extent permitted by applicable law, AI Twins App and its developers are not responsible for losses resulting from use of the application.</>,
                <>This includes reliance on AI responses, loss of locally stored data, service interruptions, or issues caused by third-party services.</>
            ]
        },
        {
            title: 'Changes to These Terms',
            icon: 'bi-arrow-repeat',
            content: [
                <>These Terms & Conditions may be updated from time to time to reflect changes to the application or its features.</>,
                <>Updated terms become effective when published within the application. Continued use of the application means you accept the updated terms.</>
            ]
        },
        {
            title: 'Contact',
            icon: 'bi-envelope',
            content: [
                <>If you have questions or concerns about these Terms & Conditions, you can <Link to="/feedback" className="link-primary text-decoration-none fw-semibold">contact the developer</Link> through the application's feedback section.</>,
                <>By using <Link to="/chat" className="link-primary text-decoration-none fw-semibold">AI Twins App</Link>, you acknowledge that you have read and understood these Terms & Conditions and agree to comply with them.</>
            ]
        }
    ];

    return (
        <>
            <PageTitle title="Terms & Conditions | Ai Twins" />
            <div className="d-flex flex-column" style={{ height: '100vh', height: '100dvh', minHeight: 0 }}>
                <Navbar />
                <main className="flex-grow-1 overflow-auto custom-scrollbar">
                    <div className="container py-4 py-md-5 px-3">
                        <div className="mx-auto" style={{ maxWidth: '850px' }}>
                            <div className="d-flex align-items-center gap-3 mb-3">
                                <div className="rounded-3 bg-primary bg-opacity-10 text-primary d-flex align-items-center justify-content-center flex-shrink-0" style={{ width: '54px', height: '54px' }}>
                                    <i className="bi bi-file-earmark-text fs-2"></i>
                                </div>
                                <div>
                                    <h1 className="fw-bold mb-1" style={{ color: '#6f42c1', fontSize: 'clamp(1.7rem, 4vw, 2.5rem)' }}>Terms & Conditions</h1>
                                    <p className="text-secondary mb-0 small">AI Twins App · Please read carefully</p>
                                </div>
                            </div>
                            <hr className="mb-4" />
                            <div className="alert alert-primary bg-primary bg-opacity-10 border-0 rounded-3 mb-4">
                                <div className="d-flex gap-2">
                                    <i className="bi bi-info-circle-fill fs-5"></i>
                                    <div>
                                        <p className="fw-semibold mb-1">Welcome to AI Twins App</p>
                                        <p className="mb-0">By accessing or using this application, you agree to follow these Terms & Conditions.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="alert alert-warning border-0 rounded-3 mb-4">
                                <i className="bi bi-exclamation-circle-fill me-2"></i>
                               By using this application, you acknowledge that you have read, understood, and agree to comply with the latest version of these Terms & Conditions. Continued use of the application constitutes acceptance of any updated terms.
                               </div>
                            <div className="d-flex flex-column gap-3">
                                {sections.map((section, index) => (
                                    <section key={section.title} className="card border shadow-sm rounded-3">
                                        <div className="card-body p-3 p-md-4">
                                            <h2 className="h5 fw-bold d-flex align-items-center gap-2 mb-3">
                                                <i className={`bi ${section.icon}`} style={{ color: '#6f42c1' }}></i>
                                                <span>{index + 1}. {section.title}</span>
                                            </h2>
                                            <div className="d-flex flex-column gap-3">
                                                {section.content.map((paragraph, i) => (
                                                    <p key={i} className="mb-0 text-body-secondary" style={{ lineHeight: 1.75 }}>
                                                        <i className="bi bi-dot me-1 text-primary"></i>
                                                        {paragraph}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </section>
                                ))}
                            </div>
                            <div className="text-center py-4">
                                <i className="bi bi-shield-check fs-4 d-block mb-2" style={{ color: '#6f42c1' }}></i>
                                <p className="text-secondary small mb-3">Thank you for using AI Twins App.</p>
                                <div className="d-flex justify-content-center flex-wrap gap-2">
                                    <Link to="/chat" className="btn btn-primary">
                                        <i className="bi bi-chat-dots me-2"></i>Go to Chat
                                    </Link>
                                    <Link to="/feedback" className="btn btn-outline-secondary">
                                        <i className="bi bi-chat-square-text me-2"></i>Send Feedback
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        </>
    );
}
