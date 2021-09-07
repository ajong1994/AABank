
const Textfield = ({children, id, classnames, placeholder, type, value, onChange}) => {


    return (
        <>
        <label htmlFor = {id}>{children}</label>
        {/* <input type={type} name={id} id={id} className={classnames} placeholder={placeholder} required={required}/>                                                                                 */}
        <input type={type} name ={id} id={id} className={classnames} placeholder={placeholder} value={value} onChange={onChange}/>                                                                                
        </>
    )
}

export default Textfield
