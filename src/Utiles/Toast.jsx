

export function showToast (message)  {
    // Crear un nuevo elemento div para el toast
    const toast = document.createElement('div#toast'); //Hay que darle estilo a esto
    toast.classList.add('toast');
    toast.textContent = message;
  
    // Agregar el toast al body del documento
    document.body.appendChild(toast);
  
    // Eliminar el toast después de 3 segundos
    setTimeout(() => {
      toast.remove();
    }, 3000);
  };
  

  