import {UserCircleIcon} from '@heroicons/react/solid'


const AccountGreeting = ({customerData}) => {
    return (
        <div className="pb-8 pt-4 grid greeting-custom-width gap-2">
            <div className="col-start-1 w-10 pt-1">
                <UserCircleIcon className="h-8 w-8 text-primary leading-9"/>
            </div>
            <div className="col-start-2">
                <p className='uppercase text-primary font-bold font-Source Sans Pro text-3xl'>{customerData.firstname} {customerData.lastname}</p>
                <p className='text-gray-500 font-Source Sans Pro'>{customerData.email}</p>
            </div>
        </div>
    )
}

export default AccountGreeting
