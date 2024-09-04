import { buildPDF } from "../../../lib/pdfkit-table";


import puppeteer from 'puppeteer';

export async function GET({ request }) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Contenido HTML para el PDF
  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
          }
          h1 {
            color: blue;
          }
          p {
            font-size: 14px;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
          }
        </style>
      </head>
      <body>
        <h1>Reporte Mensual</h1>
        <p>Este es un reporte generado automáticamente.</p>
        <table>
          <tr>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Monto</th>
          </tr>
          <tr>
            <td>Juan Pérez</td>
            <td>01/09/2024</td>
            <td>$1000</td>
          </tr>
          <tr>
            <td>Ana Gómez</td>
            <td>02/09/2024</td>
            <td>$1500</td>
          </tr>
        </table>
      </body>
    </html>
  `;

  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return new Response(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="reporte.pdf"',
    },
  });
}



export async function POST({ request, params }) {

const {dataPDF}=await request.json()
// console.log(dataPDF)
    try {

        const pdf=await buildPDF(dataPDF)
   
        return new Response(pdf, {
            status: 200,
            headers: { 'content-type': `application/pdf`, 'Content-Disposition': 'attachment; filename=document.pdf' },
            
        });
    } catch (error) {
        console.log(error)
        return new Response('error', {
            headers: {
                "Content-Type": "application/pdf",
                'Content-Disposition': 'attachment; filename=document.pdf'
            }
        });
    }

}
