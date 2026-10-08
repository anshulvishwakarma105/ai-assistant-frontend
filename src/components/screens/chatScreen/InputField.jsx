import React, { useState } from "react";
import { useRef } from "react";
import { FileCard } from "../../RenderComponents";
import { isMobile } from "../../Calculations";
import { ChatInputAdditions } from "../../PopComponents";

export default function InputField({ keyboardHeight, onAskAi, loading, setAlert }) {
  const [input, setInput] = useState("");
  const [chatInputAdditions, setChatInputAdditions] = useState(false);
  const [file, setFile] = useState(null);
  const [generateImage, setGenerateImage] = useState(false);
  const [focused, setFocused] = useState(false);

  const fileInputRef = useRef(null);

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (loading || !input.trim()) return;
    onAskAi(input, file, generateImage);
    setInput("");
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setGenerateImage(false);
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
      setAlert("Only TXT, PDF, DOC and DOCX files are allowed.");
      setFile(null);
      e.target.value = "";
      return;
    }

    if (selectedFile.size > maxSize) {
      setAlert("File size must be less than 10 MB.");
      setFile(null);
      e.target.value = "";
      return;
    }
    setFile(selectedFile);
    setGenerateImage(false);
    setChatInputAdditions(false);
  };

  return (
    <div
      className="position-absolute py-2 px-2 px-md-4 bg-dark"
      style={{
        width: "100%",
        position: "absolute",
        bottom: focused && isMobile ? `${keyboardHeight}px` : "0",
        zIndex: 40
      }}
    >
      {generateImage && (
        <div className="d-inline-flex position-relative">
          <div className="py-1 px-3 bg-warning text-dark rounded">
            <i className="bi bi-image me-2"></i>
            <span>Generate Image </span>
          </div>
          <span
            onClick={() => setGenerateImage(false)}
            className="position-absolute top-0 start-100 translate-middle d-flex align-items-center justify-content-center text-danger bg-light rounded-circle p-0 cursor-pointer"
            style={{ width: "16px", height: "16px" }}
          >
            <i className="bi bi-x-circle-fill" style={{ fontSize: "18px" }}></i>
          </span>
        </div>
      )}

      {file && (
        <div className="d-inline-flex position-relative">
          <FileCard fileName={file.name} />
          <span
            onClick={() => {
              setFile(null);
              fileInputRef.current.value = "";
            }}
            className="position-absolute top-0 start-100 translate-middle d-flex align-items-center justify-content-center text-danger bg-light rounded-circle p-0 cursor-pointer"
            style={{ width: "18px", height: "18px" }}
          >
            <i className="bi bi-x-circle-fill" style={{ fontSize: "18px" }}></i>
          </span>
        </div>
      )}

      <form className="input-group my-2" onSubmit={handleInputSubmit}>
        <div
          className="d-flex align-items-center px-3 text-light cursor-pointer"
          onClick={() => setChatInputAdditions(prev => !prev)}
        >
          <i className="bi bi-plus-lg fs-5"></i>
        </div>

        <input
          type="text"
          className="form-control bg-dark text-light border-0 shadow-none placeholder-light"
          placeholder="Ask Ai . . ."
          aria-label="Input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />

        <button
          className={`btn rounded ${loading ? "btn-success" : "btn-primary"}`}
          type="submit"
          disabled={loading}
        >
          {loading ? 
          (<><span className="spinner-border spinner-border-sm me-1" aria-hidden="true"></span>
          <span>Wait</span></> ) 
          : "Submit"}
        </button>
      </form>

      {chatInputAdditions && (
        <ChatInputAdditions
          setChatInputAdditions={setChatInputAdditions}
          fileInputRef={fileInputRef}
          handleFileSubmit={handleFileSubmit}
          setFile={setFile}
          setGenerateImage={setGenerateImage}
        />
      )}
    </div>
  );
}