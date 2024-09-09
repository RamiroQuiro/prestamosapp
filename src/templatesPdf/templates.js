function generateHTMLTable(arrayBody, columnas, title) {



  return `
      <html>
      <head>
        <style>
          table {
  width: 100%;
  border-collapse: collapse;
  background-color: transparent;
  border-radius: 0.375rem; /* rounded-md */
  overflow: hidden;
}
  thead {
  background-color:#8C6BEC
  color: white;
}
        th {
  text-align: center;
  font-size: 0.75rem; /* text-xs */
  font-weight: 600; /* font-semibold */
  text-transform: uppercase;
  padding: 0.75rem 0; /* py-3 */
  border: 1px solid; /* border border-solid */
  border-left: none; /* border-l-0 */
  border-right: none; /* border-r-0 */
  white-space: nowrap;
}

td {
  padding: 0.75rem 0.5rem; /* py-3, px-2 */
  text-align: center;
  font-size: 0.75rem; /* text-xs */
  white-space: nowrap;
  border-top: none; /* border-t-0 */
  border-left: none; /* border-l-0 */
  border-right: none; /* border-r-0 */
  border-bottom: 1px solid; /* border-b */
}

span {
  background-color: #f87171; 
  color: white;
  font-size: 0.625rem; /* text-[10px] */
  font-weight: 300; /* font-thin */
  padding: 0.25rem 0.5rem; /* px-2, p-1 */
  border-radius: 9999px; /* rounded-full */
}
          h1 {
            text-align: center;
            color: #333;
          }
        </style>
      </head>
      <body>
        <h1>${title}</h1>
        <table class="table-auto border-collapse border w-full">
           <thead className="bg-primary-100/70 rounded-md text-white w-auto">
            <tr id='cabeceraTable' className="rounded-md">
               ${columnas?.map((columna) => {
    return (`<th class="align-middle border border-solid py-3 text-xs uppercase  border-l-0 border-r-0 whitespace-nowrap font-semibold text-center">
                          ${columna?.label}
                          </th>`
    )
  })
    }
            </tr><<
        </thead>

          <tbody>
          ${arrayBody.map(cliente => {
            const dataSinId = { ...cliente };
            delete dataSinId.id;
            delete dataSinId.href
            return(
      `<tr>
                     ${Object?.values(dataSinId)?.map((value, i) => (
        `<td >${value}</td>`
      ))}
              </tr>`
    )})
    }
          </tbody>
        </table>
      </body>
      </html>
  `;
}

export { generateHTMLTable };
