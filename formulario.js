const alertaFormulario = () => {
    
    
    Toastify({
    
      text: "Complete todos los campos antes de apretar el enviar!",
      
      duration: 3000
      
      }).showToast();
  }
  
  const botonFormulario = document.querySelector(".boton--formulario")
  botonFormulario.addEventListener("click", alertaFormulario)