import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { UserInfoCard } from '../../RenderComponents';
import { isMobile } from "../../Calculations";
import { ChatOperationsList } from '../../PopComponents';

export default function Sidebar({ sidebar, setSidebar, appData, activeChatId, setEditor, handleRenameChat, setConfirm, handleDeleteChat, setUserForm, hanleDeleteHistory }) {
  const navigate = useNavigate();
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
      className={` ${sidebar ? "d-flex " : "d-none"}  bg-dark text-light p-3  flex-shrink-0 sidebar popup-animation h-100  flex-column`}
    >
      <div className='position-relative h-100 d-flex  flex-column'>
        <button
          onClick={() => {
            if (isMobile) {
              setSidebar(null);
            }
            navigate(`/chat/new`);
          }}
          className="btn w-100 mb-4 btn-primary"
        >
          <i className="bi bi-pencil-square me-2"></i>
          <span>New Chat</span>
        </button>

        <h6 className="text-secondary text-uppercase mb-3 d-flex align-items-center">
          <i className="bi bi-chevron-down"></i>
          <span className="px-2">Recent Chats</span>
        </h6>

        <div className=" overflow-auto  hide-scrollbar">
          {appData.chats.length !== 0 ? appData.chats?.map(chat => (
            <div
              key={chat.id}
              onClick={() => {
                if (isMobile) {
                  setSidebar(null);
                }
                navigate(`/chat/${chat.id}`);
              }}
              className={` p-2 rounded mb-1 text-truncate d-flex align-items-center gap-2 cursor-pointer ${activeChatId === chat.id ? "bg-secondary" : "text-light"
                }`}
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
                <ChatOperationsList
                  chatId={chat.id}
                  chatName={chat.title}
                  setChatOperations={setChatOperations}
                  setEditor={setEditor}
                  handleRenameChat={handleRenameChat}
                  setConfirm={setConfirm}
                  handleDeleteChat={handleDeleteChat} />
              )}
            </div>
          )) :
            <div className='d-flex justify-content-center text-secondary fst-italic '><i className="bi bi-ban me-2"></i> No Chat To Show Here</div>
          }
        </div>
        <UserInfoCard userInfo={appData.userInfo} setUserForm={setUserForm} setConfirm={setConfirm} hanleDeleteHistory={hanleDeleteHistory} />
      </div>
    </div>
  )
}