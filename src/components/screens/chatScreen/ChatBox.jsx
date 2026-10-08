import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatItem from '../../ChatItem';
import NewChatScreen from '../NewChatScreen';
import { Loading, Error } from '../../PopComponents';
import { FileCard } from '../../RenderComponents';
import { getActiveChat, isMobile } from "../../Calculations";

export default function ChatBox({ appData, activeChatId, keyboardHeight, sidebar, error, loading, setAlert}) {
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
              isImage={chatItem.isImage}
              createdAt={chatItem.createdAt}
              speakingId={speakingId}
              setSpeakingId={setSpeakingId}
               setAlert={setAlert}
            />
          </div>
        ))}
        
        {loading === activeChatId && (
          <Loading />
        )}
        {error?.chatId === activeChatId && (
          <Error error={error.message} />
        )}

      </div>
    </div>
  )
}

