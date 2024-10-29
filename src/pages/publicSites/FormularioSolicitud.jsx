import InputFormularioSolicitud from "@/components/moleculas/InputFormularioSolicitud";
import { showToast } from "@/components/Toast/toastShow";
import React, { useState } from "react";

export default function FormularioSolicitud({ usuarioId }) {
  const [isPrestamoSimulado, setIsPrestamoSimulado] = useState(false);
  const [prestamosSimulado, setPrestamosSimulado] = useState({});
  const [formularioSolicitud, setFormularioSolicitud] = useState({});
  const modalidad = [
    { name: "semanal", id: 1, value: 7 },
    { name: "quincenal", id: 2, value: 15 },
    { name: "mensual", id: 3, value: 30 },
  ];

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(formularioSolicitud);
    // Validar que todos los campos estén completos
    const requiredFields = [
      "nombreApellido",
      "dni",
      "direccion",
      "email",
      "celular",
      "importe",
      "nCuotas",
    ];
    const emptyFields = requiredFields.filter(
      (field) => !formularioSolicitud[field]
    );

    if (emptyFields.length > 0) {
      showToast("Complete todos los datos"); // Muestra el mensaje de advertencia
      return;
    }
    try {
      const prestamoFetching = await fetch("/api/prestamos/calcularPrestamo", {
        method: "POST",
        body: JSON.stringify({ ...formularioSolicitud, usuarioId }),
      });

      const data = await prestamoFetching.json();
      console.log(data);
      if (prestamoFetching.status == 200) {
        setPrestamosSimulado(data);
        setIsPrestamoSimulado(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    setFormularioSolicitud({
      ...formularioSolicitud,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="w-full h-full flex items-stretch ">
      {!isPrestamoSimulado ? (
        <form
          action=""
          class="flex flex-col w-full items-center justify-normal p-3 text-primary-texto animate-aparecer"
        >
          <div class="flex item-center w-full justify-normal gap-2 ">
            <InputFormularioSolicitud
              onchange={handleChange}
              name="nombreApellido"
              id="nombreApellido"
              type="text"
            >
              Nombre y Apellido
            </InputFormularioSolicitud>
            <InputFormularioSolicitud
              onchange={handleChange}
              name="dni"
              id="dni"
              type="number"
            >
              DNI
            </InputFormularioSolicitud>
          </div>
          <InputFormularioSolicitud
            onchange={handleChange}
            name="direccion"
            id="direccion"
            type="text"
          >
            Dirección
          </InputFormularioSolicitud>
          <div class="flex item-center w-full justify-normal gap-2 ">
            <InputFormularioSolicitud
              onchange={handleChange}
              name="email"
              id="email"
              type="text"
            >
              email
            </InputFormularioSolicitud>
            <InputFormularioSolicitud
              onchange={handleChange}
              name="celular"
              id="celular"
              type="number"
            >
              Celular
            </InputFormularioSolicitud>
          </div>
          <div class="flex item-cente justify-normal gap-2 w-full border-t mt-4 animate-aparecer">
            <InputFormularioSolicitud
              onchange={handleChange}
              name="importe"
              id="importe"
              type="number"
            >
              Monto a solicitar
            </InputFormularioSolicitud>
            <InputFormularioSolicitud
              onchange={handleChange}
              name="nCuotas"
              id="nCuotas"
              type="number"
            >
              Cuotas
            </InputFormularioSolicitud>
          </div>
          <div class="w-full flex items flex-col items-start gap-1 duration-300 group -md p-3">
            <label className="text-primary-texto duration-300 group-hover  group-hover:text-primary-200 capitalize focus:text-primary-200 text-sm">
              Modalidad
            </label>
            <select
              onchange={handleChange}
              id="tipoInteres"
              class={`${"style"} w-full text-sm bg-primary-200/10 group-hover:ring-2 rounded-lg  border-gray-300  ring-primary-200/60 focus:ring-2  outline-none transition-colors duration-200 ease-in-out px-2 py-2`}
            >
              {modalidad.map((opcion) => {
                return (
                  <option value={opcion.value} id={opcion.id} class="">
                    {opcion.name || opcion.value}
                  </option>
                );
              })}
            </select>
          </div>
          <button
            onClick={handleClick}
            className="bg-blue-400 px-2 py-1 mt-2 w-auto text-white text-xs md:text-sm font-ssemibold mb-4 rounded shadow hover:bg-blue-600 duration-300"
          >
            Simular
          </button>
        </form>
      ) : (
        <div className="flex flex-col w-full text-g  h-full">
          <h2>Cuotas Iniciales</h2>
          {prestamosSimulado?.cuotas.slice(0, 3).map((cuota, i) => (
           <InputFormularioSolicitud value={cuota} key={i}>
              Cuota N°{i + 1}{"   -  "}
           </InputFormularioSolicitud>
          ))}
          <p className="bg-orange-400 px-1 py-2 font-semibold text-sm  capitalize">
            monto total: $
            {Number(prestamosSimulado.ganancia) +
              Number(formularioSolicitud.importe)}
          </p>
          <div className="flex items-start gap-4 my-5">

          <button className="bg-blue-400 px-2 py-1  w-auto text-white text-xs md:text-sm font-ssemibold mt4 rounded shadow hover:bg-blue-600 duration-300" onClick={() => setIsPrestamoSimulado(false)}>
            Volver a simular
          </button>
          <button className="bg-blue-400 px-2 py-1  w-auto text-white text-xs md:text-sm font-ssemibold mb4 rounded shadow hover:bg-blue-600 duration-300" onClick={() => setIsPrestamoSimulado(false)}>
            Solicitar
          </button>
          </div>
        </div>
      )}
    </div>
  );
}
