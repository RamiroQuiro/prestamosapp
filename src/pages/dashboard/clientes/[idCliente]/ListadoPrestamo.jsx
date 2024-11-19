import { clienteSelect } from "@/context/store";
import { useStore } from "@nanostores/react";
import React from "react";

export default function ListadoPrestamo({idCliente}) {

    let totalPrestado, totalPagado, prestamosMensuales, pagosMensuales;


    function calcularTotalPrestado(prestamos) {
        return prestamos.reduce((total, prestamo) => total + prestamo.capital, 0);
      }
      function calcularTotalPagado(pagos, pagosParciales) {
        const totalPagos = pagos.reduce((total, pago) => total + pago.montoPago, 0);
        const totalPagosParciales = pagosParciales.reduce(
          (total, pago) => total + pago.montoPago,
          0
        );
    
        return totalPagos + totalPagosParciales;
      }
      function pagosPorMes(pagos, pagosParciales) {
        const todosLosPagos = [...pagos, ...pagosParciales];
        return todosLosPagos.reduce((acc, pago) => {
          const mes = pago.fechaPago.getMonth() + 1; // Enero es 0
          const año = pago.fechaPago.getFullYear();
          const clave = `${mes}-${año}`;
    
          if (!acc[clave]) {
            acc[clave] = 0;
          }
          acc[clave] += pago.montoPago;
    
          return acc;
        }, {});
      }
    
      function prestamosFecha(prestamos) {
        const newArray = prestamos.reduce((acc, prestamo) => {
          const mes = prestamo.fechaCreacion.getMonth() + 1; // Enero es 0
          const año = prestamo.fechaCreacion.getFullYear();
          const date = prestamo.fechaCreacion;
          const clave = `${mes}-${año}`;
          if (!acc[clave]) {
            acc[clave] = 0;
          }
          acc[clave] += prestamo.capital;
    
          return acc;
        }, {});
        return newArray;
      }

    const clienteSeleccionado=useStore(clienteSelect)

    console.log(clienteSeleccionado)
  return (
    <div class="my-3 flex flex-col w-full h-full items-start justify-normal">
      <div class="flex text-sm gap-2 mb-3">
        <h3 class="text-sm">Total de Fondos </h3>
        <span class="font-semibold">${totalPrestado?.toLocaleString()}</span>
      </div>

      <div class="w-full flex flex-col items-start ">
        {prestamosMensuales?.map((prestamo, i) => {
          // const date = new Date(prestamo[0]);

          return (
            <div class=" w-full bg-primary-300/30 px-1 border-y py-0.5 font- text-sm ">
              → {`${prestamo[0]}`} | {`$${prestamo[1].toLocaleString()}`}
            </div>
          );
        })}
      </div>
    </div>
  );
}
