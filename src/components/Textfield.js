
const Textfield = ({children, id, classnames, placeholder, type, required }) => {

    // const required = (required === true ) ? true : false

    return (
        <>
        <label htmlFor = {id}>{children}</label>
        <input type={type} name ={id} id={id} className={classnames} placeholder={placeholder} required={required}/>
                                                                                               
        </>
    )
}

export default Textfield
