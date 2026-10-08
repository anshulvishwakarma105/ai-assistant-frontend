import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import ChatItemOperation from './ChatItemOperation';
import { CopyBtn, SvgImage } from './RenderComponents';

const ChatItem = ({ id, role, content, isImage, createdAt, speakingId, setSpeakingId, setAlert }) => {
    const svgMatches = content?.match(/<svg[\s\S]*?<\/svg>/gi);
    return (
        <>
            {role === "user" ?
                (<div>
                    <div
                        className='bg-primary text-white border rounded chat-message px-3 py-2'
                        id={`chatId-${id}`}>
                        {content}
                    </div>
                    <div className="d-flex align-items-center justify-content-end text-secondary small mt-1 px-1">
                        <CopyBtn text={content} />
                        {createdAt
                            ? new Date(createdAt).toLocaleTimeString([], {
                                hour: "numeric",
                                minute: "2-digit"
                            }) : ""}
                    </div>
                </div>) :
                (<>
                    {content ?
                        <div className='d-flex flex-column'>
                            <div
                                className='d-flex flex-column border-start border-3 border-secondary text-dark chat-message px-3 py-2'
                                id={`chatId-${id}`}>
                                {isImage?
                                    (svgMatches?.map((svg, index) => (
                                        <div key={index}>
                                            <div className="d-block fw-semibold">{index === 0 ? "" : `${index + 1}.`} Svg Image</div>
                                            <SvgImage svg_code={svg} />
                                        </div>))):
                                (<ReactMarkdown remarkPlugins={remarkGfm} rehypePlugins={rehypeHighlight}>
                                    {content}
                                </ReactMarkdown>)
                                }
                            </div>
                            <ChatItemOperation
                                id={id}
                                svg={svgMatches?.[0]}
                                text={content}
                                speakingId={speakingId}
                                setSpeakingId={setSpeakingId}
                                isImage={isImage}
                                setAlert={setAlert}
                            />
                        </div> :
                        <span className="px-3 py-0 text-muted fst-italic"> <i className="bi bi-ban me-1"></i>Something went wrong nothing to show</span>
                    }
                </>)}
        </>)
}

export default ChatItem
