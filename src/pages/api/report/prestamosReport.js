import { generateHTMLTable } from "@/templatesPdf/templates";
import { buildPDF } from "../../../lib/pdfkit-table";


import puppeteer from 'puppeteer';

export async function GET({ request }) {
    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      });
  const page = await browser.newPage();

  // Contenido HTML para el PDF
  await page.goto('http://localhost:4321/reportes/reportTabla', {
    waitUntil: 'networkidle0',
  });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
  });

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
console.log('este es el data pdf que llega ',dataPDF)


    try {
      const content = generateHTMLTable(dataPDF.arrayBody,dataPDF.columnas,dataPDF.cabecera,'Ramiro');

      const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        headless: true,
      });
          const page = await browser.newPage();

      
          await page.setContent(content);
          const pdfBuffer = await page.pdf({ format: 'A4' });
          await browser.close();
      
          return new Response(pdfBuffer, {
            headers: {
              'Content-Type': 'application/pdf',
              'Content-Disposition': 'attachment; filename="reporte.pdf"',
            },
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
