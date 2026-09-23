export const isMobile = window.innerWidth <= 767.98;

export const getActiveChat = (appData, chatId) => {
    return appData.chats.find(chat => chat.id === chatId);
}