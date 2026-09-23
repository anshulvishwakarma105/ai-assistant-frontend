import React from 'react'

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
function UserInfoCard({ userInfo, setUserForm }) {
    return (
        <div
            className="mt-auto d-flex align-items-center gap-2 p-2 rounded-3 border"
            onClick={() => setUserForm(prev => !prev)}
            style={{
                cursor:"pointer"
            }}
        >
            <img src="/profile.png" alt="profile" className="rounded-circle flex-shrink-0" width="32" height="32" />
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

export { Error, Loading, FileCard, UserInfoCard }

