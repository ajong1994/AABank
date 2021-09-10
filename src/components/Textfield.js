
const Textfield = ({children, id, classnames, placeholder, type, value, onChange, min}) => {


    return (
        <>
            <label htmlFor={id} className="text-gray-700 text-sm">{children}</label>
            <input type={type} name ={id} id={id} placeholder={placeholder} value={value} onChange={onChange} min={min}
             className="mt-1 mb-2 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0 text-sm"/>                                                                                
        </>
    )
}

export default Textfield
