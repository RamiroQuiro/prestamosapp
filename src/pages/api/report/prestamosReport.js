import { generateHTMLTable } from "@/templatesPdf/templates";
import { buildPDF } from "../../../lib/pdfkit-table";

import puppeteer from "puppeteer";
import  db from "@/db";
import { users as User} from "@/db/schema";
import { eq } from "drizzle-orm";

export async function GET({ request }) {
  const browser = await puppeteer.launch({
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
    headless: true,
  });
  const page = await browser.newPage();

  // Contenido HTML para el PDF
  await page.goto("http://localhost:4321/reportes/reportTabla", {
    waitUntil: "networkidle0",
  });

  const pdfBuffer = await page.pdf({
    path:'reportesPdf',
    format: "A4",
    printBackground: true,
  });

  await browser.close();

  return new Response(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="reporte.pdf"',
    },
  });
}

export async function POST({ request, params }) {


  const {
    dataPDF: { arrayBody, columnas, cabecera },
  } = await request.json();
  if (!cabecera || !cabecera.usuario || !cabecera.usuario.id) {
    console.log("no llegó la cabecera");
    return new Response(
      JSON.stringify({
        msg: "falta id del usuario o es inválido",
      })
    );
  }
  
  try {
    const dataUser = (await db.select({
        nombre: User.nombre,
        apellido: User.apellido,
        dni: User.dni,
        direccion: User.direccion,
      })
      .from(User)
      .where(eq(User.id, cabecera.usuario.id))).at(0)
    // console.log('datos del ausuario',dataUser);
cabecera.usuario={...cabecera.usuario,...dataUser}
    const content = generateHTMLTable(arrayBody, columnas, cabecera, "Ramiro");
    const browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
    const page = await browser.newPage();

    await page.setContent(content);
    const pdfBuffer = await page.pdf({ format: "A4" });
    await browser.close();

    return new Response(pdfBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="reporte.pdf"',
      },
    });
  } catch (error) {
    console.log(error);
    return new Response("error", {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": "attachment; filename=document.pdf",
      },
    });
  }
}
