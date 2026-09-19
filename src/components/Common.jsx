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
function FileCard({fileName}) {
    return (
        <div
            className="d-flex align-items-center bg-danger 
                text-light border rounded px-2 py-1 ">
            <i className="bi bi-file-earmark me-2"></i>
            <span >{fileName}</span>
        </div>
    )
}

export { Error, Loading, FileCard}
