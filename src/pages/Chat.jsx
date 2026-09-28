import React, { useEffect, useRef, useState } from 'react'
import InputField from '../components/InputField';
import ChatBox from '../components/ChatBox';
import Sidebar from '../components/Sidebar';
import { Alert, Confirmation, CustomiseUserForm, Editor } from '../components/Popups';
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
      "chats": []
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

  async function handleAskAi(input, file) {
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

    addChatItem(chatId, "user", input, file?.name ?? null);
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
      icon: "check-circle-fill"
    });
  }
  const hanleDeleteHistory = () => {
    const defaultAppData = {
      userInfo: {
        name: "Alex Morgan",
        desc: "Prefer concise explanations with practical examples.",
        region: "India",
        preferences: {
          language: "English",
          timezone: "Asia/Kolkata",
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
