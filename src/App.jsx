import React, { useEffect, useState } from 'react'
import InputField from './components/InputField';
import ChatBox from './components/ChatBox';
import Sidebar from './components/Sidebar';
import { Alert, Confirmation, CustomiseUserForm, Editor } from './components/Popups';
import { isMobile } from "./components/utils";

export default function App() {
  let initHistory;
  if (localStorage.getItem("history")) {
    initHistory = JSON.parse(localStorage.getItem("history"))
  } else {
    initHistory = {
      "userInfo": {
        "name": "Alex Morgan",
        "desc": "Prefer concise explanations with practical examples.",
        "region": "India",
        "preferences": {
          "language": "English",
          "timezone": "Asia/Kolkata",
          "chatStyle": "Concise"
        }
      },
      "chats": [
        {
          "id": "chat-003",
          "title": "FastAPI Backend",
          "createdAt": "2026-09-22T09:00:00.000Z",
          "updatedAt": "2026-09-22T09:15:00.000Z",
          "messages": [
            {
              "id": "msg-005",
              "role": "user",
              "content": "How does FastAPI handle requests?",
              "file": null,
              "createdAt": "2026-09-22T09:00:00.000Z"
            },
            {
              "id": "msg-006",
              "role": "bot",
              "content": "FastAPI is a modern Python web framework for building APIs. It uses Python type hints for request validation and automatic API documentation.",
              "file": null,
              "createdAt": "2026-09-22T09:01:00.000Z"
            },
            {
              "id": "msg-007",
              "role": "user",
              "content": "What is the difference between FastAPI and Flask?",
              "file": null,
              "createdAt": "2026-09-22T09:10:00.000Z"
            },
            {
              "id": "msg-008",
              "role": "bot",
              "content": "FastAPI provides built-in request validation, type hints, automatic OpenAPI documentation, and strong support for asynchronous programming. Flask is a lightweight WSGI framework with a simpler core and a larger ecosystem of extensions.",
              "file": null,
              "createdAt": "2026-09-22T09:11:00.000Z"
            }
          ]
        },
        {
          "id": "chat-004",
          "title": "React State Management",
          "createdAt": "2026-09-22T10:00:00.000Z",
          "updatedAt": "2026-09-22T10:12:00.000Z",
          "messages": [
            {
              "id": "msg-009",
              "role": "user",
              "content": "What is useState in React?",
              "file": null,
              "createdAt": "2026-09-22T10:00:00.000Z"
            },
            {
              "id": "msg-010",
              "role": "bot",
              "content": "useState is a React Hook that lets a functional component store and update state. Updating the state causes the component to re-render with the new value.",
              "file": null,
              "createdAt": "2026-09-22T10:01:00.000Z"
            },
            {
              "id": "msg-011",
              "role": "user",
              "content": "When should I use useEffect?",
              "file": null,
              "createdAt": "2026-09-22T10:10:00.000Z"
            },
            {
              "id": "msg-012",
              "role": "bot",
              "content": "useEffect is used to synchronize a component with external systems such as APIs, browser events, timers, subscriptions, and other side effects.",
              "file": null,
              "createdAt": "2026-09-22T10:11:00.000Z"
            }
          ]
        },
        {
          "id": "chat-005",
          "title": "Python AI Projects",
          "createdAt": "2026-09-22T11:00:00.000Z",
          "updatedAt": "2026-09-22T11:08:00.000Z",
          "messages": [
            {
              "id": "msg-013",
              "role": "user",
              "content": "Suggest some AI projects using Python.",
              "file": null,
              "createdAt": "2026-09-22T11:00:00.000Z"
            },
            {
              "id": "msg-014",
              "role": "bot",
              "content": "You can build projects such as an AI document assistant, resume-job matching system, RAG chatbot, code review assistant, or an AI-powered knowledge base.",
              "file": null,
              "createdAt": "2026-09-22T11:01:00.000Z"
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
  const [UserForm, setUserForm] = useState(false);
  const [sidebar, setSidebar] = useState(!isMobile)
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
      previousMessages = activeChat?.messages.slice(-5).map(item => ({
        role: item.role,
        content: item.content
      })) || [];
    }

    addChatItem(chatId, "user", input, file?.name ?? null);
    setLoading(true);
    const formData = new FormData();

    const prompt = JSON.stringify({
      userInfo: appData.userInfo,
      previousChatHistory: previousMessages,
      currentChatQuestion: input
    });
    console.log(prompt)

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
  const handleUserInfoUpdate = (name, desc, region, language, timeZone, chatStyle) => {
    setAppData(prev => ({
      ...prev,
      userInfo: {
        name: name,
        desc: desc,
        region: region,
        preferences: {
          language: language,
          timezone: timeZone,
          chatStyle: chatStyle
        }
      },
    }))
     setAlert({
      message: `You Updated UserInfo Successfully!`,
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
        setUserForm={setUserForm}

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
      {UserForm &&
        <CustomiseUserForm userInfo={appData.userInfo} setUserForm={setUserForm} setAlert={setAlert} UserInfoUpdate={handleUserInfoUpdate}/>
      }
    </div>

  )
}

