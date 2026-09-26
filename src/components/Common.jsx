import React from 'react'
import { getActiveChat, isMobile } from './utils'

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
        <div className="alert alert-danger mx-3 my-2" role="alert">
            {error.toString()}
        </div>
    )
}
function Loading() {
    return (
        <div className="text-muted px-3 py-2">
            Answering...
        </div>
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
                className="btn btn-primary"
                onClick={() => setSidebar(prev => !prev)}
            >{(sidebar && isMobile) ?
                <i className="bi bi-x-lg"></i> :
                <i className="bi bi-list-nested"></i>}
            </button>
            <div className="d-flex align-items-baseline gap-2 me-5 ms-4 ms-lg-0">
                <span className="d-none d-sm-inline text-success ">Current Chat :</span>
                <span>{activeChat?.title ?? "New Chat"}</span>
                <i className="bi bi-chevron-bar-down "></i>
            </div>
        </div>
    )
}
function NewChatScreen() {
    return (
        <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
            <h3 className="text-primary user-select-none">Ask Anything | Feel Free to Ask</h3>
            <h5 className="text-muted user-select-none">Be Respectful and Kind</h5>
            <p className="small text-danger user-select-none">
                (AI responses may be inaccurate. Please double-check important information.)
            </p>
        </div>
    )
}

function UserInfoCard({ userInfo, setUserForm }) {
    return (
        <div
            className="mt-auto d-flex align-items-center gap-2 p-2 rounded-3 border"
            onClick={() => setUserForm(prev => !prev)}
            style={{
                cursor: "pointer"
            }}
        >
            <img src="/Profile.png" alt="profile" className="rounded-circle flex-shrink-0" width="32" height="32" />
            <div className="d-flex flex-column px-1 overflow-hidden">
                <div className="text-truncate text-light">{userInfo.name}</div>
                <div className="text-secondary d-flex align-items-center gap-2 text-truncate">
                    <span className="text-truncate">Saving on localstorage</span>
                    <i className="bi bi-cloud-arrow-up flex-shrink-0"></i>
                </div>
            </div>
        </div>
    )
}

export { Animation, Error, Loading, FileCard, ChatBoxHeader, NewChatScreen, UserInfoCard }

