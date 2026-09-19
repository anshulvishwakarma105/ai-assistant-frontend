import React from 'react';
import ChatItem from './ChatItem';
import { Loading, Error, FileCard } from './Common';

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
      <div className="d-flex flex-column gap-2 px-5">
        {activeChat?.messages.map(chat => (
          <div
            key={chat.id}
            className={
              chat.role === "user" ?
                "d-flex flex-column align-items-end my-2" :
                "d-flex justify-content-start my-2"}
          >{chat.file && (
            <FileCard fileName={chat.file}  />
          )}

            <ChatItem role={chat.role} content={chat.content} />
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

