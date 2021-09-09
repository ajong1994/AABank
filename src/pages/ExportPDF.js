import jsPDF from 'jspdf'


      const generatePDF = () => {
      
         var doc = new jsPDF('p', 'pt');     
         doc.save('demo.pdf')
         
         return (
            <div>
               <button onClick={generatePDF}>Download PDF</button> 
            </div>
         );
      
   }
   
  
export default generatePDF
