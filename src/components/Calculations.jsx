import { useEffect } from "react";

const PageTitle = ({ title }) => {
    useEffect(() => {
        document.title = title;
    }, [title]);

    return null;
}
const isMobile = window.innerWidth <= 767.98;

const getActiveChat = (appData, chatId) => {
    return appData.chats.find(chat => chat.id === chatId);
}

const cleanMarkdown = (markdownText) => {
    return markdownText
        .replace(/```[\s\S]*?```/g, "")
        .replace(/`([^`]+)`/g, "$1")
        .replace(/^#{1,6}\s+/gm, "")
        .replace(/[*_~]/g, "")
        .replace(/^\s*[-*+]\s+/gm, "")
        .replace(/^\s*\d+\.\s+/gm, "")
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
        .replace(/\n{2,}/g, "\n")
        .trim();
};

const removeSvg = (svg, text) => {
    return svg
        ? text.replace(/<svg[\s\S]*?<\/svg>/gi, "").trim()
        : text;
};

export { PageTitle, isMobile, getActiveChat, cleanMarkdown, removeSvg }