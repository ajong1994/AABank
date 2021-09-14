import Textfield from '../components/Textfield'
import Button from '../components/Button'
import Modal from './Modal'
import {get_balance} from '../utils/GetBalanceUtil'
import {formatMoney} from '../utils/FormatMoneyUtil'
import Form from '../components/Form'
import Error from '../components/Error'


const Deposit = ({modalStat, customerData, depositAmount, onChange, handleModalClose, handleModalOpen, handleDeposit, error}) => {

    const formattedBalance = get_balance(customerData);
    const formattedDeposit = formatMoney(depositAmount);

    return (
            <div className="transaction-container">
                <Form classnames='h-full'>
                    <div className='flex flex-col h-full'>
                        <h4 className='mb-4'>Cash In</h4>
                        <Textfield id="deposit-input" placeholder="Enter deposit amount" type="number" value={depositAmount} onChange={onChange} min={0}>Deposit Amount</Textfield>
                        <Error classnames={error ? 'show' : 'hide'}>Amount must not be blank.</Error>
                        <Button classnames='justify-self-end self-end mt-auto bg-primary text-white py-1 px-2 rounded text-sm' type="submit" onclick={() => handleModalOpen({
                            show: true, 
                            status: 'confirmation',
                            deposit: true,
                            withdrawal: false,
                            send: false
                        })}>Deposit</Button>
                    </div>
                </Form> 
                <Modal header="Deposit" show={modalStat.show && modalStat.deposit ? 'show':'hide'} status={modalStat.status} 
                    buttonClick={handleDeposit} onClose={handleModalClose}> 
                    {modalStat.status === 'confirmation' ? 
                        (`You are depositing ${formattedDeposit} to Account Number: ${customerData.accNum}.`) :
                        (`Deposit successful! Account balance is now Php ${formattedBalance}.`)
                    }
                </Modal> 
            </div>
    )
}

export default Deposit
