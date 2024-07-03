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
export {calcularMora}