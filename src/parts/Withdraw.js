import Textfield from '../components/Textfield'
import Button from '../components/Button'
import Modal from './Modal'
import {get_balance} from '../utils/GetBalanceUtil'
import {formatMoney} from '../utils/FormatMoneyUtil'
import Form from '../components/Form'
import Error from '../components/Error'


const Withdraw = ({modalStat, customerData, withdrawAmount, onChange, handleModalClose, handleModalOpen, handleWithdraw, error}) => {


    const formattedBalance = get_balance(customerData);
    const formattedWithdraw = formatMoney(withdrawAmount);

    return (
            <div className="transaction-container">
                <Form classnames='h-full'>
                    <div className='flex flex-col h-full'>
                        <h4 className='mb-4'>Cash Out</h4>
                        <Textfield id="withdraw-input" placeholder="Enter withdrawal amount" type="number" value={withdrawAmount} onChange={onChange} min={0}>Withdrawal Amount</Textfield>
                        <Error classnames={error ? 'show' : 'hide'}>{withdrawAmount < 0 ? 'Amount cannot be negative.' : 'Amount must not be blank.' }</Error>
                        <Button classnames='justify-self-end self-end mt-auto bg-primary text-white py-1 px-2 rounded text-sm' type="submit"onclick={() => handleModalOpen({
                            show: true, 
                            status: 'confirmation',
                            deposit: false,
                            withdrawal: true,
                            send: false
                        })}>Withdraw</Button>
                    </div>

                </Form>
                <Modal header="Withdrawal" show={modalStat.show && modalStat.withdrawal ? 'show':'hide'} status={modalStat.status} 
                    buttonClick={handleWithdraw} onClose={handleModalClose}> 
                    {modalStat.status === 'confirmation' ? 
                        (`You are withdrawing ${formattedWithdraw} from Account Number: ${customerData.accNum}.`) :
                        (`Withdrawal successful! Account balance is now ${formattedBalance}.`)
                    }
                </Modal> 
            </div>
    )
}

export default Withdraw
