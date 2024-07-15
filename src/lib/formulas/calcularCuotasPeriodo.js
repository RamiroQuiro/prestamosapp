
// Función para calcular las cuotas en el rango de fechas seleccionado

const nodoUserid = document.getElementById("userId");
const userId=document.querySelector('[data-user-id]').getAttribute('data-user-id')
  // Obtener las fechas de inicio y fin del rango
  let cuotasEnRango=[]
  async function calcularCuotas() {
    const startDate = new Date(document.getElementById("startDate").value)
    const endDate = new Date(document.getElementById("endDate").value)
    const inicioDate=startDate.toISOString()
    const finDate=endDate.toISOString()
    // console.log("usuario en el scrtipt", inicioDate,finDate);
  
    // Verificar que ambas fechas sean válidas
    if (isNaN(startDate) || isNaN(endDate)) {
      alert("Por favor, selecciona ambas fechas.");
      return;
    }
  
    // Obtener las cuotas (aquí deberías usar tu método para obtener las cuotas)
try {
    const res=await fetch(`/api/cuotas/${userId}`,{
        method:'GET',
        headers: {
            'startDate': inicioDate,
            'endDate': finDate
          }
    })
    const data=await res.json()
    console.log(data)
    cuotasEnRango=data.data
} catch (error) {
    console.log(error)
}

 

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
  document.getElementById('calularCuota').addEventListener('click',calcularCuotas)