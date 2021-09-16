import Textfield from '../components/Textfield'
import Button from '../components/Button'
import Modal from './Modal'
import {get_balance} from '../utils/GetBalanceUtil'
import {formatMoney} from '../utils/FormatMoneyUtil'
import Form from '../components/Form'
import Error from '../components/Error'


const Withdraw = ({modalStat, customerData, withdrawAmount, onChange, handleNewTransaction, handleTransBack, handleModalOpen, handleWithdraw, error, className, handleCancel, modalOverlay}) => {


    const formattedBalance = get_balance(customerData);
    const formattedWithdraw = formatMoney(withdrawAmount);
    const modalContainerClass = `${className} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded z-10 w-96`;
    const overlayClass = `${modalOverlay} bg-black bg-opacity-50 inset-0 absolute top-0 left-0`;

    return (
        <>
            <div className={overlayClass} onClick={handleCancel}>
            </div>
            <div className={modalContainerClass}>
                <Form classnames='h-full'>
                    <div className='flex flex-col h-full'>
                        <h4 className='mb-4'>Cash Out</h4>
                        <Textfield id="withdraw-input" placeholder="Enter withdrawal amount" type="number" value={withdrawAmount} onChange={onChange}>Withdrawal Amount</Textfield>
                        <Error classnames={error ? 'show' : 'hide'}>{withdrawAmount < 0 ? 'Amount cannot be negative.' : 'Amount must not be blank.' }</Error>
                        <footer className="modal-footer mt-4 self-end">
                            <Button classnames='justify-self-end self-end mt-auto text-gray-800 py-1 px-2 rounded mr-2 text-sm' onclick={handleCancel}>Cancel</Button>
                            <Button classnames='justify-self-end self-end mt-auto bg-primary text-white py-1 px-2 rounded text-sm' type="submit"onclick={() => handleModalOpen({
                                show: true, 
                                status: 'confirmation',
                                deposit: false,
                                withdrawal: true,
                                send: false
                            })}>Continue</Button>
                        </footer>
                    </div>

                </Form>
            </div> 
            <Modal header="withdrawal" show={modalStat.show && modalStat.withdrawal ? 'show':'hide'} status={modalStat.status} 
                    buttonClick={handleWithdraw} handleNewTransaction={handleNewTransaction} handleTransBack={handleTransBack}> 
                    {modalStat.status === 'confirmation' ? 
                        (`You are withdrawing ${formattedWithdraw} from Account Number: ${customerData.accNum}.`) :
                        (`Withdrawal successful! Account balance is now ${formattedBalance}.`)
                    }
            </Modal>
        </>
    )
}

export default Withdraw
