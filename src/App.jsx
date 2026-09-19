import React, { useEffect, useState } from 'react'
import InputField from './components/InputField';
import ChatBox from './components/ChatBox';
import Sidebar from './components/Sidebar';
import { Alert, Confirmation, Editor } from './components/Popups';


export default function App() {
  let initItems;
  if (localStorage.getItem("chats")) {
    initItems = JSON.parse(localStorage.getItem("chats"))
  } else {
    initItems = []
  }

  // usestates--------
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editor, setEditor] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [alert, setAlert] = useState(null);
  const [sidebar, setSidebar] = useState(null)
  const [activeChatId, setActiveChatId] = useState(null)


  const [chats, setChats] = useState(initItems)
  useEffect(() => {
    localStorage.setItem("chats", JSON.stringify(chats))
  }, [chats])



  async function handleAskAi(input, file) {
    setError(false);

    let chatId = activeChatId;
    let previousMessages = "";

    if (!chatId) {
      chatId = createNewChat();
      setActiveChatId(chatId);
    } else {
      const activeChat = chats.find(chat => chat.id === chatId);
      previousMessages = activeChat?.messages.slice(-5).map(item =>
        `{${item.role}: ${item.content}}`
      ) || "";
    }

    addChatItem(chatId, "user", input, file?.name ?? null);
    setLoading(true);

    const formData = new FormData();

    let prompt = `Previous Chat History: [${previousMessages}] 
                \nCurrent Chat Question: ${input}`;

    formData.append("input", prompt);

    if (file) {
      formData.append("file", file);
    }


    try {
      const response = await fetch(
        "http://127.0.0.1:8000/api/chat",
        {
          method: "POST",
          body: formData
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || "Something went wrong");
      }

      addChatItem(chatId, "bot", data.response, null);

    } catch (e) {
      console.error("FETCH ERROR:", e);
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }


  const addChatItem = (activeChatId, role, content, fileName) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === activeChatId ?
          {
            ...chat,
            updatedAt: new Date().toISOString(),
            messages: [
              ...chat.messages,

              {
                id: crypto.randomUUID(),
                role: role,
                content: content,
                file: fileName,
                createdAt: new Date().toISOString()
              }

            ]

          }
          : chat
      ))

  }

  const createNewChat = () => {
    const newChatId = crypto.randomUUID();
    const currentTime = new Date().toISOString();
    setChats(prev =>
      [
        ...prev,
        {
          id: newChatId,
          title: "New Chat",
          createdAt: currentTime,
          updatedAt: currentTime,
          messages: []
        }
      ]
    )
    return newChatId
  }

  const handleDeleteChat = (chatId, chatName) => {

    setChats(prev =>
      prev.filter(chat => chat.id !== chatId)
    );
    setAlert(`You Deleted "${chatName}" Successfully!`);
    if (chatId === activeChatId) {
      setActiveChatId(null);
    }
  }
  const handleRenameChat = (chatId, newChatName) => {
    setChats(prev =>
      prev.map(chat =>
        chat.id === chatId ?
          {
            ...chat,
            title: newChatName
          }
          : chat
      )
    );
    setAlert(`You Renamed "${newChatName}" Successfully!`);
  }



  return (

    <div className="app  d-flex overflow-hidden position-relative">
      <Sidebar
        sidebar={sidebar}
        chats={chats}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setEditor={setEditor}
        handleRenameChat={handleRenameChat}
        setConfirm={setConfirm}
        handleDeleteChat={handleDeleteChat}
        setAlert={setAlert}

      />

      <div className="flex-grow-1 d-flex flex-column w-100 overflow-hidden">
        <div className="bg-dark text-light border-bottom p-2 flex-shrink-0 sidebarToggler">
          <button
            className="btn btn-primary"
            onClick={() => setSidebar(prev => !prev)}
          >
            <i className="bi bi-list-nested"></i>
          </button>
        </div>

        <ChatBox
          chats={chats}
          activeChatId={activeChatId}
          error={error}
          loading={loading}
        />

        <InputField onAskAi={handleAskAi} />
      </div>
      {editor &&
        <Editor editor={editor} setEditor={setEditor} />
      }
      {confirm &&
        <Confirmation confirm={confirm} setConfirm={setConfirm} />
      }
      {alert &&
        <Alert message={alert} setAlert={setAlert} />
      }
    </div>

  )
}

