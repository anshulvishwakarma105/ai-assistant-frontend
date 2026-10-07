import React, { useEffect, useRef, useState } from 'react'
import InputField from '../components/InputField';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
import { Confirmation, CustomiseUserForm, Editor } from '../components/Popups';
import { isMobile, getActiveChat, PageTitle } from "../components/utils";
import { Animation, ChatBoxHeader } from '../components/Common';
import { useNavigate, useParams } from 'react-router-dom';


export default function Chat({ alert, setAlert }) {

  const [animation, setAnimation] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimation(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
    }
  }, [])
  const chats = [
    {
      id: "chat-001",
      title: "React useState vs useReducer",
      createdAt: "2026-10-01T10:20:00.000Z",
      updatedAt: "2026-10-01T10:25:00.000Z",
      messages: [
        {
          id: "msg-001",
          role: "user",
          content: "What is the difference between useState and useReducer in React?",
          file: null,
          isImage: false,
          createdAt: "2026-10-01T10:20:00.000Z"
        },
        {
          id: "msg-002",
          role: "bot",
          content: "useState is ideal for simple state management, while useReducer is useful when state logic involves multiple related actions or complex updates.",
          file: null,
          isImage: false,
          createdAt: "2026-10-01T10:21:00.000Z"
        },
        {
          id: "msg-003",
          role: "user",
          content: "Give me a simple example of useReducer.",
          file: null,
          isImage: false,
          createdAt: "2026-10-01T10:24:00.000Z"
        },
        {
          id: "msg-004",
          role: "bot",
          content: "A todo application is a good example. You can use actions such as ADD, EDIT, DELETE, and TOGGLE to keep all state transitions inside one reducer.",
          file: null,
          isImage: false,
          createdAt: "2026-10-01T10:25:00.000Z"
        }
      ]
    },

    {
      id: "chat-002",
      title: "Explain REST API",
      createdAt: "2026-10-02T08:30:00.000Z",
      updatedAt: "2026-10-02T08:36:00.000Z",
      messages: [
        {
          id: "msg-005",
          role: "user",
          content: "Explain REST API in simple terms.",
          file: null,
          isImage: false,
          createdAt: "2026-10-02T08:30:00.000Z"
        },
        {
          id: "msg-006",
          role: "bot",
          content: "A REST API allows applications to communicate over HTTP using methods such as GET, POST, PUT, and DELETE.",
          file: null,
          isImage: false,
          createdAt: "2026-10-02T08:31:00.000Z"
        },
        {
          id: "msg-007",
          role: "user",
          content: "Show the basic flow.",
          file: null,
          isImage: false,
          createdAt: "2026-10-02T08:35:00.000Z"
        },
        {
          id: "msg-008",
          role: "bot",
          content: "Client → HTTP Request → FastAPI → Business Logic → Database → HTTP Response → Client",
          file: null,
          isImage: false,
          createdAt: "2026-10-02T08:36:00.000Z"
        }
      ]
    },

    {
      id: "chat-003",
      title: "Generate a simple illustration",
      createdAt: "2026-10-03T14:10:00.000Z",
      updatedAt: "2026-10-03T14:15:00.000Z",
      messages: [
        {
          id: "msg-009",
          role: "user",
          content: "Draw view of midnight.",
          file: null,
          isImage: true,
          createdAt: "2026-10-03T14:10:00.000Z"
        },
        {
          id: "msg-010",
          role: "bot",
          content: `<svg viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#05051e"/>
      <stop offset="100%" stop-color="#121240"/>
    </linearGradient>
    <radialGradient id="moonGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="rgba(255,255,220,0.4)"/>
      <stop offset="100%" stop-color="rgba(255,255,220,0)"/>
    </radialGradient>
  </defs>
  
  <rect width="800" height="600" fill="url(#sky)"/>
  
  <g fill="white">
    <circle cx="100" cy="80" r="1.5" opacity="0.9"/>
    <circle cx="250" cy="120" r="1" opacity="0.7"/>
    <circle cx="400" cy="60" r="2" opacity="1"/>
    <circle cx="550" cy="100" r="1.5" opacity="0.8"/>
    <circle cx="700" cy="70" r="1" opacity="0.6"/>
    <circle cx="150" cy="200" r="1" opacity="0.7"/>
    <circle cx="350" cy="180" r="1.5" opacity="0.9"/>
    <circle cx="600" cy="160" r="1" opacity="0.6"/>
    <circle cx="750" cy="190" r="1.5" opacity="0.8"/>
    <circle cx="50" cy="300" r="1" opacity="0.5"/>
    <circle cx="200" cy="280" r="1.5" opacity="0.7"/>
    <circle cx="450" cy="250" r="1" opacity="0.6"/>
    <circle cx="650" cy="270" r="1.5" opacity="0.8"/>
    <circle cx="780" cy="250" r="1" opacity="0.5"/>
  </g>
  
  <circle cx="650" cy="120" r="40" fill="#f0f0c0" opacity="0.9"/>
  <circle cx="650" cy="120" r="80" fill="url(#moonGlow)"/>
  
  <path d="M0 400 L100 300 L200 350 L300 250 L400 320 L500 280 L600 350 L700 300 L800 380 L800 600 L0 600 Z" fill="#0d0d1a"/>
  <path d="M0 460 Q200 410 400 450 T800 430 L800 600 L0 600 Z" fill="#080812"/>
</svg>`,
          file: null,
          isImage: true,
          createdAt: "2026-10-03T14:11:00.000Z"
        }
      ]
    },

    {
      id: "chat-004",
      title: "Python Backend Roadmap",
      createdAt: "2026-10-04T11:00:00.000Z",
      updatedAt: "2026-10-04T11:12:00.000Z",
      messages: [
        {
          id: "msg-011",
          role: "user",
          content: "What should I learn after core Python for backend development?",
          file: null,
          isImage: false,
          createdAt: "2026-10-04T11:00:00.000Z"
        },
        {
          id: "msg-012",
          role: "bot",
          content: "After core Python, focus on HTTP, REST APIs, FastAPI, databases and SQL, authentication, Git, testing, Docker, deployment, and backend system design.",
          file: null,
          isImage: false,
          createdAt: "2026-10-04T11:02:00.000Z"
        },
        {
          id: "msg-013",
          role: "user",
          content: "What should I build first?",
          file: null,
          isImage: false,
          createdAt: "2026-10-04T11:10:00.000Z"
        },
        {
          id: "msg-014",
          role: "bot",
          content: "Build a CRUD REST API with FastAPI and PostgreSQL first. Then add authentication, file uploads, background tasks, and deployment.",
          file: null,
          isImage: false,
          createdAt: "2026-10-04T11:12:00.000Z"
        }
      ]
    },

    {
      id: "chat-005",
      title: "Create a landscape",
      createdAt: "2026-10-05T16:40:00.000Z",
      updatedAt: "2026-10-05T16:47:00.000Z",
      messages: [
        {
          id: "msg-015",
          role: "user",
          content: "Create a simple mountain landscape.",
          file: null,
          isImage: true,
          createdAt: "2026-10-05T16:40:00.000Z"
        },
        {
          id: "msg-016",
          role: "bot",
          content: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#e3f2fd"></rect>
  <circle cx="320" cy="70" r="35" fill="#ffd54f"></circle>

  <polygon points="40,250 150,90 260,250" fill="#78909c"></polygon>
  <polygon points="150,90 110,150 145,140 165,165 190,140" fill="#ffffff"></polygon>

  <polygon points="170,250 290,110 400,250" fill="#546e7a"></polygon>
  <polygon points="290,110 250,160 285,150 305,175 330,145" fill="#ffffff"></polygon>

  <rect y="250" width="400" height="50" fill="#81c784"></rect>
  <line x1="0" y1="250" x2="400" y2="250" stroke="#388e3c" stroke-width="3"></line>
</svg>`,
          file: null,
          isImage: true,
          createdAt: "2026-10-05T16:42:00.000Z"
        },
        {
          id: "msg-017",
          role: "user",
          content: "Make another one with a tree.",
          file: null,
          isImage: true,
          createdAt: "2026-10-05T16:46:00.000Z"
        },
        {
          id: "msg-018",
          role: "bot",
          content: `<svg width="400" height="300" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="300" fill="#e8f5e9"></rect>
  <circle cx="320" cy="65" r="35" fill="#fff59d"></circle>

  <polygon points="40,230 145,90 250,230" fill="#607d8b"></polygon>
  <polygon points="150,230 270,105 390,230" fill="#455a64"></polygon>

  <rect x="85" y="180" width="25" height="70" fill="#795548"></rect>
  <circle cx="98" cy="155" r="45" fill="#43a047"></circle>
  <circle cx="70" cy="170" r="30" fill="#4caf50"></circle>
  <circle cx="125" cy="170" r="30" fill="#388e3c"></circle>

  <rect y="230" width="400" height="70" fill="#81c784"></rect>
</svg>`,
          file: null,
          isImage: true,
          createdAt: "2026-10-05T16:47:00.000Z"
        }
      ]
    }
  ];

  let initHistory;
  if (localStorage.getItem("history")) {
    initHistory = JSON.parse(localStorage.getItem("history"))
  } else {
    initHistory = {
      "userInfo": {
        "name": "Alex Morgan",
        "desc": "Prefer concise explanations with practical examples.",
        "preferences": {
          "language": navigator.language || "en-US",
          "timezone": Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
          "chatStyle": "Concise"
        }
      },
      "chats": chats
    }
  }

  // usestates--------
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editor, setEditor] = useState(null);
  const [confirm, setConfirm] = useState(null);
  const [UserForm, setUserForm] = useState(false);
  const [sidebar, setSidebar] = useState(!isMobile)
  const { id } = useParams();
  const navigate = useNavigate();


  const [appData, setAppData] = useState(initHistory)
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(appData))
  }, [appData])

  async function handleAskAi(input, file, generateImage) {
    setError(false);

    let chatId = id;
    let previousMessages = "";

    if (!chatId || chatId.toLowerCase() === "new") {
      chatId = createNewChat(input);
      navigate(`/chat/${chatId}`);
    } else {
      const activeChat = getActiveChat(appData, chatId);

      previousMessages = activeChat?.messages.slice(-5).map(item => ({
        role: item.role,
        content: item.content
      })) || [];
    }

    addChatItem(chatId, "user", input, file?.name ?? null, generateImage);
    setLoading(true);
    const formData = new FormData();

    const prompt = JSON.stringify({
      userInfo: appData.userInfo,
      previousChatHistory: previousMessages,
      currentChatQuestion: input
    });
    formData.append("input", prompt);
    if (file) {
      formData.append("file", file);
    }
    if (generateImage) {
      formData.append("generateImage", generateImage);
    }
    try {
      const response = await fetch(
        "https://ai-assistant-backend-temp.onrender.com/api/chat"
        // "http://127.0.0.1:8000/api/chat"
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
      addChatItem(chatId, "bot", data.response, null, generateImage);
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
  const addChatItem = (activeChatId, role, content, fileName, generateImage) => {
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
                isImage: generateImage,
                createdAt: new Date().toISOString()
              }
            ]
          }
          : chat
      )
    })
    )
  }
  const createNewChat = (input) => {
    const newChatId = crypto.randomUUID();
    const currentTime = new Date().toISOString();
    setAppData(prev => ({
      ...prev,
      chats: [
        ...prev.chats,
        {
          id: newChatId,
          title: input.slice(0, 32) || "New Chat",
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
      bgColor: "success",
      icon: "check-circle-fill"
    })
    if (chatId === id) {
      navigate(`/chat/new`);
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
      icon: "check-circle-fill"
    });
  }
  const handleUserInfoUpdate = (name, desc, language, chatStyle) => {
    setAppData(prev => ({
      ...prev,
      userInfo: {
        name: name,
        desc: desc,
        preferences: {
          "language": language || navigator.language || "en-US",
          "timezone": Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
          chatStyle: chatStyle
        }
      },
    }))

    setAlert({
      message: `You Updated UserInfo Successfully!`,
      bgColor: "success",
      icon: "check-circle-fill"
    });
  }
  const hanleDeleteHistory = () => {
    const defaultAppData = {
      userInfo: {
        name: "Alex Morgan",
        desc: "Prefer concise explanations with practical examples.",
        preferences: {
          "language": navigator.language || "en-US",
          "timezone": Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
          chatStyle: "Concise"
        }
      },
      chats: []
    };
    if (JSON.stringify(appData) === JSON.stringify(defaultAppData)) {
      setAlert({
        message: "Your Chat History is Already Cleared",
        bgColor: "primary",
        icon: "info-circle-fill"
      });
      return;
    }
    setAppData(defaultAppData)
    setAlert({
      message: `Your Chat History Cleared Successfully!`,
      bgColor: "success",
      icon: "check-circle-fill"
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

  if (animation) {
    return (
      <Animation />
    )
  } else {
    return (
      <>
        <PageTitle title="Chat | Ai Twins" />
        <div className="app  d-flex overflow-hidden position-relative">
          <Sidebar
            sidebar={sidebar}
            setSidebar={setSidebar}
            appData={appData}
            activeChatId={id}
            setEditor={setEditor}
            handleRenameChat={handleRenameChat}
            setConfirm={setConfirm}
            handleDeleteChat={handleDeleteChat}
            setUserForm={setUserForm}
            hanleDeleteHistory={hanleDeleteHistory}

          />

          <div className="flex-grow-1 d-flex flex-column w-100  overflow-hidden position-relative">

            <ChatBoxHeader
              sidebar={sidebar}
              setSidebar={setSidebar}
              appData={appData}
              activeChatId={id} />

            <ChatBox
              appData={appData}
              activeChatId={id}
              keyboardHeight={keyboardHeight}
              sidebar={sidebar}
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
          {
            editor &&
            <Editor editor={editor} setEditor={setEditor} setAlert={setAlert} />
          }
          {
            confirm &&
            <Confirmation confirm={confirm} setConfirm={setConfirm} />
          }
          {
            UserForm &&
            <CustomiseUserForm userInfo={appData.userInfo} setUserForm={setUserForm} setAlert={setAlert} UserInfoUpdate={handleUserInfoUpdate} />
          }
        </div >
      </>
    )
  }
}
