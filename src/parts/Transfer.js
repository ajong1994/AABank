import Textfield from '../components/Textfield'
import Button from '../components/Button'
import Modal from './Modal'
import {get_balance} from '../utils/GetBalanceUtil'
import {format_money} from '../utils/FormatMoneyUtil'

const Transfer = ({modalStat, customerData, receivingAccount, transferAmount, onChangeAmount, onChangeAccount, handleModalClose, handleModalOpen, handleTransfer}) => {

    const formattedBalance = get_balance(customerData);
    const formattedTransfer = format_money(transferAmount);

    return (
        <div>
            <div className="transaction-container"> 
            <Textfield id="recipient-input" placeholder="Enter receiving account number" type="number" onChange={onChangeAccount} value={receivingAccount} />
            <Textfield id="transfer-input" placeholder="Enter your transfer amount" type="number" value={transferAmount} onChange={onChangeAmount}>Transfer</Textfield>
            <Button type="submit"onclick={() => handleModalOpen({
                show: true, 
                status: 'confirmation',
                deposit: false,
                withdrawal: false,
                transfer: true
            })}>Transfer Amount</Button>
            </div>
            <Modal header="Transfer" show={modalStat.show && modalStat.transfer ? 'show':'hide'} status={modalStat.status} 
            buttonClick={handleTransfer} onClose={handleModalClose}> 
            {modalStat.status === 'confirmation' ? 
                (`You are Transferring ${formattedTransfer} from Account Number: ${customerData.accNum} to Account Number: ${receivingAccount}.`) :
                (`Transfer successful! Account balance is now ${formattedBalance}`)
            }
            </Modal> 
        </div>
    )
}

export default Transfer
