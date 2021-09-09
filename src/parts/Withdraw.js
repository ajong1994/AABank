import Textfield from '../components/Textfield'
import Button from '../components/Button'
import Modal from './Modal'
import {get_balance} from '../utils/GetBalanceUtil'
import {formatMoney} from '../utils/FormatMoneyUtil'


const Withdraw = ({modalStat, customerData, withdrawAmount, onChange, handleModalClose, handleModalOpen, handleWithdraw, error}) => {


    const formattedBalance = get_balance(customerData);
    const formattedWithdraw = formatMoney(withdrawAmount);

    return (
        <div>
            <div className="transaction-container"> 
            <Textfield id="withdraw-input" placeholder="Enter your withdrawal amount" type="number" value={withdrawAmount} onChange={onChange} min={0}>Withdraw</Textfield>
            <p className={`${error ? 'show' : 'hidden'} error`}>Amount must not be blank.</p>
            <Button type="submit"onclick={() => handleModalOpen({
                show: true, 
                status: 'confirmation',
                deposit: false,
                withdrawal: true,
                send: false
            })}>Withdraw Amount</Button>
            </div>
            <Modal header="Withdrawal" show={modalStat.show && modalStat.withdrawal ? 'show':'hide'} status={modalStat.status} 
            buttonClick={handleWithdraw} onClose={handleModalClose}> 
            {modalStat.status === 'confirmation' ? 
                (`You are withdrawing ${formattedWithdraw} from Account Number: ${customerData.accNum}`) :
                (`Withdrawal successful! Account balance is now ${formattedBalance}`)
            }
            </Modal> 
        </div>
    )
}

export default Withdraw
