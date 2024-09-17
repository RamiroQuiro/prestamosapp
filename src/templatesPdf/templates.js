function generateHTMLTable(arrayBody, columnas, title) {
  return `
      <html>
      <head>
        <style>
          body {
            font-family: Verdana, Arial, Helvetica, sans-serif
          }
            p {
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
              border-top-left-radius: 10px;
              border-top-rigth-radius: 10px;
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
           padding: 0.75rem 0.5rem; /* py-3, px-2 */
              color:#525659;
              font-Size:11px;
              border-left: 1px solid #cccccc50;
              text-align: center;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <table class="">
           <thead class="">
              <tr  class="filaCabecera" >
                ${columnas?.map((columna) => {
                  return `<th class="tablaCabecera">
                            ${columna?.label}
                            </th>`;
                })}
              </tr>
            </thead>

            <tbody class="">
            ${arrayBody.map((cliente) => {
              const dataSinId = { ...cliente };
              delete dataSinId.id;
              delete dataSinId.href;
              return `<tr >
                      ${Object?.values(dataSinId)?.map((value, i) => {
                        return `<td class="border-t-0 px-2  tablaBody  align-middle text-center  py-3 border-l-0 border-r-0 text-xs whitespace-nowrap  ">
                                  ${
                                    typeof value === "boolean"
                                      ? `<span> ${
                                          dataSinId.estado ? "✓" : "✕"
                                        }</span>`
                                      : value instanceof Date
                                      ? `${value.toLocaleDateString()}`
                                      : `${value}`
                                  }
                          </td>`;
                      })}
                </tr>`;
            })}
            </tbody>
        </table>
      </body>
      </html>
  `;
}

export { generateHTMLTable };
