import React, { useState, useEffect } from "react";
import { useRef } from "react";
import { FileCard } from "./Common";
import { isMobile } from "./utils";


export default function InputField({ keyboardHeight, onAskAi, loading, setAlert }) {

  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);
  const [focused, setFocused] = useState(false);


  const fileInputRef = useRef(null)

  const handleInputSubmit = (e) => {
    e.preventDefault();

    if (loading || !input.trim()) return;
    onAskAi(input, file);
    setInput("");
    setFile(null);
    fileInputRef.current.value = "";
  };

  const handleFileSubmit = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    const allowedTypes = [
      "text/plain",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ];

    const maxSize = 10 * 1024 * 1024;

    if (!allowedTypes.includes(selectedFile.type)) {
      setAlert("Only TXT, PDF and DOC files are allowed.")
      setFile(null);
      e.target.value = "";
      return;
    }
    if (selectedFile.size > maxSize) {
      setAlert("File size must be less than 10 MB.")
      setFile(null);
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  }

  return (
    <div className=" py-2 px-2 px-md-4  bg-dark"
      style={{
        width: "100%",
        position: "absolute",
        bottom: focused && isMobile ? `${keyboardHeight}px` : "0",
        zIndex: 100
      }}
    >
      {file && (
        <div className="d-inline-flex position-relative">
          <FileCard fileName={file.name} />
          <span
            onClick={() => {
              setFile(null);
              fileInputRef.current.value = "";
            }}
            className="position-absolute top-0 start-100 translate-middle
               d-flex align-items-center justify-content-center
               text-danger bg-light rounded-circle p-0"
            style={{
              width: "18px",
              height: "18px",
              cursor: "pointer"
            }}
          >
            <i
              className="bi bi-x-circle-fill"
              style={{ fontSize: "18px" }}
            ></i>
          </span>
        </div>
      )}

      <form className="input-group my-2" onSubmit={handleInputSubmit}>
        <div className="d-flex align-items-center px-3 text-light">
          <i
            className="bi bi-upload fs-5"
            onClick={() => fileInputRef.current.click()}
          ></i>
          <input
            type="file"
            className="form-control"
            ref={fileInputRef}
            accept=".txt,.pdf,.doc,.docx"
            onChange={handleFileSubmit}
            hidden
          />
        </div>
        <input
          type="text"
          className="form-control bg-dark text-light border-0 shadow-none placeholder-light"
          placeholder="Ask Ai . . ."
          aria-label="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => {
            setFocused(true)
          }}
          onBlur={() => setFocused(false)}
        />
        <button
          className="btn bg-primary text-light"
          type="submit"
          disabled={loading}
        >
          {loading ? "Wait ..." : "Submit"}

        </button>
      </form>


    </div>
  );
}