import { clienteSelect } from "@/context/store";
import { useStore } from "@nanostores/react";
import React from "react";

export default function ModuloListadoPrestamo({idCliente}) {

    let totalPrestado, totalPagado, prestamosMensuales, pagosMensuales;


  
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
