import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { isMobile, getActiveChat, PageTitle } from '../components/Calculations';
import Animation from '../components/screens/Animation';
import ChatBox from '../components/screens/chatScreen/ChatBox';
import ChatBoxHeader from '../components/screens/chatScreen/ChatBoxHeader';
import InputField from '../components/screens/chatScreen/InputField';
import Sidebar from '../components/screens/chatScreen/Sidebar';
import { Confirmation, Editor, CustomiseUserForm } from '../components/PopComponents';

export default function Chat({ setAlert }) {

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
        "preferences": {
          "language": navigator.language || "en-US",
          "timezone": Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Kolkata",
          "chatStyle": "Concise"
        }
      },
      "chats": []
    }
  }

  // usestates--------
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
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
    setError(null);

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
    setLoading(chatId);
    const formData = new FormData();
    let prompt = JSON.stringify({
      userInfo: appData.userInfo,
      previousChatHistory: previousMessages,
      currentChatQuestion: input
    });
    if (file) {
      formData.append("file", file);
      prompt = JSON.stringify({
        previousChatHistory: previousMessages,
        currentChatQuestion: input
      });
    }
    if (generateImage) {
      formData.append("generateImage", String(generateImage));
      prompt = JSON.stringify({
        previousChatHistory: previousMessages,
        currentChatQuestion: input
      });
    }
    formData.append("input", prompt);
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
      setError({
        chatId: chatId,
        message: e.message
      });
    } finally {
      setLoading(null);
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
                setAlert={setAlert}
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
