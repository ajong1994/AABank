import Button from '../components/Button'

const Modal = ({header, show, children, status, handleNewTransaction,handleTransBack, buttonClick}) => {
    return (
        <div className={show === 'show' ? 'show' : 'hide hidden' }>
            {/* <div className='bg-black bg-opacity-50 inset-0  z-20' onClick={handleCancel}> 
            </div> */}
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded flex flex-col z-30 w-96'>
                <header className="modal-header">
                    {status === 'confirmation' ? <h5 className='mb-4 capitalize'>Confirm {header}</h5> : <h5 className='mb-4 capitalize'>Successful {header}</h5> }
                </header>
                <div className="modal-body py-4">
                    <p className='text-sm'>{children}</p>
                </div>
                {status === 'confirmation' ?
                    (<footer className="modal-footer mt-4 self-end">
                        <Button classnames='justify-self-end self-end mt-auto text-gray-800 py-1 px-2 rounded mr-2 text-sm'onclick={()=>handleTransBack(header)}>Back</Button>
                        <Button classnames='justify-self-end self-end mt-auto bg-primary text-white py-1 px-2 rounded text-sm capitalize' onclick={buttonClick}>{header}</Button>
                    </footer>) : 
                    (<footer className="modal-footer mt-4 self-end">
                        <Button classnames='justify-self-end self-end mt-auto bg-primary text-white py-1 px-2 rounded text-sm' onclick={handleNewTransaction}>New Transaction</Button>
                    </footer>
                    )}
            </div>
        </div>
    )
}

export default Modal
