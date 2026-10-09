import { useState } from "react";

function CopyBtn({ text }) {
    const [copied, setCopied] = useState(false)
    const copyText = async () => {
        try {
            //can be cleanMarkDown(text) for bot response
            if (!navigator.clipboard) return;
            await navigator.clipboard.writeText(text);
            setCopied(true);
            setTimeout(() => {
                setCopied(false)
            }, 2000);
        } catch (e) {
            console.error("Copy failed:", e);
        }
    }
    return (
        <button className='btn btn-sm btn-outline-none '
            type='button'
            onClick={copyText}
        >
            <i className={`bi ${copied ? "bi-check-lg text-success" : "bi-copy"}`}></i>
        </button>
    )
}

function ReadAloud({id, setAlert, speakingId, setSpeakingId, cleanText}) {
    const readAloud = () => {
        setAlert({
            message: "Vioce Media is Starting...",
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
    return (
        <button className='btn btn-sm btn-outline-none '
            type='button'
            onClick={readAloud}
        >
            <i className={`bi ${speakingId === id ? "bi-stop-fill" : "bi-volume-up"}`}></i>
        </button >
    )
}
function ShareResponse({textContent}) {
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
    return (
        <button className='btn btn-sm btn-outline-none '
            type='button'
            onClick={shareResponse}
        >
            <i className="bi bi-share"></i>
        </button>
    )
}
function OpenAsNewTab({svg}) {
    const openAsNewTab = () => {
        const svgBlob = new Blob([svg], {
            type: "image/svg+xml"
        });
        const svgBlobUrl = URL.createObjectURL(svgBlob);
        window.open(svgBlobUrl, "_blank");
    }
    return (
        <button className='btn btn-sm btn-outline-none '
            type='button'
            onClick={openAsNewTab}
        >
            <i className="bi bi-box-arrow-up-right"></i>
        </button>
    )
}

export { CopyBtn, ReadAloud, ShareResponse, OpenAsNewTab }
