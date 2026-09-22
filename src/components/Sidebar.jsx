import React, { useEffect, useState } from 'react'
import { ChatOperations } from './Popups';
import { UserInfoCard } from './Common';

export default function Sidebar({ sidebar, setSidebar, appData, activeChatId, setActiveChatId, setEditor, handleRenameChat, setConfirm, handleDeleteChat }) {
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
  const isMobile = window.innerWidth <= 767.98;

  return (

    <div
      className={` ${sidebar ? "d-flex" : "d-none"} bg-dark text-light p-3  flex-shrink-0 sidebar popup-animation h-100  flex-column`}
    >
      <button
        onClick={() => {
          if (isMobile) {
            setSidebar(null);
          }
          setActiveChatId(null);
        }}
        className="btn w-100 mb-4 btn-primary"
      >
        <i className="bi bi-plus-lg me-2"></i>
        <span>New Chat</span>
      </button>

      <h6 className="text-secondary text-uppercase mb-3 d-flex align-items-center">
        <i className="bi bi-chevron-down"></i>
        <span className="px-2">Recent Chats</span>
      </h6>

      <div className="position-relative overflow-visible">
        {appData.chats.map(chat => (
          <div
            key={chat.id}
            onClick={() => {
              if (isMobile) {
                setSidebar(null);
              }
              setActiveChatId(chat.id);
            }}
            className={` p-2 rounded mb-1 text-truncate d-flex align-items-center gap-2  ${activeChatId === chat.id ? "bg-secondary" : "text-light"
              }`}
            style={{
              cursor: "pointer",
            }}
          >
            <i className="bi bi-stars flex-shrink-0 px-2"></i>
            <span className="text-truncate">{chat.title}</span>
            <button
              className="btn  btn-sm border-0 text-light p-1 ms-auto"
              onClick={(e) => {
                e.stopPropagation();
                setConfirm(null);
                setEditor(null)
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
                handleDeleteChat={handleDeleteChat} />
            )}
          </div>
        ))}
      </div>
      <UserInfoCard userInfo={appData.userInfo}/>
    </div>
  )
}