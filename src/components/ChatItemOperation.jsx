import React, { createElement, useState } from 'react'
import html2pdf from "html2pdf.js";
import { CopyBtn } from './RenderComponents';

export default function ChatItemOperation({ id, svg, text, speakingId, setSpeakingId, isImage, setAlert }) {
    const textContent = svg ?
        text.replace(/<svg[\s\S]*?<\/svg>/gi, "").trim()
        : text;

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
    const readAloud = () => {
        setAlert({
            message: "Vioce Media is Start Playing",
            bgColor: "primary",
            icon: "play-circle-fill"
        });
        try {
            if (!("speechSynthesis" in window)) return;

            if (speakingId === id) {
                speechSynthesis.cancel();
                setSpeakingId(null);
                return;
            }

            speechSynthesis.cancel();

            const cleanText = cleanMarkdown(textContent);

            if (!cleanText.trim()) return;

            const voice = new SpeechSynthesisUtterance(cleanText);
            voice.lang = "en-US";

            voice.onstart = () => setSpeakingId(id);
            voice.onend = () => setSpeakingId(null);
            voice.onerror = () => setSpeakingId(null);

            speechSynthesis.speak(voice);
        } catch (e) {
            console.error("Speech failed:", e);
            setSpeakingId(null);
            setAlert({
                message: `Speech failed: ${e}`,
                bgColor: "danger",
                icon: "exclamation-triangle"
            });
        }

    };
    const shareResponse = async () => {
        //later add share as file option
        try {
            if (!navigator.share) return;
            await navigator.share({
                title: "Ai Response",
                text: `Ai Response : ${textContent}`,
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
        padding: 24px;
        color: #212529;
        background: white;
    ">
        <div style="
            text-align: center;
            padding-bottom: 18px;
            margin-bottom: 20px;
            border-bottom: 2px solid #6f42c1;
        ">
            <h1 style="
                margin: 0 0 6px 0;
                font-size: 26px;
                font-weight: 600;
                color: #212529;
            ">
                AI Twins Response
            </h1>

            <div style="
                font-size: 12px;
                color: #6c757d;
            ">
                ${new Date().toLocaleString()}
            </div>
        </div>

        <div>
            ${element.innerHTML}
        </div>
    </div>
`;

        document.body.appendChild(pdfContent);
        setAlert({
            message: "PDF is Ready to Download",
            bgColor: "primary",
            icon: "check-circle-fill"
        });
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
            setAlert({
                message: `Copy failed: ${e}`,
                bgColor: "danger",
                icon: "exclamation-triangle"
            });
        }

    }
    const downloadImage = (svg, format = "png") => {
        if (format === "svg") {
            const svgBlob = new Blob([svg], {
                type: "image/svg+xml"
            });
            const svgBlobUrl = URL.createObjectURL(svgBlob);
            const a = document.createElement("a");
            a.href = svgBlobUrl;
            a.download = `Ai-Twins-generated-Image-${id}.${format}`
            a.click()
            URL.revokeObjectURL(svgBlobUrl);
            return;
        }

        //Svg image create
        const svgBlob = new Blob([svg], {
            type: "image/svg+xml"
        });
        const svgBlobUrl = URL.createObjectURL(svgBlob)

        const image = new Image();
        image.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = image.naturalWidth || 500;
            canvas.height = image.naturalHeight || 500;

            const ctx = canvas.getContext("2d");

            //Jpg background set
            if (format === "jpg") {
                ctx.fillStyle = "white";
                ctx.fillRect(0, 0, canvas.width, canvas.height)
            }
            ctx.drawImage(image, 0, 0)

            canvas.toBlob((blob) => {
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a")
                a.href = url;
                a.download = `Ai-Twins-generated-Image-${id}.${format}`;
                a.click();
                URL.revokeObjectURL(url);
            },
                format === "jpg" ?
                    "image/jpeg" : "image/png", 1
            );
            URL.revokeObjectURL(svgBlobUrl);
        }
        image.src = svgBlobUrl;
    }

    const downloadAsPng = () => {
        setAlert({
            message: "Downloading Image As Png...",
            bgColor: "primary",
            icon: "check-circle-fill"
        });
        downloadImage(svg, "png");
    }
    const downloadAsJpg = () => {
        setAlert({
            message: "Downloading Image As Jpg...",
            bgColor: "primary",
            icon: "download"
        });
        downloadImage(svg, "jpg");

    }
    const downloadAsSvg = () => {
        setAlert({
            message: "Downloading Image As Svg...",
            bgColor: "primary",
            icon: "download"
        });
        downloadImage(svg, "svg");

    }
    const OpenAsNewTab = () => {
        const svgBlob = new Blob([svg], {
            type: "image/svg+xml"
        });
        const svgBlobUrl = URL.createObjectURL(svgBlob);
        window.open(svgBlobUrl, "_blank");
    }


    return (
        <div className='d-flex gap-1 py-1 px-2'>
            <CopyBtn text={text} />
            {isImage ?
                (<>
                    <button className='btn btn-sm btn-outline-none '
                        type='button'
                        onClick={downloadAsSvg}
                    >
                        <i className="bi bi-filetype-svg"></i>
                    </button>
                    <button className='btn btn-sm btn-outline-none '
                        type='button'
                        onClick={downloadAsPng}
                    >
                        <i className="bi bi-filetype-png"></i>
                    </button>
                    <button className='btn btn-sm btn-outline-none '
                        type='button'
                        onClick={downloadAsJpg}
                    >
                        <i className="bi bi-filetype-jpg"></i>
                    </button>
                    <button className='btn btn-sm btn-outline-none '
                        type='button'
                        onClick={OpenAsNewTab}
                    >
                        <i className="bi bi-box-arrow-up-right"></i>
                    </button>

                </>) :
                (<>
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
                </>)}
        </div>
    )
}
