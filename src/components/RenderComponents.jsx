import DOMPurify from "dompurify";

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
            className="mt-auto d-flex align-items-center gap-2 p-2 rounded-3 border"

        >
            <img
                src="/Profile.png" alt="profile"
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
                onClick={hanleDeleteBtn}
            >
                <i className="bi bi-trash3"></i>
            </div>
        </div>
    )
}

export { SvgImage, FileCard, UserInfoCard }

