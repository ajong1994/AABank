import React from 'react'

function JSFORMAT() {
    
    //save
    function saveData() {
        var newData = document.getElementById('input').value;
    
        //save to input to array
        if(localStorage.getItem('data') == null){
          localStorage.setItem('data', '[]');
        }
    
        // get previous and push the new data
        let oldData = JSON.parse(localStorage.getItem('data'));
        oldData.push(newData);
    
        //  save old data + new data to local storage
        localStorage.setItem('data', JSON.stringify(oldData))
    }
    
    //display
    function viewArray() {
        if(localStorage.getItem('data') !== null){
            document.getElementById('output').innerHTML = JSON.parse(localStorage.getItem('data'));
        }
    }

    return (
        <div>
            <button onClick={saveData}></button>
            <button onClick={viewArray}></button>
            
        </div>
    )
}

export default JSFORMAT


