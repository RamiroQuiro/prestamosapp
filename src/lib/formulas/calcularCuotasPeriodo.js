
// Función para calcular las cuotas en el rango de fechas seleccionado

const nodoUserid = document.getElementById("userId");
const userId=document.querySelector('[data-user-id]').getAttribute('data-user-id')
// console.log("usuario en el scrtipt", userId);

async function calcularCuotas() {
    // Obtener las fechas de inicio y fin del rango
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);
  
    // Verificar que ambas fechas sean válidas
    if (isNaN(startDate) || isNaN(endDate)) {
      alert("Por favor, selecciona ambas fechas.");
      return;
    }
  
    // Obtener las cuotas (aquí deberías usar tu método para obtener las cuotas)
try {
    const res=await fetch(`/api/cuotas/${userId}`)
    const data=await res.json()
    console.log(data)
} catch (error) {
    console.log(error)
}

    // Este es un ejemplo de un array de cuotas, cada cuota tiene una fecha
    const cuotas = [
      { fecha: "2024-07-01", cantidad: 100 },
      { fecha: "2024-07-02", cantidad: 200 },
      { fecha: "2024-07-12", cantidad: 150 },
      { fecha: "2024-07-15", cantidad: 300 },
    ];
  
    // Filtrar las cuotas dentro del rango de fechas
    const cuotasEnRango = cuotas.filter(cuota => {
      const cuotaFecha = new Date(cuota.fecha);
      return cuotaFecha >= startDate && cuotaFecha <= endDate;
    });
  
    // Mostrar los resultados
    const resultDiv = document.getElementById("result");
    resultDiv.innerHTML = ""; // Limpiar resultados anteriores
    if (cuotasEnRango.length === 0) {
      resultDiv.innerHTML = "<p>No hay cuotas en el rango de fechas seleccionado.</p>";
    } else {
      const totalCuotas = cuotasEnRango.reduce((total, cuota) => total + cuota.cantidad, 0);
      resultDiv.innerHTML = `<p>Total de cuotas en el rango: ${totalCuotas}</p>`;
      cuotasEnRango.forEach(cuota => {
        resultDiv.innerHTML += `<p>Fecha: ${cuota.fecha}, Cantidad: ${cuota.cantidad}</p>`;
      });
    }
  }
  
  // Escuchar el evento de cambio en los campos de fecha
  document.getElementById("startDate").addEventListener("change", calcularCuotas);
  document.getElementById("endDate").addEventListener("change", calcularCuotas);
  