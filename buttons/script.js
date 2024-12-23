function hookupevents() {
    for (let i = 0; i < 3; i++) { 
      document.getElementById("button" + i).addEventListener("click", function() {
        alert(i); 
      });
    }
  }
  
  hookupevents();
  