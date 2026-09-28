import React, { useEffect, useState } from 'react';
import ChatItem from './ChatItem';
import { Loading, Error, FileCard, NewChatScreen } from './Common';
import { getActiveChat, isMobile } from "./utils";
import { useNavigate } from 'react-router-dom';

export default function ChatBox({ appData, activeChatId, setAlert, keyboardHeight, error, loading }) {
  const navigate = useNavigate()
  const [speakingId, setSpeakingId] = useState(null);
  const activeChat = getActiveChat(appData, activeChatId);
  
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
    <div className="chatBox flex-grow-1 overflow-auto py-3 px-3 "
      style={{
        marginBottom: isMobile && keyboardHeight ? `${keyboardHeight + 60}px` : "52px",
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

