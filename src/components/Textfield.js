
const Textfield = ({children, id, classnames, placeholder, type}) => {
    return (
        <>
        <label htmlFor = {id}>{children}</label>
        <input type={type} name ={id} id={id} className={classnames} placeholder={placeholder}/>
        </>
    )
}

export default Textfield
