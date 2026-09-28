import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Editor({ editor, setEditor, setAlert }) {

  const [newTitle, setNewTitle] = useState(editor.chatName)
  const handleEditorSubmit = (e) => {
    e.preventDefault()
    if (!newTitle.trim()) {
      setAlert({
        message: "New Title Cannot Be Empty.",
        bgColor: "warning",
        icon: "exclamation-triangle-fill"
      });
      return;
    }
    if (newTitle.trim() === editor.chatName) {
      setAlert({
        message: "New Title Should Be Unique.",
        bgColor: "warning",
        icon: "exclamation-triangle-fill"
      });
      return;
    }
    editor.action(editor.chatId, newTitle);
    setEditor(null);
  }
  return (
    <>
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 "
        style={{ zIndex: 60 }}></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="position-absolute top-50 start-50 translate-middle
       bg-dark border border-secondary rounded-3 
       shadow popup-animation "
        style={{
          zIndex: "3000"
        }}
      >
        <form className='text-light px-3 py-3
       d-flex flex-column align-items-center justify-content-evenly  gap-3 popup-width ' onSubmit={handleEditorSubmit}>
          <div className="form-floating w-100">
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="form-control"
              id="renameChat"
              placeholder="New Title"
              aria-describedby="renameChat"
            />
            <label htmlFor="renameChat">New Title</label>
          </div>


          <div className=" w-100 d-flex justify-content-center gap-2">
            <button
              type='submit'
              className="btn btn-sm btn-primary w-100 "
            >
              {editor.title}
            </button>
            <button
              type='button'
              onClick={() => setEditor(null)}
              className="btn btn-sm btn-secondary w-100 "
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </>
  )
}
function Confirmation({ confirm, setConfirm }) {
  const handleConfirmSubmit = (e) => {
    e.preventDefault();
    confirm.action();
    setConfirm(null);
  }
  return (
    <>
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
        style={{ zIndex: 60 }}></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="position-absolute top-50 start-50 translate-middle
       bg-dark border border-secondary rounded-3 
       shadow popup-animation "
        style={{
          zIndex: "3000"
        }}
      >
        <form className='text-light px-4 py-3 
       d-flex flex-column align-items-center justify-content-evenly gap-3 popup-width'
          onSubmit={handleConfirmSubmit} >
          <div className="text-center">{confirm.message}</div>

          <div className=" w-100 d-flex justify-content-center gap-2">
            <button
              type='submit'
              className="btn btn-sm btn-danger w-100"
            >
              {confirm.title}
            </button>
            <button
              type='button'
              onClick={() => setConfirm(null)}
              className="btn btn-sm btn-secondary w-100"
            >
              Cancel
            </button>

          </div>
        </form>
      </div>
    </>
  )
}
function Alert({ alert, setAlert }) {
  useEffect(() => {
    if (!alert) return;

    const timer = setTimeout(() => {
      setAlert(null)
    }, 5000);

    return () => clearTimeout(timer)
  }, [alert, setAlert])

  return (
    <div className={`position-fixed top-0 start-50 
      translate-middle-x mt-5 alert alert-${alert.bgColor} d-flex align-items-center`} role="alert" style={{
        minWidth: "260px",
        zIndex: "3000"
      }}>
      <i className={`bi bi-${alert.icon} me-2`}></i>
      <div>
        {alert.message}
      </div>
    </div>
  )
}
function ChatOperations({ chatId, chatName, setChatOperations, setEditor, handleRenameChat, setConfirm, handleDeleteChat }) {
  const navigate = useNavigate();
  const handleRenameBtn = () => {
    setEditor({
      title: "Rename",
      action: handleRenameChat,
      chatId: chatId,
      chatName: chatName
    })
    setChatOperations(null);

  }
  const handleDeleteBtn = () => {
    setConfirm({
      title: "Delete",
      message: `Are you sure Want to delete "${chatName}"?`,
      action: () => handleDeleteChat(chatId, chatName)
    })

    setChatOperations(null);
  }
  const handleReportBtn = () => {
    setConfirm({
      title: "Report",
      message: `Tell us through the Feedback form what's wrong with this chat: "${chatName}"?`,
      action: () => navigate('/feedback', {
        state: {
          type: "Report",
          message: `Something is Wrong with this Chat.
          Chat_Id : ${chatId},
          Chat_Name : ${chatName},
          So I want to report.`
        }
      })
    })

    setChatOperations(null);
  }
  return (
    <div
      className="position-absolute top-50 start-100 translate-middle-y 
     ms-2 py-2 px-2 
    bg-dark border border-secondary 
    rounded-3 shadow popup-animation
    d-flex flex-column"
      onClick={(e) => e.stopPropagation()}
      style={{
        zIndex: 3000,
        minWidth: "80px"
      }}
    >
      <button
        className="btn btn-sm text-light w-100 text-start py-2 px-2 rounded-2 my-1"
        onClick={handleRenameBtn}
      >
        <i className="bi bi-pencil me-2"></i>
        Rename
      </button>
      <div className="border-top border-secondary"></div>
      <button
        className="btn btn-sm text-danger w-100 text-start rounded-2 py-2 px-2 my-1"
        onClick={handleDeleteBtn}
      >
        <i className="bi bi-trash me-2"></i>
        Delete
      </button>
      <div className="border-top border-secondary"></div>
      <button
        className="btn btn-sm text-warning w-100 text-start rounded-2 py-2 px-2 my-1 "
        onClick={handleReportBtn}
      >
        <i className="bi bi-exclamation-triangle  me-2"></i>
        Report
      </button>
    </div>
  )
}
function CustomiseUserForm({ userInfo, setUserForm, setAlert, UserInfoUpdate }) {
  const [name, setName] = useState(userInfo.name)
  const [desc, setDesc] = useState(userInfo.desc)
  const [chatStyle, setChatStyle] = useState(userInfo.chatStyle)
  const [language, setLanguage] = useState(userInfo.language)
  const [region, setRegion] = useState(userInfo.region)
  const [timeZone, setTimeZone] = useState(userInfo.timeZone)


  const handleUserFormSubmit = (e) => {
    e.preventDefault();
    if (userInfo.name === name &&
      userInfo.desc === desc &&
      userInfo.chatStyle === chatStyle &&
      userInfo.language === language &&
      userInfo.region === region &&
      userInfo.timeZone === timeZone
    ) {
      setAlert({
        message: `Somthing should be Different to Update`,
        bgColor: "warning",
        icon: "exclamation-triangle-fill"
      });
    } else {
      UserInfoUpdate(name, desc, region, language, timeZone, chatStyle);
      setUserForm(false);
    }
  }
  return (
    <>
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 "
        style={{ zIndex: 60 }}></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="position-absolute top-50 start-50 translate-middle
       bg-dark border border-secondary rounded-3 text-light px-4 py-4
       d-flex flex-column align-items-center justify-content-center gap-2
       shadow popup-animation"
        style={{
          minWidth: "260px",
          zIndex: "3000"
        }}
      >
        <h4>User Info</h4>
        <form onSubmit={handleUserFormSubmit}>
          <div className='d-flex flex-column gap-3 pb-3'>
            <div className="form-floating ">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="floatingInput" placeholder="Alex Mayers" />
              <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating">
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" placeholder="Tell your preferences & interestes." id="floatingTextarea2" style={{ minHeight: "60px", maxHeight: "120px" }}></textarea>
              <label htmlFor="floatingTextarea2">Description</label>
            </div>
            <div className='bg-light text-dark py-2  px-2 rounded '>
              <span className='text-secondary'>Chat Style</span>
              <div className='d-flex justify-content-between  gap-2 mt-2'>
                <div className="form-check ">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Frank" checked={chatStyle === "Frank"} onChange={(e) => setChatStyle(e.target.value)} />
                  <label className="form-check-label" htmlFor="inlineRadio1">Frank</label>
                </div>
                <div className="form-check ">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Detailed" checked={chatStyle === "Detailed"} onChange={(e) => setChatStyle(e.target.value)} />
                  <label className="form-check-label" htmlFor="inlineRadio2">Detailed</label>
                </div>
                <div className="form-check ">
                  <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="Concise" checked={chatStyle === "Concise"} onChange={(e) => setChatStyle(e.target.value)} />
                  <label className="form-check-label" htmlFor="inlineRadio3">Concise</label>
                </div>
              </div>
            </div>
            <div className='d-flex gap-2 '>
              <select className="form-select" aria-label="Time Zone" value={timeZone} onChange={(e) => setTimeZone(e.target.value)} >
                <option value="Asia/Kolkata">Time Zone</option>
                <option value="Asia/Kolkata">Asia/Kolkata</option>
                <option value="America/New_York">America/New_York</option>
                <option value="Europe/London">Europe/London</option>
              </select>

              <select className="form-select" aria-label="Language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                <option value="English">Language</option>
                <option value="Hindi">Hindi</option>
                <option value="English">English</option>
                <option value="Hinglish">Hinglish</option>
              </select>
            </div>
            <div className="d-flex gap-2 align-items-center">
              <div className="">
                <label htmlFor="inputPassword6" className="col-form-label bg-light text-dark rounded px-2">Region</label>
              </div>
              <div className="w-100">
                <input type="text" className="form-control" aria-describedby="region" value={region} onChange={(e) => setRegion(e.target.value)} />
              </div>
            </div>

          </div>
          <div className=" w-100 d-flex justify-content-center gap-2">
            <button
              type='submit'
              className="btn btn-sm btn-success w-100"
            >
              Update
            </button>
            <button
              type='button'
              onClick={() => setUserForm(null)}
              className="btn btn-sm btn-secondary w-100"
            >
              Cancel
            </button>

          </div>
        </form >
      </div>
    </>
  )
}

export { CustomiseUserForm, Editor, Confirmation, Alert, ChatOperations }


