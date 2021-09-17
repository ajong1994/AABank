import {ChevronRightIcon} from '@heroicons/react/outline'
import { PiggyBank } from '../components/PiggyBank'
import { MoneyOut } from '../components/MoneyOut'
import { FlyingMoney } from '../components/FlyingMoney'

const TransactionBlock = ({caption,img_src, onClick}) => {
    return (
        <div className='transaction-container' onClick={onClick}>
            <div className='flex justify-center items-center pt-6'>
                {img_src === 'piggy' ? <PiggyBank width='100'/> : img_src === 'money out' ? <MoneyOut width='100'/> : <FlyingMoney width='100'/>}
            </div> 
            <div className='mt-auto'>
                <h5 className='inline-block align-middle text-primary text-lg'>{caption}</h5>
                <ChevronRightIcon className='h-4 w-4 ml-2 inline-block align-middle text-primary'/>
            </div>

      </div>
    )
}

export default TransactionBlock
