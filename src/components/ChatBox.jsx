import React, { useState } from 'react';
import ChatItem from './ChatItem';
import { Loading, Error, FileCard } from './Common';

export default function ChatBox({ chats, activeChatId, error, loading }) {
  const [speakingId, setSpeakingId] = useState(null)
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
    <div className="chatBox flex-grow-1 overflow-auto py-3 px-3 "
      style={{
        marginBottom: "52px"
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

