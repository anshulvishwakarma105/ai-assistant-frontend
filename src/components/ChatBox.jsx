import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import { Loading, Error, FileCard, NewChatScreen, SvgImage } from './Common';
import { getActiveChat, isMobile } from "./utils";
import { useNavigate } from 'react-router-dom';

export default function ChatBox({ appData, activeChatId, keyboardHeight, sidebar, error, loading }) {
  const navigate = useNavigate()
  const [speakingId, setSpeakingId] = useState(null);
  const activeChat = getActiveChat(appData, activeChatId);

  const aiResponse = `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <!-- Apple -->
  <circle cx="200" cy="160" r="25" fill="red" stroke="#333" stroke-width="2"/>
  <line x1="200" y1="135" x2="200" y2="115" stroke="brown" stroke-width="3"/>
  <path d="M205 130 Q215 120 220 128" fill="green"/>

  <!-- Left man -->
  <circle cx="80" cy="100" r="18" fill="#fbb"/>
  <line x1="80" y1="118" x2="80" y2="200" stroke="#333" stroke-width="4" stroke-linecap="round"/>
  <line x1="80" y1="140" x2="155" y2="155" stroke="#333" stroke-width="4" stroke-linecap="round"/>
  <line x1="80" y1="140" x2="45" y2="170" stroke="#333" stroke-width="4" stroke-linecap="round"/>
  <line x1="80" y1="200" x2="50" y2="270" stroke="#333" stroke-width="4" stroke-linecap="round"/>
  <line x1="80" y1="200" x2="110" y2="270" stroke="#333" stroke-width="4" stroke-linecap="round"/>

  <!-- Right man -->
  <circle cx="320" cy="100" r="18" fill="#fbb"/>
  <line x1="320" y1="118" x2="320" y2="200" stroke="#333" stroke-width="4" stroke-linecap="round"/>
  <line x1="320" y1="140" x2="245" y2="155" stroke="#333" stroke-width="4" stroke-linecap="round"/>
  <line x1="320" y1="140" x2="355" y2="170" stroke="#333" stroke-width="4" stroke-linecap="round"/>
  <line x1="320" y1="200" x2="290" y2="270" stroke="#333" stroke-width="4" stroke-linecap="round"/>
  <line x1="320" y1="200" x2="350" y2="270" stroke="#333" stroke-width="4" stroke-linecap="round"/>
</svg>`

  useEffect(() => {
    if (
      activeChatId &&
      activeChatId.toLowerCase() !== "new" &&
      !activeChat
    ) {
      navigate('/chat/new')
    }
  }, [activeChatId, activeChat]);

  if (activeChatId?.toLowerCase() === "new") {
    return (
      <NewChatScreen />
    )
  }
  return (
    <div className={`${sidebar ? "" : "container"} chatBox flex-grow-1 overflow-auto py-3 px-3 custom-scrollbar`}
      style={{
        marginBottom: isMobile && keyboardHeight ? `${keyboardHeight + 60}px` : "56px",
      }}>
      <div className="d-flex flex-column gap-2 px-2 px-lg-5">
        {activeChat?.messages.map(chatItem => (
          <div
            key={chatItem.id}
            className={
              chatItem.role === "user" ?
                "d-flex flex-column align-items-end my-2" :
                "d-flex justify-content-start my-2"}
          >{chatItem.file && (
            <FileCard fileName={chatItem.file} />
          )}

            <ChatItem
              id={chatItem.id}
              role={chatItem.role}
              content={chatItem.content}
              createdAt={chatItem.createdAt}
              speakingId={speakingId}
              setSpeakingId={setSpeakingId}
            />
          </div>
        ))}
        
        {loading && (
          <Loading />
        )}
        {error && (
          <Error error={error} />
        )}

      </div>
    </div>
  )
}

