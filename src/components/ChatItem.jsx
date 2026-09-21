import React, { useState } from 'react'
import ReactMarkdown from "react-markdown";
import ChatItemOperation from './ChatItemOperation';

const ChatItem = ({ id, role, content, createdAt, speakingId, setSpeakingId }) => {

    return (
        <div>
            <div className={`${role === "user" ?
                "bg-primary text-white border rounded" :
                "border-start border-3 border-secondary text-dark"} 
            chat-message px-3 py-2`}>
                {role === "user" ?
                    <div id={`chatId-${id}`}>{content}</div> :
                    <div id={`chatId-${id}`}>
                        <ReactMarkdown>
                            {content}
                        </ReactMarkdown>
                    </div>}
            </div>
            {role === "user" && (
                <div className="text-secondary text-end small mt-1 px-1">
                    {createdAt
                        ? new Date(createdAt).toLocaleTimeString([], {
                            hour: "numeric",
                            minute: "2-digit"
                        })
                        : ""}

                </div>
            )}
            {role === "bot" && (
                <ChatItemOperation 
                id={id} 
                text={content}
                speakingId={speakingId}
                setSpeakingId={setSpeakingId}
                />
            )}
        </div>
    )
}

export default ChatItem
