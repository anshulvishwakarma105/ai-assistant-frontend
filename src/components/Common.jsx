import { getActiveChat, isMobile } from './utils'
import { Link } from 'react-router-dom'
import DOMPurify from "dompurify";
import { useState } from 'react';

function SvgImage({ svg_code }) {
    if (!svg_code) {
        return null;
    }

    const svg = DOMPurify.sanitize(svg_code, {
        USE_PROFILES: { svg: true }
    });

    return (
        <div
            className="svg-image border rounded my-2"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
function Animation() {
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
function Error({ error }) {
    return (
        <div className="text-danger px-3 py-2">
            <i className="bi bi-exclamation-circle-fill me-2"></i>
            {error.toString()}
        </div>
    )
}
function Loading() {
    return (
        <div  className='d-flex align-items-center'>
            <span className="text-primary fw-semibold px-3 py-2">Twin Answering . . .</span>
            <div className="spinner-border spinner-border-sm text-primary" role="status" />
        </div>
    )
}
function CopyBtn({ text }) {
    const [copied, setCopied] = useState(false)
    const copyText = async () => {
        try {
            //can be cleanMarkDown(text) for bot response
            if (!navigator.clipboard) return;
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false)
            }, 2000);
        } catch (e) {
            console.error("Copy failed:", e);
        }
    }
    return (
        <button className='btn btn-sm btn-outline-none '
            type='button'
            onClick={copyText}
        >
            <i className={`bi ${copied ? "bi-check-lg text-success" : "bi-copy"}`}></i>
        </button>
    )
}

function FileCard({ fileName }) {
    return (
        <div
            className="d-flex align-items-center bg-secondary
                text-light border   rounded-pill px-3 py-1  "
            style={{
                maxWidth: "240px"
            }}>
            <i className="bi bi-file-earmark-text-fill me-2 text-warning"></i>
            <span className="text-truncate ">{fileName}</span>
        </div>
    )
}
function ChatBoxHeader({ sidebar, setSidebar, appData, activeChatId }) {
    const activeChat = getActiveChat(appData, activeChatId);
    return (
        <div className="bg-dark text-light border-bottom p-2  
                  d-flex align-items-center justify-content-between flex-shrink-0 chatbox-header">

            <button
                className="btn btn-primary "
                onClick={() => setSidebar(prev => !prev)}
            >{(sidebar && isMobile) ?
                <i className="bi bi-x-lg "></i> :
                <i className="bi bi-list-nested"></i>}
            </button>
            <div className="d-flex align-items-baseline gap-2 me-5 ms-4 ms-lg-0 text-truncate">
                <span className="d-none d-sm-inline text-success ">Current Chat :</span>
                <span className='text-truncate'>{activeChat?.title ?? "New Chat"}</span>
                <i className="bi bi-chevron-bar-down "></i>
            </div>
        </div>
    )
}
function NewChatScreen() {
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
function UserInfoCard({ userInfo, setUserForm, setConfirm, hanleDeleteHistory }) {
    const hanleDeleteBtn = (e) => {
        e.stopPropagation();
        setConfirm({
            title: "Refresh",
            message: `Are you sure want to delete your whole Data ?`,
            action: hanleDeleteHistory
        })


    };
    return (
        <div
            className="mt-auto d-flex align-items-center gap-2 p-2 rounded-3 border"

        >
            <img
                src="/Profile.png" alt="profile"
                className="rounded-circle flex-shrink-0 cursor-pointer"
                width="32" height="32"
                onClick={() => setUserForm(prev => !prev)} />
            <div className="d-flex flex-column px-1 overflow-hidden">
                <div className="text-truncate text-light">{userInfo.name}</div>
                <div className="text-secondary d-flex align-items-center gap-1 text-truncate">
                    <i className="bi bi-clock-history flex-shrink-0 me-1"></i>
                    <span className="text-truncate small fst-italic">{userInfo.preferences.timezone}</span>
                </div>
            </div>
            <div
                className='btn btn-outline-danger ms-auto fs-6 ' aria-label='Delete History'
                onClick={hanleDeleteBtn}
            >
                <i className="bi bi-trash3"></i>
            </div>
        </div>
    )
}

export { SvgImage, Animation, Error, Loading, CopyBtn, FileCard, ChatBoxHeader, NewChatScreen, UserInfoCard }

