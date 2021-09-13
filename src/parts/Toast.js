import {BellIcon} from '@heroicons/react/outline'
import {CheckCircleIcon} from '@heroicons/react/outline'
import {ExclamationIcon} from '@heroicons/react/outline'
import {XIcon} from '@heroicons/react/outline'


function Toast({type, children, onClick}) {
    return (
        <div className="flex justify-between align-middle absolute w-3/4 ">
            
            {type === 'success'
            ? <div className="p-1 border-2 rounded-full inline-block border-green-900"> 
            <CheckCircleIcon className="w-5 h-5 text-green-900 text-sm" /> 
            </div>
            : ( type === 'warning'
            ? <div className="p-1 border-2 rounded-full inline-block border-yellow-900"> 
            <ExclamationIcon className="w-5 h-5 text-yellow-900 text-sm" />
            </div>
            : <div className="p-1 border-2 rounded-full inline-block border-red-900">
            <BellIcon className="w-5 h-5 text-red-900 text-sm " />
            </div>
            )
            }
           
            <p>{children}</p>
            <div className="close-icon" onClick={onClick}><XIcon className="w-5 h-5"/></div>
        </div>
    )
}

export default Toast
