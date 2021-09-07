import Textfield from '../components/Textfield'
import Button from '../components/Button'
import Modal from './Modal'
import {get_balance} from '../utils/GetBalanceUtil'
import {formatMoney} from '../utils/FormatMoneyUtil'

const Send = ({modalStat, customerData, receivingAccount, sendAmount, onChangeAmount, onChangeAccount, handleModalClose, handleModalOpen, handleSend}) => {

    const formattedBalance = get_balance(customerData);
    const formattedSendAmt = formatMoney(sendAmount);

    return (
        <div>
            <div className="transaction-container"> 
            <Textfield id="recipient-input" placeholder="Enter receiving account number" type="number" onChange={onChangeAccount} value={receivingAccount} />
            <Textfield id="transfer-input" placeholder="Enter your transfer amount" type="number" value={sendAmount} onChange={onChangeAmount}>Send</Textfield>
            <Button type="submit"onclick={() => handleModalOpen({
                show: true, 
                status: 'confirmation',
                deposit: false,
                withdrawal: false,
                send: true
            })}>Send Amount</Button>
            </div>
            <Modal header="Transfer" show={modalStat.show && modalStat.send ? 'show':'hide'} status={modalStat.status} 
            buttonClick={handleSend} onClose={handleModalClose}> 
            {modalStat.status === 'confirmation' ? 
                (`You are Transferring ${formattedSendAmt} from Account Number: ${customerData.accNum} to Account Number: ${receivingAccount}.`) :
                (`Transfer successful! Account balance is now ${formattedBalance}`)
            }
            </Modal> 
        </div>
    )
}

export default Send
