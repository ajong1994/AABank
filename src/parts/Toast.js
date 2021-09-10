
function Toast({type, children, onClick}) {
    return (
        <div>
            <div className={
            type === 'success'
            ? 'toastSuccess'
            : ( type === 'warning'
                ? 'toastWarning'
                : 'toastError'
            )
            }>
            </div>
            <p>{children}</p>
            <div className="close-icon" onClick={onClick}>test</div>
        </div>
    )
}

export default Toast
