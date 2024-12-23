function hookupevents() {
    for (var i = 0; i < 3; i++) { 
      document.getElementById("button" + i).addEventListener("click", function() {
        alert(i); 
      });
    }
  }
  
  hookupevents();
  