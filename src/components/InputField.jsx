import React, { useState } from "react";
import { useRef } from "react";

export default function InputField({ onAskAi }) {
  const [input, setInput] = useState("");
  const [file, setFile] = useState(null);

  const fileInputRef = useRef(null)

  const handleInputSubmit = (e) => {
    e.preventDefault();

    if (!input.trim()) return;
    onAskAi(input, file);
    setInput("");
    setFile(null)
  };

  const handleFileSubmit = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
  }

  return (
    <div className="py-2 px-2 px-md-4  bg-dark"
    >
      {file && (
        <div className="d-inline-flex position-relative ">
          <div className="d-inline-flex align-items-center gap-2 text-light small bg-primary rounded px-2 py-1 mb-1 ">
            <span className="d-flex align-items-center gap-2">
              <i className="bi bi-file-earmark"></i>
              <span className="text-truncate ">{file.name}</span>
            </span>
          </div>
          <span
            onClick={() => {
              setFile(null);
            }}
            className="border-0 bg-danger text-light rounded-circle p-0 top-0 start-100 translate-middle "
            style={{
              position: "absolute",
              height: "14px",
              width: "14px"
            }}>
            <i className="bi bi-x d-flex justify-content-center"></i>
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
        />
        <button
          className="btn bg-primary text-light"
          type="submit">
          Submit
        </button>
      </form>


    </div>
  );
}