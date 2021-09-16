const PageContent = ({children}) => {
    return (
        <div className="flex-grow">
            <div className='overflow-auto h-full'>
            {children}
            </div>
        </div>
    )
}

export default PageContent
