
const Textfield = ({children, id, classnames, placeholder, type, value, onChange, min}) => {


    return (
        <div>
            <label htmlFor={id} className="text-gray-700">{children}</label>
            {/* <input type={type} name={id} id={id} className={classnames} placeholder={placeholder} required={required}/>                                                                                 */}
            <input type={type} name ={id} id={id} placeholder={placeholder} value={value} onChange={onChange} min={min}
             className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0"/>                                                                                
        </div>
    )
}

export default Textfield
