
const Form = ({classnames, children}) => {

    const submitForm = (event) => {
        event.preventDefault();
    }

    return (
        <form onSubmit={submitForm} className={classnames}>
            {children}
        </form>
    )
}

export default Form
