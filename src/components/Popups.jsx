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
    if (newTitle === editor.chatName) {
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
          className="btn btn-sm btn-danger w-100"
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
  )
}

function Confirmation({ confirm, setConfirm }) {
  return (
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
      shadow d-flex align-items-start gap-2 popup-animation `}
      style={{
        minWidth:"200px",
        zIndex: "3000"
      }}>
      <i className="bi bi-info-circle "></i>
      <span>{alert.message}</span>
    </div>
  )
}
function ChatOperations({ chatId, chatName, setChatOperations, setEditor, handleRenameChat, setConfirm, handleDeleteChat}) {
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

export { Editor, Confirmation, Alert, ChatOperations }


