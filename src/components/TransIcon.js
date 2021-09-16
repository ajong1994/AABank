import {PaperAirplaneIcon} from '@heroicons/react/outline';
import { ReceiptRefundIcon } from "@heroicons/react/outline";
import { TrendingDownIcon } from "@heroicons/react/outline";
import { TrendingUpIcon } from "@heroicons/react/outline";

const TransIcon = ({transaction}) => {
    return (
        <>
            
            {transaction === 'deposit' 
            ? 
            <span className='h-8 w-8 bg-green-200 rounded-md p-1 inline-flex justify-center items-center align-middle mr-4'>
                <TrendingUpIcon className='h-5 w-5 inline text-green-700'/>
            </span>
            : transaction === 'withdrawal'
            ? 
            <span className='h-8 w-8 bg-red-200  rounded-md p-1 inline-flex justify-center items-center align-middle mr-4'>
                <TrendingDownIcon className='h-5 w-5 inline text-red-700'/>
            </span>
            : transaction === 'sent'
            ? 
            <span className='h-8 w-8  bg-yellow-200 rounded-md p-1 inline-flex justify-center items-center align-middle mr-4'>
                <PaperAirplaneIcon className='h-5 w-5 inline image-rotated text-yellow-700'/>
            </span>
            : 
            <span className='h-8 w-8 bg-purple-200 rounded-md p-1 inline-flex justify-center items-center align-middle mr-4'>
                <ReceiptRefundIcon className='h-5 w-5 inline text-purple-700'/>
            </span>
            }
        </>

    )
}

export default TransIcon
