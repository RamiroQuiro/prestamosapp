function validarFormula(formula) {
    const regex = /\b(capital|tasaInteres|nCuotas)\b/g;
    const variablesEncontradas = new Set(formula.match(regex));
  
    // Verificamos que estén las tres variables obligatorias
    const variablesNecesarias = new Set(["capital", "tasaInteres", "nCuotas"]);
    for (let variable of variablesNecesarias) {
      if (!variablesEncontradas.has(variable)) {
        return false; // Falta alguna variable obligatoria
      }
    }
  
    return true; // La fórmula es válida
  }

  export {validarFormula}