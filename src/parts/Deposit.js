import Textfield from '../components/Textfield'
import Button from '../components/Button'
import Modal from './Modal'


const Deposit = ({modalStat, customerData, depositAmount, onChange, handleModalClose, handleModalOpen, handleDeposit}) => {

    return (
        <>
            <div style={{border: '1px solid black', padding: '10px'}}> 
            <Textfield id="deposit-input" placeholder="Enter your deposit amount" type="number" value={depositAmount} onChange={onChange} required="true">Deposit</Textfield>
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
                (`You are depositing Php ${depositAmount} to Account Number: ${customerData.accNum}`) :
                (`Deposit successful! Account balance is now Php ${customerData.balance}`)
            }
            </Modal> 
        </>
    )
}

export default Deposit
