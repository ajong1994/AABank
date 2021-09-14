import {BellIcon} from '@heroicons/react/outline'
import {CheckCircleIcon} from '@heroicons/react/outline'
import {ExclamationIcon} from '@heroicons/react/outline'
import {XIcon} from '@heroicons/react/outline'


function Toast({type, children, onClick}) {
    
    return (
   
        <div className="absolute top-0 right-0 flex-col justify-between content-center items-center border-2 w-2/6 h-26 rounded">
            <div className="flex justify-between content-center items-center relative p-1 pl-2"> 
                 
                {type === 'success'
                ? <div className="p-1 border-2 rounded-full inline-block border-green-900"> 
                  <CheckCircleIcon className="w-3 h-3 text-green-900 text-sm" /> 
                  </div>
                : ( type === 'warning'
                ? <div className="p-1 border-2 rounded-full inline-block border-yellow-900"> 
                  <ExclamationIcon className="w-3 h-3 text-yellow-900 text-sm" />
                  </div>
                : <div className="p-1 border-2 rounded-full inline-block border-red-900">
                  <BellIcon className="w-3 h-3 text-red-900 text-sm " />
                  </div>
                )
                }
                <div className="font-bold bg-green p-px relative">{type}</div>
                <div className="close-icon p-px pl-2" onClick={onClick}><XIcon className="w-5 h-5 text-gray-800"/></div>        
    
            </div>
            <p className="flex h-14 justify-center content-center items-center relative bg-gray-100 text-gray-800">{children}</p>
        </div>      
    )
}

export default Toast
