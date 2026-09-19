import React from 'react'
import ReactMarkdown from "react-markdown";

const ChatItem = ({role, content}) => {
    return (
        <div className=
            {role === "user" ?
                "chat-message bg-primary text-white border rounded  px-3 py-2" :
                "chat-message border-start border-3 border-secondary text-dark px-3 py-2 "}>
            {role === "bot" ?
                <ReactMarkdown>
                    {content}
                </ReactMarkdown>
                : content}
        </div>
    )
}

export default ChatItem
