import { useEffect } from "react";

const isMobile = window.innerWidth <= 767.98;

const getActiveChat = (appData, chatId) => {
    return appData.chats.find(chat => chat.id === chatId);
}
const PageTitle = ({title}) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
}

export {isMobile, getActiveChat, PageTitle}