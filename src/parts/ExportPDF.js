import jsPDF from 'jspdf'


      const exportPDF = () => {
      
         var doc = new jsPDF('p', 'pt');     
         doc.save('demo.pdf')
         
         return (
            <div>
               <button onClick={exportPDF}>Download PDF</button> 
            </div>
         );
      
   }
   
  
export default exportPDF
