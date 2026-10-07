import { NavLink } from 'react-router-dom'

function Navbar() {
    const navlinks = [
        {
            name: "Home",
            path: "/"
        },
        {
            name: "Chat",
            path: "/chat"
        },
        {
            name: "About",
            path: "/about"
        },
        {
            name: "Terms",
            path: "/terms"
        },
        {
            name: "Feedback",
            path: "/feedback"
        }]
    return (
        <nav className="navbar navbar-expand-md bg-primary" data-bs-theme="dark">
            <div className="container-fluid">
                <NavLink to="/" className="navbar-brand fw-bold align-middle" > <img
                    src="/Chat.png"
                    alt="Chat Twins image"
                    className="flex-shrink-0 opacity-75 me-2"
                    style={{
                        width: "26px",
                        height: "26px"
                    }} /> <span>Ai Twins App</span></NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="offcanvas"
                    data-bs-target="#navbarOffcanvas"
                    aria-controls="navbarOffcanvas"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div
                    className="offcanvas-md offcanvas-end"
                    tabIndex="-1"
                    id="navbarOffcanvas"
                    aria-labelledby="navbarOffcanvasLabel"
                >
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="navbarOffcanvasLabel">
                            Menu
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="offcanvas"
                            data-bs-target="#navbarOffcanvas"
                            aria-label="Close"
                        ></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav ms-auto me-5">
                            {navlinks.map((navlink, index) => (
                                <li key={index} className="nav-item px-2" >
                                    <NavLink
                                        to={navlink.path}
                                        className={({ isActive }) =>
                                            `nav-link ${isActive ? "active" : ""}`}>
                                        {navlink.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul >
                    </div >
                </div >
            </div >
        </nav >
    )
}
function Footer() {
    return (
        <footer className="d-flex align-items-center  justify-content-center fixed-bottom bg-primary text-light py-3 px-2 fw-semibold">
            <p className='m-0'>Copyright <span>&copy;</span> 2026 Ai-Twins<span className='d-none d-sm-inline'>-app</span> | <span className='d-none d-md-inline'>Developed by Anshul Vishwakarma</span><span  className='d-inline d-md-none'>Av Dev</span></p>
        </footer>
    )
}

export { Navbar, Footer }
