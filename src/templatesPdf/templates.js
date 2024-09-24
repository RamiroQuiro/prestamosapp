function generateHTMLTable(arrayBody, columnas, cabecera) {
  console.log(cabecera, arrayBody, cabecera);
  return `
      <html>
      <head>
        <style>
          body {
            font-family: Verdana, Arial, Helvetica, sans-serif;
            padding: 25px 10px;
          }
          
              table {
                width: 95%;
                border-collapse: collapse;
                background-color: transparent;
                border-radius: 0.375rem; /* rounded-md */
                overflow: hidden;
                margin:auto
              }


              span {
                font-size: 0.625rem; /* text-[10px] */
                font-weight: 300; /* font-thin */
               
                border-radius: 9999px; /* rounded-full */
              }
          .filaCabecera{
              background-color:#5B2CE4;
              border-top: 2px double #8C6BEC;
              border-bottom: 2px double #8C6BEC;
              border-top-left-radius: 15px;
              border-top-rigth-radius: 15px;
              // border-radius: 9999px; /* rounded-full */
          }
          .tablaCabecera{
              text-transform: capitalize;
              color:#121019;
              font-Size:12px;
              // border-left: 1px solid #cccccc;
          
              text-align: center;
              padding: 0.75rem 0.5rem; /* py-3, px-2 */
          }

          .tablaBody {
              padding: 0.50rem 0.25rem; /* py-3, px-2 */
              color:#525659;
              font-Size:11px;
              border-left: 1px solid #cccccc50;
              border-bottom: 1px solid #21212180;
              text-align: center;
          }
            .hero{

            }
            .tituloPrestaApp{
              color:#8C6BEC;
              font-size:26px;
            }

            .contenedorInfoUsuario{
            display:flex;
            flex-direction: column;
            font-size: 16px;
             text-transform: capitalize;
              }
            .contenedorInfoCliente{
            width:full;
            display:flex;
            align-items:start;
            gap:10px;
            font-size:12px;
            padding:10px 0;
            border-top:1px solid #21212180;
            border-bottom:1px solid #21212180;
            }
            .contenedorInfoPrestamo{
            display:flex;
            align-items: start;
            justify-content: flex-start;
            flex-wrap:wrap;
            gap:0 10px;
            font-size: 12px;
            align-text:center;

            }
            .flex{
            width:auto;
            display:flex;
            flex-direction:row;
            gap:25px
            }
        </style>
      </head>
      <body>
        <header>
        <div class="hero ">
            <h1 class=" tituloPrestaApp">
            PrestamosAPP
            </h1>
            <div class="contenedorInfoUsuario flex">
              <div>
              <img src="http://localhost:4321/logo.png" alt="logo" width="150px" heigth="150px"/>
              </div>
              <div>
                  <p >Prestamista: ${cabecera?.usuario?.nombre} ${` `} ${cabecera?.usuario?.apellido}</p>
                  <div class="flex">
                  <p >DNI: ${cabecera?.usuario?.dni} </p>  <p >Dirección: ${cabecera?.usuario?.direccion} </p>
                  </div>
              </div>
            </div>
            ${
              cabecera?.cliente
                ? `<div class="contenedorInfoCliente">
                  <p >Cliente: ${cabecera?.cliente?.nombre} ${` `} ${
                    cabecera?.cliente?.apellido
                  } </p>
                  <div class="flex">
                      <p >DNI: ${cabecera?.cliente?.dni} </p>  <p >Dirección: ${
                    cabecera?.cliente?.direccion
                  } </p>
                  </div>
              </div>`
                : `<div></div>`
            }
            
           ${
             cabecera.title
               ? `<div class="contenedorInfoPrestamo">
              <p style="">${cabecera?.title} 👇 </p>
            </div>`
               : `<div></div>`
           }

                ${
             cabecera?.prestamo ?
             `<div class="contenedorInfoPrestamo">
              <p style="border-radius:20px; border: 1px solid #cecece; padding:0.25rem 0.4rem;">idPrestamo: ${cabecera?.prestamo?.id} </p>
              <p style="border-radius:20px; border: 1px solid #cecece; padding:0.25rem 0.4rem;">Capital: $${cabecera?.prestamo?.capital.toLocaleString()} </p>
              <p style="border-radius:20px; border: 1px solid #cecece; padding:0.25rem 0.4rem;">Monto Total: $${cabecera?.prestamo?.montoTotal.toLocaleString()} </p>
              <p style="border-radius:20px; border: 1px solid #cecece; padding:0.25rem 0.4rem;">Numero de Cuotas: ${cabecera?.prestamo?.nCuotas} </p>
              <p style="border-radius:20px; border: 1px solid #cecece; padding:0.25rem 0.4rem;">Modalidad: ${cabecera?.prestamo?.modalidad} </p>
              <p style="border-radius:20px; border: 1px solid #cecece; padding:0.25rem 0.4rem;">Fecha de Inicio: ${cabecera?.prestamo?.fechaInicio} </p>
              <p style="border-radius:20px; border: 1px solid #cecece; padding:0.25rem 0.4rem;"> Fecha de Termino: ${cabecera?.prestamo?.fechaFin} </p>
            </div>`
            :
            `<div></div>`
           }
        </div>
        </header>
        <table class="">
            <thead>
              <tr  class="filaCabecera" >
                ${Object.values(columnas).map((columna) => {
                  return `<th class="tablaCabecera">
                            ${columna?.label}
                            </th>`;
                }).join("")}
              </tr>
            </thead>

        <tbody>
            ${Object.values(arrayBody)
              .map((cliente) => {
                const dataSinId = { ...cliente };
                delete dataSinId.id;
                delete dataSinId.href;
                return `
                <tr>
                  ${Object.values(dataSinId)
                    .map((value) => {
                      // Chequeo para evitar valores vacíos o nulos
                      let displayValue = "";
                      if (typeof value === "boolean") {
                        displayValue = value ? "✓" : "✕";
                      } else if (value instanceof Date) {
                        displayValue = value.toLocaleDateString();
                      } else if (value !== null && value !== undefined) {
                        displayValue = value.toString().trim();
                      }

                      // Renderizar celda de la tabla
                      return `
                      <td class="border-t-0 px-2 tablaBody align-middle text-center py-3 border-l-0 border-r-0 text-xs whitespace-nowrap">
                        ${displayValue || ""}
                      </td>
                    `;
                    })
                    .join("")}
                </tr>
              `;
              })
              .join("")}
          </tbody>

        </table>
      </body>
      </html>
  `;
}

export { generateHTMLTable };
