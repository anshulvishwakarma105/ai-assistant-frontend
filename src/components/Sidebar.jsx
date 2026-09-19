import React, { useEffect, useState } from 'react'
import { ChatOperations } from './Popups';

export default function Sidebar({ sidebar, chats, activeChatId, setActiveChatId, setEditor, handleRenameChat, setConfirm, handleDeleteChat, setAlert }) {
  const [chatOperations, setChatOperations] = useState(null);
  useEffect(() => {
    const handleClickOutside = () => {
      setChatOperations(null);
      setEditor(null);
      setConfirm(null);
    }
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    }
  }, [])


  return (
    <div
      className={`${sidebar ? "d-flex" : "d-none"} bg-dark text-light p-3 flex-column flex-shrink-0 sidebar  `}
      style={{
        position: "relative"
      }}
    >
      <button
        onClick={() => setActiveChatId(null)}
        className="btn w-100 mb-4 btn-primary"
      >
        <i className="bi bi-plus-lg me-2"></i>
        <span>New Chat</span>
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
            className={` p-2 rounded mb-1 text-truncate d-flex align-items-center gap-2  ${activeChatId === chat.id ? "bg-secondary" : "text-light"
              }`}
            style={{
              cursor: "pointer",
            }}
          >
            <i className="bi bi-chevron-double-right flex-shrink-0"></i>
            <span className="text-truncate">{chat.title}</span>
            <button
              className="btn  btn-sm border-0 text-light p-1 ms-auto"
              onClick={(e) => {
                e.stopPropagation();
                setChatOperations(prev => prev === chat.id ? null : chat.id);

              }}
            >
              <i className="bi bi-three-dots-vertical"></i>
            </button>
            {chatOperations === chat.id && (
              <ChatOperations
                chatId={chat.id}
                chatName={chat.title}
                setChatOperations={setChatOperations}
                setEditor={setEditor}
                handleRenameChat={handleRenameChat}
                setConfirm={setConfirm}
                handleDeleteChat={handleDeleteChat}
                setAlert={setAlert} />
            )}
          </div>
        ))}
      </div>
      <div className="mt-auto d-flex align-items-center gap-2 p-2 rounded-3 border">
        <img src="/profile.png" alt="profile" className="rounded-circle flex-shrink-0" width="32" height="32" />
        <div className="d-flex flex-column px-1 overflow-hidden">
          <div className="text-truncate text-light">Guest Mod</div>
          <div className="text-secondary d-flex align-items-center gap-2 text-truncate">
            <span className="text-truncate">Saving on localstorage</span>
            <i className="bi bi-cloud-arrow-up flex-shrink-0"></i>
          </div>
        </div>
      </div>

    </div>
  )
}