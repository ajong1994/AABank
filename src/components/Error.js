
import {ExclamationCircleIcon} from '@heroicons/react/outline'

const Error = ({classnames, children}) => {
    return (
        <div className = {classnames}>
            <span className="h-5 w-5">
                <ExclamationCircleIcon className="h-5 w-5 inline-block text-red-400"/>
            </span>
            <span className="text-red-400 font-Source Sans Pro text-xs ml-2">
            {children}
            </span>
        </div>
    )
}

export default Error
