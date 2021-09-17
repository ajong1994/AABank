import { VisaVector } from '../components/VisaVector'
import chip from '../components/chip.png'
import thumbmark from '../components/thumbmark.png'
import { formatMoney } from '../utils/FormatMoneyUtil'


const CreditCard = ({customerData}) => {
    return (
        <div className='grid grid-cols-2 grid-rows-5 items-center p-3 w-96 h-56 relative text-white shadow rounded-lg bg-gradient-to-r from-yellow-400 via-orange-500 to-purple-400'>
        {/* <p className='row-start-1 col-start-1 mt-2 uppercase font-Lato font-medium tracking-widest '>{customerData.firstname} {customerData.lastname}</p> */}
        <img src={chip} className="row-start-1 col-start-2 w-11 h-8 justify-self-end mr-2" alt="atm chip"/>
        <p className='row-start-1 col-start-1 capitalize font-medium'>Balance</p>
        <h2 className='row-start-2 col-start-1 text-4xl font-bold'>{formatMoney(customerData.balance)}</h2>
        <img src={thumbmark} className=" w-28 row-start-2 col-start-2 ml-14 mt-28 opacity-6" alt="thumbmark"/>
        <img src={thumbmark} className=" w-30 row-start-2 col-start-2 ml-5 mt-24 opacity-5" alt="thumbmark"/>
        <p className='row-start-5  row-end-5 col-start-1 mt-3 text-xl text-shadow-md font-medium tracking-more-wider'>{String(customerData.accNum).padStart(16, "*")}</p>  
        <div className='row-start-5 row-end-5 col-start-2 justify-self-end mr-2'>
          <VisaVector width="80" height="40"/>
        </div>
      </div>
    )
}

export default CreditCard
