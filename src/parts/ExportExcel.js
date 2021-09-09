import React from 'react'
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

//However it doesn't work yet when I call this to other component. 
// It works when I call ReactToExcel directly to wher imma use it.
