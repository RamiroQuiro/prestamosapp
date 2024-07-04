function calcularMora(principal, tasaMora, diasRetraso) {
    const tasaMoraDiaria = Number(tasaMora) / 365;
    const mora = principal * tasaMoraDiaria * diasRetraso;
    
    return mora;
  }
  
//   // Ejemplo de uso
//   const principal = 86000;
//   const tasaMora = 0.6246; // 15% anual
//   const diasRetraso = 2;
  
//   const moraCalculada = calcularMora(principal, tasaMora, diasRetraso);
// console.log(moraCalculada)

 function convertirAFecha(fechaStr) {
    // Convierte una fecha en formato DD-MM-YYYY a un objeto Date
    const [dia, mes, año] = fechaStr.split('-').map(Number);
    return new Date(año, mes - 1, dia);
  }
  
   function calcularDiasDeAtraso(fechaPago, fechaVencimiento) {
    const diferenciaMilisegundos = fechaPago - fechaVencimiento;
    const atrasoDias = Math.ceil(diferenciaMilisegundos / (1000 * 60 * 60 * 24));
    return Math.max(0, atrasoDias);
  }
  
   function actualizarInputValue(inputId, value) {
    const inputElement = document.getElementById(inputId);
    if (inputElement) {
      inputElement.value = value.toFixed(2);
    } else {
      console.error(`El elemento con id "${inputId}" no se encontró.`);
    }
  }
  


export {calcularMora,convertirAFecha,calcularDiasDeAtraso,actualizarInputValue}