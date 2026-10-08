import { Link } from "react-router-dom";

export default function NewChatScreen() {
    return (
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center px-3 opacity-75">
            <img
                src="/Chat.png"
                alt="Chat Twins image"
                className="flex-shrink-0"
                style={{
                    width: "clamp(64px, 12vw, 120px)",
                    height: "clamp(64px, 12vw, 120px)"
                }}
            />

            <h4 className="text-primary user-select-none">
                Ask Anything, Be Respectful
            </h4>

            <p className="small text-muted user-select-none mb-1">
                AI can make mistakes. Verify important information.{" "}
                <Link to="/terms" className="text-decoration-none border-bottom border-primary">
                    Read Terms & Conditions
                </Link>
            </p>
        </div>
    )
}