import React, { useEffect, useState } from 'react'

function Editor({ editor, setEditor }) {
  const [newTitle, setNewTitle] = useState(editor.chatName)
  const handleEditorSubmit = () => {
    if (!newTitle.trim()) return;
    if (newTitle === editor.chatName) return;
    console.log("pass to function")
    editor.action(editor.chatId, newTitle);
    setEditor(null);
  }
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="position-absolute top-50 start-50 translate-middle bg-dark border border-secondary rounded-3 text-light px-4 py-3 d-flex flex-column align-items-center justify-content-center gap-3 shadow popup-animation"
    >
      <input
        type="text"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
        className="form-control"
        id="renameChat"
        aria-describedby="renameChat" />

      <div className=" w-100 d-flex justify-content-evenly">
        <button
          className="btn btn-sm btn-danger"
          onClick={handleEditorSubmit}
        >
          {editor.title}
        </button>
        <button
          type='button'
          onClick={() => setEditor(null)}
          className="btn btn-sm btn-secondary"
        >
          Cancel
        </button>

      </div>
    </div>
  )
}

function Confirmation({ confirm, setConfirm }) {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="position-absolute top-50 start-50 translate-middle bg-dark border border-secondary rounded-3 text-light px-4 py-3 d-flex flex-column align-items-center justify-content-center gap-3 shadow popup-animation"
    >
      <div className="text-center">{confirm.message}</div>

      <div className=" w-100 d-flex justify-content-evenly">
        <button
          type='button'
          className="btn btn-sm btn-danger"
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
          className="btn btn-sm btn-secondary"
        >
          Cancel
        </button>

      </div>
    </div>
  )
}


function Alert({ message, setAlert }) {
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setAlert(null)
    }, 5000);

    return () => clearTimeout(timer)
  }, [message, setAlert])

  return (
    <div
      className="position-fixed top-0 start-50 
      translate-middle-x mt-5 px-3 py-2 bg-success
      text-light border border-secondary rounded-3 
      shadow d-flex align-items-center gap-2 popup-animation">
      <i className="bi bi-info-circle text-dark"></i>
      <span>{message}</span>
    </div>
  )
}
function ChatOperations({ chatId, chatName, setChatOperations, setEditor, handleRenameChat, setConfirm, handleDeleteChat, setAlert }) {
  const handleRenameBtn = () => {
    setEditor({
      title: "Rename Chat",
      action: handleRenameChat,
      chatId: chatId,
      chatName: chatName
    })
    setChatOperations(null);

  }
  const handleDeleteBtn = () => {
    setConfirm({
      title: "Delete Chat",
      message: `Are you sure Want to delete "${chatName}" `,
      action: () => handleDeleteChat(chatId, chatName)
    })

    setChatOperations(null);
  }
  return (
    <div
      className="position-absolute top-50 start-100
                 translate-middle-y ms-2 mt-1 py-3 px-3 bg-dark border
                  rounded-3 shadow d-flex flex-column gap-2
                  popup-animation"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="btn btn-sm text-light w-100 text-start border-top  py-2"
        onClick={handleRenameBtn}>
        <i className="bi bi-pencil me-2"></i>
        Rename
      </button>
      <button
        className="btn btn-sm text-danger w-100 text-start  border-bottom pb-2"
        onClick={handleDeleteBtn}>
        <i className="bi bi-trash me-2"></i>
        Delete
      </button>
    </div>
  )
}

export { Editor, Confirmation, Alert, ChatOperations }


