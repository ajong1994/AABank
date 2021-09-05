
const Form = ({classnames, children}) => {

    const submitForm = (event) => {
        event.preventDefault();
    }

    return (
        <form onClick={submitForm} className={classnames} action="/" method="GET">
            {children}
        </form>
    )
}

export default Form
