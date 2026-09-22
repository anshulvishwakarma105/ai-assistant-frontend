import React, { useEffect, useState } from 'react'
import InputField from './components/InputField';
import ChatBox from './components/ChatBox';
import Sidebar from './components/Sidebar';
import { Alert, Confirmation, Editor } from './components/Popups';
import { isMobile } from "./components/utils";

export default function App() {
  let initHistory;
  if (localStorage.getItem("history")) {
    initHistory = JSON.parse(localStorage.getItem("history"))
  } else {
    initHistory = {
      userInfo: {
        name: "Alpha Beta",
        desc: "Be Accurate and Topic Focused.",
        region: "India",
        preferences: {
          language: "English",
          timezone: "Asia/Kolkata",
          chatStyle: "Professional"
        }
      },
      chats: [
        {
          "id": "chat-001",
          "title": "Python Basics",
          "createdAt": "2026-09-21T10:00:00.000Z",
          "updatedAt": "2026-09-21T10:05:00.000Z",
          "messages": [
            {
              "id": "msg-001",
              "role": "user",
              "content": "What is Python?",
              "file": null,
              "createdAt": "2026-09-21T10:00:00.000Z"
            },
            {
              "id": "msg-002",
              "role": "bot",
              "content": "## Python\n\nPython is a **high-level programming language** known for its simple syntax and wide range of uses.\n\nIt is commonly used for:\n- Web development\n- Automation\n- Data analysis\n- Artificial Intelligence\n- Machine Learning",
              "file": null,
              "createdAt": "2026-09-21T10:01:00.000Z"
            }
          ]
        },
        {
          "id": "chat-002",
          "title": "React Basics",
          "createdAt": "2026-09-21T11:00:00.000Z",
          "updatedAt": "2026-09-21T11:05:00.000Z",
          "messages": [
            {
              "id": "msg-003",
              "role": "user",
              "content": "What is React?",
              "file": null,
              "createdAt": "2026-09-21T11:00:00.000Z"
            },
            {
              "id": "msg-004",
              "role": "bot",
              "content": "## React\n\nReact is a **JavaScript library** for building user interfaces.\n\nThe main idea is to create reusable **components** that manage and display UI efficiently.",
              "file": null,
              "createdAt": "2026-09-21T11:01:00.000Z"
            }
          ]
        }
      ]
    }
  }

  // usestates--------
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editor, setEditor] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [alert, setAlert] = useState(null);
  const [sidebar, setSidebar] = useState(null)
  const [activeChatId, setActiveChatId] = useState(null)


  const [appData, setAppData] = useState(initHistory)
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(appData))
  }, [appData])




  async function handleAskAi(input, file) {
    setError(false);

    let chatId = activeChatId;
    let previousMessages = "";

    if (!chatId) {
      chatId = createNewChat();
      setActiveChatId(chatId);
    } else {
      const activeChat = appData.chats.find(chat => chat.id === chatId);
      previousMessages = activeChat?.messages.slice(-5).map(item =>
        `{${item.role}: ${item.content}}`
      ) || "";
    }

    addChatItem(chatId, "user", input, file?.name ?? null);
    setLoading(true);
    const formData = new FormData();

    let prompt = `Info About User : ${JSON.stringify(appData.userInfo)}
                \nPrevious Chat History: [${previousMessages}] 
                \nCurrent Chat Question: ${input}`;

    formData.append("input", prompt);

    if (file) {
      formData.append("file", file);
    }


    try {
      const response = await fetch(
        // "https://ai-assistant-backend-temp.onrender.com/api/chat"
        "http://127.0.0.1:8000/api/chat"
        ,
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
      setTimeout(() => {
        setError(false)
      }, 5000);

    } finally {
      setLoading(false);
    }
  }


  const addChatItem = (activeChatId, role, content, fileName) => {
    setAppData(prev => ({
      ...prev,
      chats: prev.chats.map(chat =>
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
      )
    })
    )
  }
  const createNewChat = () => {
    const newChatId = crypto.randomUUID();
    const currentTime = new Date().toISOString();
    setAppData(prev => ({
      ...prev,
      chats: [
        ...prev.chats,
        {
          id: newChatId,
          title: "New Chat",
          createdAt: currentTime,
          updatedAt: currentTime,
          messages: []
        }
      ]
    })
    )
    return newChatId
  }
  const handleDeleteChat = (chatId, chatName) => {

    setAppData(prev => ({
      ...prev,
      chats: prev.chats.filter(chat => chat.id !== chatId)
    })
    );
    setAlert({
      message: `You Deleted "${chatName}" Successfully!`,
      bgColor: "danger",
      color: "light"
    })
    if (chatId === activeChatId) {
      setActiveChatId(null);
    }
  }
  const handleRenameChat = (chatId, newChatName) => {
    setAppData(prev => ({
      ...prev,
      chats: prev.chats.map(chat =>
        chat.id === chatId ?
          {
            ...chat,
            title: newChatName
          }
          : chat
      )
    })
    );
    setAlert({
      message: `You Renamed "${newChatName}" Successfully!`,
      bgColor: "success",
      color: "light"
    });
  }

// To set inputfiled and chatbox height while keyboard is true
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const viewport = window.visualViewport;
    if (!viewport) return;
    const handleResize = () => {
      const height = window.innerHeight - viewport.height - viewport.offsetTop
      setKeyboardHeight(Math.max(0, height));
    };
    viewport.addEventListener("resize", handleResize);
    return () => {
      viewport.removeEventListener("resize", handleResize);
    };
  }, []);


  //scroll block 
  useEffect(() => {
    const preventPageScroll = () => {
      window.scrollTo(0, 0);
    };
    document.addEventListener("scroll", preventPageScroll, { passive: false });
    return () => {
      document.removeEventListener("scroll", preventPageScroll);
    };
  }, []);



  return (

    <div className="app  d-flex overflow-hidden position-relative">
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        appData={appData}
        activeChatId={activeChatId}
        setActiveChatId={setActiveChatId}
        setEditor={setEditor}
        handleRenameChat={handleRenameChat}
        setConfirm={setConfirm}
        handleDeleteChat={handleDeleteChat}

      />

      <div className="flex-grow-1 d-flex flex-column w-100 overflow-hidden position-relative">
        <div className="bg-dark text-light border-bottom p-2 flex-shrink-0 sidebarToggler">
          <button
            className="btn btn-primary"
            onClick={() => setSidebar(prev => !prev)}
          >{(sidebar && isMobile) ?
            <i className="bi bi-x-lg"></i> :
            <i className="bi bi-list-nested"></i>}
          </button>
        </div>

        <ChatBox
          appData={appData}
          activeChatId={activeChatId}
          keyboardHeight={keyboardHeight}
          error={error}
          loading={loading}
        />

        <InputField 
        keyboardHeight={keyboardHeight}
        onAskAi={handleAskAi} 
        loading={loading} 
        setAlert={setAlert}
         />
      </div>
      {editor &&
        <Editor editor={editor} setEditor={setEditor} setAlert={setAlert} />
      }
      {confirm &&
        <Confirmation confirm={confirm} setConfirm={setConfirm} />
      }
      {alert &&
        <Alert alert={alert} setAlert={setAlert} />
      }
    </div>

  )
}

