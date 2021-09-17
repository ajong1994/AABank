import Textfield from '../components/Textfield'
import Button from '../components/Button'
import Modal from './Modal'
import {get_balance} from '../utils/GetBalanceUtil'
import {formatMoney} from '../utils/FormatMoneyUtil'
import Form from '../components/Form'
import Error from '../components/Error'
import { format_idNumber } from '../utils/UserIdUtil'
const Send = ({modalStat, customerData, receivingAccount, sendAmount, onChangeAmount, onChangeAccount, handleNewTransaction, handleTransBack, handleModalOpen, handleSend, accErr, amtErr, className, handleCancel, modalOverlay}) => {

    const formattedBalance = get_balance(customerData);
    const formattedSendAmt = formatMoney(sendAmount);
    const modalContainerClass = `${className} absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded z-10 w-96`;
    const overlayClass = `${modalOverlay} bg-black bg-opacity-50 inset-0 absolute top-0 left-0`;

    return (
        <>
            <div className={overlayClass} onClick={handleCancel}>
            </div>
            <div className={modalContainerClass}>
                <Form classnames='h-full'>
                    <div className='flex flex-col h-full'>
                        <h4 className='mb-4'>Transfer Money</h4>
                        <Textfield id="recipient-input" placeholder="Enter receiving account number" type="number" onChange={onChangeAccount} value={receivingAccount}>Receiving Account</Textfield>
                        <Error classnames={accErr ? 'show' : 'hide'}>Account number must not be blank.</Error>
                        <Textfield id="transfer-input" placeholder="Enter transfer amount" type="number" value={sendAmount} onChange={onChangeAmount}>Transfer Amount</Textfield>
                        <Error classnames={amtErr ? 'show' : 'hide'}>{sendAmount < 0 ? 'Amount cannot be negative.' : 'Amount must not be blank.' }</Error>
                        <footer className="modal-footer mt-4 self-end">
                            <Button classnames='justify-self-end self-end mt-auto text-gray-800 py-1 px-2 rounded mr-2 text-sm' onclick={handleCancel}>Cancel</Button>
                            <Button classnames='justify-self-end self-end mt-auto bg-primary text-white py-1 px-2 rounded text-sm' type="submit"onclick={() => handleModalOpen({
                                show: true, 
                                status: 'confirmation',
                                deposit: false,
                                withdrawal: false,
                                send: true
                            })}>Continue</Button>
                        </footer>
                    </div>
                </Form>
            </div>
            <Modal header="transfer" show={modalStat.show && modalStat.send ? 'show':'hide'} status={modalStat.status} 
                    buttonClick={handleSend} handleNewTransaction={handleNewTransaction} handleTransBack={handleTransBack}> 
                    {modalStat.status === 'confirmation' ? 
                        (`You are Transferring ${formattedSendAmt} from Account Number: ${customerData.accNum} to Account Number: ${receivingAccount}.`) :
                        (`Transfer successful! Account balance is now ${formattedBalance}.`)
                    }
            </Modal> 
        </>
    )
}

export default Send
