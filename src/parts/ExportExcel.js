import ReactToExcel from 'react-html-table-to-excel';

const exportExcel = ({tableId, filename, sheetNo, buttonText}) => {

    return (   
        <ReactToExcel
        table={tableId}
        filename ={filename}
        sheet={sheetNo}
        buttonText={buttonText} 
        />        
    )
}
export default exportExcel