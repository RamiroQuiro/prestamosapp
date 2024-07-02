function calcularMora(principal, tasaMora, diasRetraso) {
    const tasaMoraDiaria = tasaMora / 365;
    const mora = principal * tasaMoraDiaria * diasRetraso;
    return mora;
  }
  
  // Ejemplo de uso
  const principal = 1000;
  const tasaMora = 0.15; // 15% anual
  const diasRetraso = 30;
  
  const moraCalculada = calcularMora(principal, tasaMora, diasRetraso);
  console.log(`La mora es: $${moraCalculada.toFixed(2)}`);

export {calcularMora}