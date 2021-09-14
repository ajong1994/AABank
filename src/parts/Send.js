import Textfield from '../components/Textfield'
import Button from '../components/Button'
import Modal from './Modal'
import {get_balance} from '../utils/GetBalanceUtil'
import {formatMoney} from '../utils/FormatMoneyUtil'
import Form from '../components/Form'
import Error from '../components/Error'
import { format_idNumber } from '../utils/UserIdUtil'
const Send = ({modalStat, customerData, receivingAccount, sendAmount, onChangeAmount, onChangeAccount, handleModalClose, handleModalOpen, handleSend, accErr, amtErr}) => {

    const formattedBalance = get_balance(customerData);
    const formattedSendAmt = formatMoney(sendAmount);

    return (
            <div className="transaction-container"> 
                <Form classnames='h-full'>
                    <div className='flex flex-col h-full'>
                        <h4 className='mb-4'>Transfer Money</h4>
                        <Textfield id="recipient-input" placeholder="Enter receiving account number" type="number" onChange={onChangeAccount} value={receivingAccount}>Receiving Account</Textfield>
                        <Error classnames={accErr ? 'show' : 'hide'}>Account number must not be blank.</Error>
                        <Textfield id="transfer-input" placeholder="Enter transfer amount" type="number" value={sendAmount} onChange={onChangeAmount} min={0}>Transfer Amount</Textfield>
                        <Error classnames={amtErr ? 'show' : 'hide'}>Amount must not be blank.</Error>
                        <Button classnames='justify-self-end self-end mt-auto bg-primary text-white py-1 px-2 rounded text-sm' type="submit"onclick={() => handleModalOpen({
                            show: true, 
                            status: 'confirmation',
                            deposit: false,
                            withdrawal: false,
                            send: true
                        })}>Send Amount</Button>
                    </div>

                </Form>
                <Modal header="Transfer" show={modalStat.show && modalStat.send ? 'show':'hide'} status={modalStat.status} 
                    buttonClick={handleSend} onClose={handleModalClose}> 
                    {modalStat.status === 'confirmation' ? 
                        (`You are Transferring ${formattedSendAmt} from Account Number: ${customerData.accNum} to Account Number: ${format_idNumber(receivingAccount)}.`) :
                        (`Transfer successful! Account balance is now ${formattedBalance}.`)
                    }
                </Modal> 
            </div>
    )
}

export default Send
