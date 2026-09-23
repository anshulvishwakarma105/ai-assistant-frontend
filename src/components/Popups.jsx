import React, { useEffect, useState } from 'react'

function Editor({ editor, setEditor, setAlert }) {
  const [newTitle, setNewTitle] = useState(editor.chatName)
  const handleEditorSubmit = () => {
    if (!newTitle.trim()) {
      setAlert({
        message: "New Title Cannot Be Empty.",
        bgColor: "danger",
        color: "light"
      });
      return;
    }
    if (newTitle.trim() === editor.chatName) {
      setAlert({
        message: "New Title Should Be Unique.",
        bgColor: "danger",
        color: "light"
      });
      return;
    }
    editor.action(editor.chatId, newTitle);
    setEditor(null);
  }
  return (
    <>
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
        style={{ zIndex: 60 }}></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="position-absolute top-50 start-50 translate-middle
       bg-dark border border-secondary rounded-3 text-light px-3 py-3
       d-flex flex-column align-items-center justify-content-center gap-3 
       shadow popup-animation"
        style={{
          minWidth: "160px",
          zIndex: "3000"
        }}
      >
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="form-control"
          id="renameChat"
          aria-describedby="renameChat" />

        <div className=" w-100 d-flex justify-content-center gap-2">
          <button
            className="btn btn-sm btn-primary w-100"
            onClick={handleEditorSubmit}
          >
            {editor.title}
          </button>
          <button
            type='button'
            onClick={() => setEditor(null)}
            className="btn btn-sm btn-secondary w-100"
          >
            Cancel
          </button>

        </div>
      </div>
    </>
  )
}

function Confirmation({ confirm, setConfirm }) {
  return (
    <>
      <div className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
        style={{ zIndex: 60 }}></div>
      <div
        onClick={(e) => e.stopPropagation()}
        className="position-absolute top-50 start-50 translate-middle
       bg-dark border border-secondary rounded-3 text-light px-4 py-3 
       d-flex flex-column align-items-center justify-content-center gap-3 
       shadow popup-animation"
        style={{
          minWidth: "160px",
          zIndex: "3000"
        }}
      >
        <div className="text-center">{confirm.message}</div>

        <div className=" w-100 d-flex justify-content-center gap-2">
          <button
            type='button'
            className="btn btn-sm btn-danger w-100"
            onClick={() => {
              confirm.action();
              setConfirm(null);
            }}
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
    <div
      className={`position-fixed top-0 start-50 
      translate-middle-x mt-5 px-3 py-2 bg-${alert.bgColor}
      text-${alert.color} border border-secondary rounded-3 
      shadow d-flex align-items-start justify-content-center gap-2 popup-animation `}
      style={{
        minWidth: "260px",
        zIndex: "3000"
      }}>
      <i className="bi bi-info-circle "></i>
      <span>{alert.message}</span>
    </div>
  )
}
function ChatOperations({ chatId, chatName, setChatOperations, setEditor, handleRenameChat, setConfirm, handleDeleteChat }) {
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
      message: `Are you sure Want to delete "${chatName}" `,
      action: () => handleDeleteChat(chatId, chatName)
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
        className="btn btn-sm text-light w-100 text-start py-2 px-2 rounded-2"
        onClick={handleRenameBtn}
      >
        <i className="bi bi-pencil me-2"></i>
        Rename
      </button>

      <button
        className="btn btn-sm text-danger w-100 text-start py-2 px-2 rounded-2 border-top border-secondary mt-1"
        onClick={handleDeleteBtn}
      >
        <i className="bi bi-trash me-2"></i>
        Delete
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
        bgColor: "info",
        color: "dark"
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
       d-flex flex-column align-items-center justify-content-center gap-3 
       shadow popup-animation"
        style={{
          minWidth: "260px",
          zIndex: "3000"
        }}
      >

        <form onSubmit={handleUserFormSubmit}>
          <div className='d-flex flex-column gap-3 pb-3'>
            <div className="form-floating ">
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="form-control" id="floatingInput" placeholder="Alex Adams" />
              <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating">
              <textarea value={desc} onChange={(e) => setDesc(e.target.value)} className="form-control" placeholder="Tell your preferences & interestes." id="floatingTextarea2" style={{ minHeight: "60px", maxHeight: "140px" }}></textarea>
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


