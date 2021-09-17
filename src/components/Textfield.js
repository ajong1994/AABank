
const Textfield = ({children, id, classnames, placeholder, type, value, onChange}) => {


    return (
        <>
            <label htmlFor={id} className="text-gray-700 text-sm">{children}</label>
            <input type={type} name ={id} id={id} placeholder={placeholder} value={value} onChange={onChange}
             className="mt-1 mb-2 block w-full rounded-md bg-white border-primary border focus:border-purple-700 focus:ring-1 text-sm"/>                                                                                
        </>
    )
}

export default Textfield
