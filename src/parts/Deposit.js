import Textfield from '../components/Textfield'
import Button from '../components/Button'
import Modal from './Modal'
import {get_balance} from '../utils/GetBalanceUtil'
import {format_money} from '../utils/FormatMoneyUtil'


const Deposit = ({modalStat, customerData, depositAmount, onChange, handleModalClose, handleModalOpen, handleDeposit}) => {

    const formattedBalance = get_balance(customerData);
    const formattedDeposit = format_money(depositAmount);

    return (
        <>
            <div className="transaction-container"> 
            <Textfield id="deposit-input" placeholder="Enter your deposit amount" type="number" value={depositAmount} onChange={onChange}>Deposit</Textfield>
            <Button type="submit"onclick={() => handleModalOpen({
                show: true, 
                status: 'confirmation',
                deposit: true,
                withdrawal: false,
                transfer: false
            })}>Deposit Amount</Button>
            </div>
            <Modal header="Deposit" show={modalStat.show && modalStat.deposit ? 'show':'hide'} status={modalStat.status} 
            buttonClick={handleDeposit} onClose={handleModalClose}> 
            {modalStat.status === 'confirmation' ? 
                (`You are depositing ${formattedDeposit} to Account Number: ${customerData.accNum}`) :
                (`Deposit successful! Account balance is now Php ${formattedBalance}`)
            }
            </Modal> 
        </>
    )
}

export default Deposit
