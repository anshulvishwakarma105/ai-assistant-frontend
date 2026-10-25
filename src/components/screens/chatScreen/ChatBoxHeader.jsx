import { getActiveChat, isMobile } from "../../Calculations";

export default function ChatBoxHeader({ sidebar, setSidebar, appData, activeChatId }) {
    const activeChat = getActiveChat(appData, activeChatId);
    return (
        <div className="bg-dark text-light border-bottom p-2  
                  d-flex align-items-center justify-content-between flex-shrink-0 chatbox-header">

            <button
                className={`btn btn-${(sidebar && isMobile)? "danger": "primary ms-lg-3"}`}
                title={sidebar? "close sidebar":"open sidebar"}
                onClick={() => setSidebar(prev => !prev)}
            >{(sidebar && isMobile) ?
                <i className="bi bi-x-lg "></i> :
                <i className="bi bi-list-nested"></i>}
            </button>
            <div className="d-flex align-items-baseline gap-2 me-3 ms-3 ms-lg-0 text-truncate">
                <span className="d-none d-sm-inline text-success ">Current Chat :</span>
                <span className='text-truncate'>{activeChat?.title ?? "New Chat"}</span>
                <i className="bi bi-chevron-bar-down "></i>
            </div>
        </div>
    )
}