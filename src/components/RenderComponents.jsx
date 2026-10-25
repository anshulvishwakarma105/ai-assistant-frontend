import DOMPurify from "dompurify";
import Ad from "../assets/ads/my-todos.png"

function SvgImage({ svg_code }) {
    if (!svg_code) {
        return null;
    }

    const svg = DOMPurify.sanitize(svg_code, {
        USE_PROFILES: { svg: true }
    });

    return (
        <div
            className="svg-image border rounded my-2"
            dangerouslySetInnerHTML={{ __html: svg }}
        />
    );
}
function FileCard({ fileName }) {
    return (
        <div
            className="d-flex align-items-center bg-secondary
                text-light border   rounded-pill px-3 py-1  "
            style={{
                maxWidth: "240px"
            }}>
            <i className="bi bi-file-earmark-text-fill me-2 text-warning"></i>
            <span className="text-truncate ">{fileName}</span>
        </div>
    )
}

function UserInfoCard({ userInfo, setUserForm, setConfirm, hanleDeleteHistory }) {
    const hanleDeleteBtn = (e) => {
        e.stopPropagation();
        setConfirm({
            title: "Refresh",
            message: `Are you sure want to delete your whole Data ?`,
            action: hanleDeleteHistory
        })
    };
    return (
        <div
            className=" d-flex align-items-center gap-2 p-2 rounded-3 border"

        >
            <img
                src="/Profile.png" alt="profile"
                title="Edit Profile"
                className="rounded-circle flex-shrink-0 cursor-pointer"
                width="32" height="32"
                onClick={() => setUserForm(prev => !prev)} />
            <div className="d-flex flex-column px-1 overflow-hidden">
                <div className="text-truncate text-light">{userInfo.name}</div>
                <div className="text-secondary d-flex align-items-center gap-1 text-truncate">
                    <i className="bi bi-clock-history flex-shrink-0 me-1"></i>
                    <span className="text-truncate small fst-italic">{userInfo.preferences.timezone}</span>
                </div>
            </div>
            <div
                className='btn btn-outline-danger ms-auto fs-6 ' aria-label='Delete History'
                title="Delete History"
                onClick={hanleDeleteBtn}
            >
                <i className="bi bi-trash3"></i>
            </div>
        </div>
    )
}

export default function Advertise({ setAd, variant = "sidebar" }) {
    const isHome = variant === "home";

    return (
        <div
            className='position-relative d-flex align-items-center justify-content-center p-2 rounded-3 w-100'
        >
            <img
                src={Ad}
                alt="Advertisement for My Todos"
                className="img-fluid rounded-2"
                role="link"
                tabIndex={0}
                onClick={() =>
                    window.open(
                        "https://my-todos-webapp.vercel.app/",
                        "_blank",
                        "noopener,noreferrer"
                    )
                }
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        window.open(
                            "https://my-todos-webapp.vercel.app/",
                            "_blank",
                            "noopener,noreferrer"
                        );
                    }
                }}
                style={
                    isHome
                        ? {
                            display: "block",
                            width: "100%",
                            height: "auto",
                            maxHeight: "none",
                            objectFit: "contain",
                            cursor: "pointer"
                        }
                        : {
                            display: "block",
                            maxHeight: "120px",
                            maxWidth: "100%",
                            width: "auto",
                            height: "auto",
                            objectFit: "contain",
                            cursor: "pointer"
                        }
                }
            />

            <button
                type="button"
                onClick={() => setAd(false)}
                className="btn btn-light btn-sm position-absolute top-0 end-0 rounded-circle p-0 d-flex align-items-center justify-content-center shadow-sm"
                style={{
                    width: "24px",
                    height: "24px",
                    transform: "translate(20%, -20%)"
                }}
                aria-label="Close advertisement"
                title="Close advertisement"
            >
                <i className="bi bi-x text-danger fs-5"></i>
            </button>
        </div>
    );
}


export { SvgImage, FileCard, UserInfoCard, Advertise }

