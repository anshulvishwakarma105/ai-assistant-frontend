import { NavLink } from 'react-router-dom';

export default function Navbar() {
    const navlinks = [
        { name: 'Home', path: '/' },
        { name: 'Chat', path: '/chat' },
        { name: 'About', path: '/about' },
        { name: 'Terms', path: '/terms' },
        { name: 'Feedback', path: '/feedback' }
    ];
    return (
        <nav className="navbar navbar-expand-md navbar-dark flex-shrink-0 position-relative" style={{ background: 'linear-gradient(110deg, #4b248b, #6f42c1, #8055ce)', boxShadow: '0 3px 18px rgba(45,20,80,0.2)', zIndex: 1030 }}>
            <div className="container-fluid px-3 px-lg-4">
                <NavLink to="/" className="navbar-brand d-flex align-items-center gap-2 fw-bold m-0">
                    <span className="d-flex align-items-center justify-content-center rounded-3" style={{ width: '38px', height: '38px', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)' }}>
                        <img src="/Chat.png" alt="AI Twins" style={{ width: '27px', height: '27px', objectFit: 'contain' }} />
                    </span>
                    <span style={{ letterSpacing: '-0.4px' }}>AI Twins <span className="fw-normal opacity-75">App</span></span>
                </NavLink>
                <button className="navbar-toggler border-0 shadow-none p-2" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvas" aria-controls="navbarOffcanvas" aria-label="Open navigation menu">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas-md offcanvas-end" tabIndex="-1" id="navbarOffcanvas" aria-labelledby="navbarOffcanvasLabel" style={{ background: 'linear-gradient(110deg, #7043c4, #8055ce)' }}>
                    <div className="offcanvas-header text-white border-bottom border-light border-opacity-25">
                        <h5 className="offcanvas-title fw-bold" id="navbarOffcanvasLabel">Menu</h5>
                        <button type="button" className="btn-close btn-close-white shadow-none" data-bs-dismiss="offcanvas" data-bs-target="#navbarOffcanvas" aria-label="Close menu"></button>
                    </div>
                    <div className="offcanvas-body align-items-center" >
                        <ul className="navbar-nav ms-auto align-items-md-center gap-1 gap-md-2" >
                            {navlinks.map((navlink) => (
                                <li key={navlink.path} className="nav-item">
                                    <NavLink to={navlink.path} end={navlink.path === '/'} className={({ isActive }) => `nav-link rounded-pill px-3 py-2 text-white ${isActive ? 'fw-bold bg-white bg-opacity-25 shadow-sm' : 'opacity-75'}`} style={{ transition: 'all 0.2s ease', fontSize: '0.95rem' }} onMouseEnter={(e) => { if (!e.currentTarget.classList.contains('bg-opacity-25')) e.currentTarget.style.background = 'rgba(255,255,255,0.12)'; e.currentTarget.style.opacity = '1'; }} onMouseLeave={(e) => { if (!e.currentTarget.classList.contains('bg-opacity-25')) e.currentTarget.style.background = 'transparent'; if (!e.currentTarget.classList.contains('bg-opacity-25')) e.currentTarget.style.opacity = '0.75'; }}>
                                        {navlink.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}