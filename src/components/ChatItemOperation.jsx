import React, { useState } from 'react'
import html2pdf from "html2pdf.js";

export default function ChatItemOperation({ id, text, speakingId, setSpeakingId }) {
    const [copied, setCopied] = useState(false)
    const copyText = async () => {
        try {
            //can be cleanMarkDown(text) for bot response
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false)
            }, 2000);
        } catch (e) {
            console.error("Copy failed:", e);
        }
    }

    const cleanMarkdown = (markdownText) => {
        return markdownText
            .replace(/```[\s\S]*?```/g, "")
            .replace(/`([^`]+)`/g, "$1")
            .replace(/^#{1,6}\s+/gm, "")
            .replace(/[*_~]/g, "")
            .replace(/^\s*[-*+]\s+/gm, "")
            .replace(/^\s*\d+\.\s+/gm, "")
            .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
            .replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1")
            .replace(/\n{2,}/g, "\n")
            .trim();
    };


    const readAloud = async () => {
        try {
            if (speakingId === id) {
                speechSynthesis.cancel();
                setSpeakingId(null);
                return;
            }
            speechSynthesis.cancel();

            const cleanText = cleanMarkdown(text);
            const voice = new SpeechSynthesisUtterance(cleanText)
            voice.lang = "en-US";

            voice.onstart = () => {
                setSpeakingId(id);
            }
            voice.onend = () => {
                setSpeakingId(null);
            }
            voice.onerror = () => {
                setSpeakingId(null);
            }
            speechSynthesis.speak(voice);
        } catch (e) {
            console.error("Copy failed:", e);
        }
    }

    const shareResponse = async () => {
        //later add share as file option
        try {
            if (!navigator.share) return;
            await navigator.share({
                title: "Ai Response",
                text: `Ai Response : ${text}`,
                url: window.location.href
            })
        } catch (e) {
            console.error("Copy failed:", e);
        }
    }

    const downloadAsPdf = () => {
        const element = document.getElementById(`chatId-${id}`);
        if (!element) return;
        const pdfContent = document.createElement("div");

        pdfContent.innerHTML = `
        <div style="
            font-family: Arial, sans-serif;
            padding: 20px;
            color: #212529;
            background: white;
        ">
            <h1 style="
                margin: 0 0 8px 0;
                font-size: 24px;
            ">
                AI Response
            </h1>

            <div style="
                font-size: 12px;
                color: #6c757d;
                margin-bottom: 20px;
            ">
                ${new Date().toLocaleString()}
            </div>

            <div style="
                display: inline-block;
                background: #6c757d;
                color: white;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
                margin-bottom: 15px;
            ">
                AI Response
            </div>

            <div>
                ${element.innerHTML}
            </div>
        </div>
    `;

        document.body.appendChild(pdfContent);
        //later take the margin, filename, orientation, format from user.
        try {
            html2pdf()
            .set({
                margin: [15, 15, 15, 15],
                filename: `Ai_Response_Chat_Id_${id}`,
                image: {
                    type: "jpeg",
                    quality: 0.95
                },
                html2canvas: {
                    scale: 2,
                    useCORS: true
                },
                pagebreak: {
                    mode: ["css", "legacy"]
                },
                jsPDF: {
                    unit: "mm",
                    format: "a4",
                    orientation: "portrait"
                }
            })
            .from(pdfContent)
            .save();
        } catch (e) {
            console.error("Copy failed:", e);
        }

    }

    return (
        <div className='d-flex gap-1 py-1 px-2'>
            <button className='btn btn-sm btn-outline-none '
                type='button'
                onClick={copyText}
            >
                <i className={`bi ${copied ? "bi-check-lg text-success" : "bi-copy"}`}></i>
            </button>
            <button className='btn btn-sm btn-outline-none '
                type='button'
                onClick={readAloud}
            >
                <i className={`bi ${speakingId === id ? "bi-stop-fill" : "bi-volume-up"}`}></i>
            </button >
            <button className='btn btn-sm btn-outline-none '
                type='button'
                onClick={shareResponse}
            >
                <i className="bi bi-share"></i>
            </button>
            <button className='btn btn-sm btn-outline-none '
                type='button'
                onClick={downloadAsPdf}
            >
                <i className="bi bi-file-earmark-pdf"></i>
            </button>
        </div>
    )
}
