function generateHTMLTable(infoData, title) {
    return `
        <html>
        <head>
          <link rel="stylesheet" href="./stylesPdf.css">
        </head>
        <body>
          <h1>${title}</h1>
          <table class="table-auto border-collapse border w-full">
            <thead class="bg-primary text-white">
              <tr>
                <th class="text-center">N°</th>
                <th class="text-center">Monto</th>
                <th class="text-center">Pagada</th>
                <th class="text-center">Fecha Vencimiento</th>
              </tr>
            </thead>
            <tbody>
              ${infoData.cuotas.map((cuota, index) => `
                <tr>
                  <td class="text-center">${index + 1}</td>
                  <td class="text-center">${cuota.monto}</td>
                  <td class="text-center">${cuota.pagada ? 'Sí' : 'No'}</td>
                  <td class="text-center">${new Date(cuota.fechaVencimiento).toLocaleDateString()}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
        </html>
    `;
}


export {generateHTMLTable}