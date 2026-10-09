import html2pdf from "html2pdf.js";

function DownloadAsSvg({svg, setAlert, downloadImage }) {
    const downloadAsSvg = () => {
        setAlert({
            message: "Downloading Image As Svg...",
            bgColor: "primary",
            icon: "download"
        });
        downloadImage(svg, "svg");

    }
    return (
        <button className='btn btn-sm btn-outline-none '
            type='button'
            onClick={downloadAsSvg}
        >
            <i className="bi bi-filetype-svg"></i>
        </button>
    )
}
function DownloadAsPng({svg, setAlert, downloadImage }) {
    const downloadAsPng = () => {
        setAlert({
            message: "Downloading Image As Png...",
            bgColor: "primary",
            icon: "check-circle-fill"
        });
        downloadImage(svg, "png");
    }
    return (
        <button className='btn btn-sm btn-outline-none '
            type='button'
            onClick={downloadAsPng}
        >
            <i className="bi bi-filetype-png"></i>
        </button>
    )
}
function DownloadAsJpg({svg, setAlert, downloadImage }) {
    const downloadAsJpg = () => {
        setAlert({
            message: "Downloading Image As Jpg...",
            bgColor: "primary",
            icon: "download"
        });
        downloadImage(svg, "jpg");

    }
    return (
        <button className='btn btn-sm btn-outline-none '
            type='button'
            onClick={downloadAsJpg}
        >
            <i className="bi bi-filetype-jpg"></i>
        </button>
    )
}
function DownloadAsPdf({id, setAlert}) {
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
    return (
        <button className='btn btn-sm btn-outline-none '
            type='button'
            onClick={downloadAsPdf}
        >
            <i className="bi bi-file-earmark-pdf"></i>
        </button>
    )
}

export { DownloadAsSvg, DownloadAsPng, DownloadAsJpg, DownloadAsPdf }
