import { cleanMarkdown, removeSvg } from '../Calculations';
import { CopyBtn } from './AccessibleOperations';
import { OpenAsNewTab, ReadAloud, ShareResponse } from './AccessibleOperations';
import { DownloadAsJpg, DownloadAsPdf, DownloadAsPng, DownloadAsSvg } from './DownloadOperations';

export default function ChatItemOperation({ id, svg, text, speakingId, setSpeakingId, setAlert }) {
    const textContent = removeSvg(svg, text)
    const cleanText = cleanMarkdown(textContent);
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

    return (
        <div className='d-flex gap-1 py-1 px-2'>
            <CopyBtn text={text} />
            {svg ?
                (<>

                    <DownloadAsSvg
                        svg={svg}
                        setAlert={setAlert}
                        downloadImage={downloadImage}
                    />
                    <DownloadAsPng
                        svg={svg}
                        setAlert={setAlert}
                        downloadImage={downloadImage}
                    />
                    <DownloadAsJpg
                        svg={svg}
                        setAlert={setAlert}
                        downloadImage={downloadImage}
                    />
                    <OpenAsNewTab
                        svg={svg}
                    />

                </>) :
                (<>
                    {/* {setAlert, speakingId, setSpeakingId, cleanText} */}
                    <ReadAloud
                        id={id}
                        setAlert={setAlert}
                        speakingId={speakingId}
                        setSpeakingId={setSpeakingId}
                        cleanText={cleanText}
                    />
                    <ShareResponse
                        textContent={textContent}
                    />
                    <DownloadAsPdf
                        id={id}
                        setAlert={setAlert}
                    />
                </>)}
        </div>
    )
}
