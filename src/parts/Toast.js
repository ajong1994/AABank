import {BellIcon} from '@heroicons/react/outline'
import {CheckIcon} from '@heroicons/react/outline'
import {ExclamationIcon} from '@heroicons/react/outline'
import {XIcon} from '@heroicons/react/outline'


function Toast({type, children, onClick}) {
    return (
        <div className='absolute top-2 right-2 flex gap-3 p-2 justify-around items-start h-16 rounded bg-white shadow show'>  
          {type === 'success'
          ? <>
            <div className='bg-green-500 w-1 h-full'></div>
            <div className='p-1 border-2 rounded-full inline-block border-green-500 self-center'> 
            <CheckIcon className='w-3 h-3 text-green-500 text-sm' /> 
            </div>
            </>
          : ( type === 'warning'
          ? <>
            <div className='bg-yellow-500 w-1 h-full'></div>
            <div className='p-1 border-2 rounded-full inline-block border-yellow-500'> 
              <ExclamationIcon className="w-3 h-3 text-yellow-500 text-sm" />
            </div>
            </>
          : <>
            <div className='bg-red-500 w-1 h-full'></div>
            <div className='p-1 border-2 rounded-full inline-block border-red-500 self-center'>
              <BellIcon className='w-3 h-3 text-red-500 text-sm' />
            </div>
            </>
          )}
          <div className='flex flex-col pr-4'>
            <h5 className='capitalize'>{type}</h5>
            <p className='text-gray-400 text-sm'>{children}</p>
          </div>
          <div className='close-icon p-px' onClick={onClick}><XIcon className='w-5 h-5 text-gray-800'/></div>                    
        </div>      
    )
}

export default Toast
