import ReactMarkdown from "react-markdown";
import ChatItemOperation from './ChatItemOperation';
import { SvgImage } from './Common';

const ChatItem = ({ id, role, content, createdAt, speakingId, setSpeakingId }) => {
    const svgMatch = content?.match(/<svg[\s\S]*?<\/svg>/i);
    const textContent = svgMatch ? content.replace(svgMatch[0], "") : content;
    return (
        <>
            {role === "user" ?
                (<div>
                    <div
                        className='bg-primary text-white border rounded chat-message px-3 py-2'
                        id={`chatId-${id}`}>
                        {content}
                    </div>
                    <div className="text-secondary text-end small mt-1 px-1">
                        {createdAt
                            ? new Date(createdAt).toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit"
                            }) : ""}
                    </div>
                </div>) :
                (<>
                <div className='d-flex flex-column'>
                    <div
                        className='d-flex flex-column border-start border-3 border-secondary text-dark chat-message px-3 py-2'
                        id={`chatId-${id}`}>
                        <ReactMarkdown>
                            {textContent}
                        </ReactMarkdown>
                        {svgMatch && (
                            <SvgImage svg_code={svgMatch} />
                        )}
                    </div>
                    <ChatItemOperation
                        id={id}
                        text={content}
                        speakingId={speakingId}
                        setSpeakingId={setSpeakingId}
                    />
                    </div>
                </>)}
        </>)
}

export default ChatItem
