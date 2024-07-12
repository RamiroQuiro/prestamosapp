import { prestamoSimulado } from "../../../context/store";


  // Nos suscribimos a los cambios en 'busqueda'
  const fInicio = document.getElementById("fechaInicio");
const fehcaActual=new Date().toISOString()

  export const convertidoraPrecio = (number) => {
    return new Intl.NumberFormat("ars", { maximumSignificantDigits: 3 }).format(
      number
    );
  };


// Inicializar fecha de inicio si no está definida
if (!prestamoSimulado.get().fechaInicio) {
  prestamoSimulado.set({
    ...prestamoSimulado.get(),
    fechaInicio: fehcaActual,
  });
}

console.log('prestamo obeto',prestamoSimulado)
  fInicio.addEventListener("change", (e) => {
const dateChang=new Date(e.target.vale).toISOString()
    prestamoSimulado.set({
      ...prestamoSimulado.get(),
      fechaInicio: e.target.value,
    });
  });

  
  const unsubscribe = prestamoSimulado.subscribe((prestamoSimulado) => {
    // console.log("estamos en la parte presamos", prestamoSimulado);
    const fecha = prestamoSimulado.fechaInicio;
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1; // getMonth() devuelve un índice basado en 0, por lo que se suma 1
    const dia = fecha.getDate();
    const fechaFormateada =
      año +
      "-" +
      (mes < 10 ? "0" + mes : mes) +
      "-" +
      (dia < 10 ? "0" + dia : dia);

    document.getElementById("montoCuota").value = `$ ${prestamoSimulado.montoCuota.toLocaleString()}`;
    document.getElementById("montoTotal").value = `$ ${prestamoSimulado.montoTotal.toLocaleString()}`;
    document.getElementById("interesGenerado").value = `$ ${prestamoSimulado.interesGenerado.toLocaleString()}`;
    document.getElementById("fechaInicio").value = fechaFormateada;

    // Concatenamos los valores de 'nombre', 'apellido' y 'dni'
  });