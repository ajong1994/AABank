import Button from '../components/Button'

const Modal = ({header, show, children, status, onClose, buttonClick}) => {
    return (
        <div className={show === 'show' ? 'show ' : 'hide hidden' }>
            <div className='bg-black bg-opacity-50 inset-0 absolute top-0 left-0' onClick={() => onClose()}> 
            </div>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded flex flex-col z-10 w-96'>
                <header className="modal-header">
                    {status === 'confirmation' ? <h5 className='mb-4'>Confirm {header}</h5> : <h5 className='mb-4'>Successful {header}</h5> }
                </header>
                <div className="modal-body py-4">
                    <p className='text-sm'>{children}</p>
                </div>
                {status === 'confirmation' ?
                    (<footer className="modal-footer mt-4 self-end">
                        <Button classnames='justify-self-end self-end mt-auto text-gray-800 py-1 px-2 rounded mr-2 text-sm'onclick={onClose}>Cancel</Button>
                        <Button classnames='justify-self-end self-end mt-auto bg-primary text-white py-1 px-2 rounded text-sm' onclick={buttonClick}>{header}</Button>
                    </footer>) : 
                    (<footer className="modal-footer mt-4 self-end">
                        <Button classnames='justify-self-end self-end mt-auto bg-primary text-white py-1 px-2 rounded text-sm' onclick={onClose}>New Transaction</Button>
                    </footer>
                    )}
            </div>
        </div>
    )
}

export default Modal
