import React from 'react'

export default function Sidebar({ sidebar, chats, activeChatId, setActiveChatId }) {
  return (
    <div
      className={`${sidebar ? "d-flex" : "d-none"} bg-dark text-light p-3 flex-column flex-shrink-0 sidebar`}
    >
      <button
        onClick={() => setActiveChatId(null)}
        className="btn w-100 mb-4 btn-primary"
      >
        <i className="bi bi-plus-lg me-2"></i>
        <span className="px-2">New Chat</span>
      </button>

      <h6 className="text-secondary text-uppercase mb-3 d-flex align-items-center">
        <i className="bi bi-chevron-down"></i>
        <span className="px-2">Recent Chats</span>
      </h6>

      <div className="overflow-auto">
        {chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => setActiveChatId(chat.id)}
            className={`p-2 rounded mb-1 text-truncate d-flex align-items-center gap-2 ${
              activeChatId === chat.id ? "bg-secondary" : "text-light"
            }`}
            style={{ cursor: "pointer" }}
          >
            <i className="bi bi-chevron-double-right flex-shrink-0"></i>
            <span className="text-truncate px-2">{chat.title}</span>
          </div>
        ))}
      </div>
      {/* <div className='mt-auto d-flex'>
        <span ><i className="bi bi-person-square"></i></span>
        <span className="text-truncate px-2">Guest Mod</span>
      </div> */}
    </div>
  )
}