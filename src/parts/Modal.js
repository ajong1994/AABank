import Button from '../components/Button'

const Modal = ({header, show, children, status, onClose, buttonClick}) => {
    return (
        <div className={show === 'show' ? 'show absolute bg-white p-2' : 'hide hidden'}>
            <header className="modal-header">
                <p>Confirm {header}</p>
            </header>
            <div className="modal-body">
                {children}
            </div>
            {status === 'confirmation' ?
                (<footer className="modal-footer">
                    <Button onclick={onClose}>Cancel</Button>
                    <Button onclick={buttonClick}>{header}</Button>
                </footer>) : 
                (<footer className="modal-footer">
                    <Button onclick={onClose}>New Transaction</Button>
                </footer>
                )}
        </div>
    )
}

export default Modal
