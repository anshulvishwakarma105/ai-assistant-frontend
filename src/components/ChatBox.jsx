import React from 'react';
import ReactMarkdown from "react-markdown";

export default function ChatBox({ chats, activeChatId, error, loading }) {
  if (!activeChatId) {
    return (
      <div className="flex-grow-1 d-flex flex-column justify-content-center align-items-center text-center">
        <h3 className="text-primary user-select-none">Ask Anything | Feel Free to Ask</h3>
        <h5 className="text-muted user-select-none">Be Respectful and Kind</h5>
      </div>
    )
  }

  const activeChat = chats.find(chat => chat.id === activeChatId)

  return (
    <div className="flex-grow-1 overflow-auto py-3 px-3">
      <div className="d-flex flex-column gap-2">
        {activeChat?.messages.map(chat => (
          <div
            key={chat.id}
            className={chat.role === "user" ? "d-flex flex-column align-items-end my-2" : "d-flex justify-content-start my-2"}
          >
            <div className={chat.file ? "d-flex align-items-center bg-danger text-light border rounded px-2 py-1 " 
              : "d-none"}>
              <i className="bi bi-file-earmark"></i>
              <span className='px-2'>{chat.file}</span>
            </div>
            <div>
              <div
                className={chat.role === "user" ? "bg-primary text-white border rounded  px-3 py-2" :  "border-start border-3 border-secondary text-dark px-3 py-2"}
              >
                {chat.role === "bot" ?
                  <ReactMarkdown>
                    {chat.content}
                  </ReactMarkdown>
                  : chat.content}
              </div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-muted px-3 py-2">
            Answering...
          </div>
        )}
        {error && (
          <div className="alert alert-danger mx-3 my-2" role="alert">
            {error.toString()}
          </div>
        )}
      </div>
    </div>
  )
}

