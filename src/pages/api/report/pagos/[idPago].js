import db from "@/db";
import { generateHTMLComprobantePago } from "@/templatesPdf/comprobantePagoTemplate";
import puppeteer from "puppeteer";
import {users as User, clientes as Cliente, pagos as Pago} from '@/db/schema'
export async function GET({ params, props, request }) {
    const { idPago } = await params;
    try {
       let dataPago = (
            await db
              .select({
                usuario: {
                  userName: User.userName,
                  src: User.srcPhoto,
                  nombre: User.nombre,
                  apellido: User.apellido,
                  dni: User.dni,
                  direccion: User.direccion,
                  provincia: User.ciudad,
                  celular: User.celular,
                },
                cliente: {
                  id: Cliente.id,
                  nombre: Cliente.nombre,
                  apellido: Cliente.apellido,
                  dni: Cliente.dni,
                  direccion: Cliente.direccion,
                  ciudad: Cliente.ciudad,
                  celular: Cliente.celular,
                },
                pago: Pago,
              })
              .from(Pago)
              .where(eq(Pago.id, idPago))
              .innerJoin(User, eq(User.id, Pago.usuarioId))
              .innerJoin(Cliente, eq(Cliente.id, Pago.clienteId))
          ).at(0);
    
        // console.log('cuotas encontradas ->',dataPago);
       
       
       
        const content = generateHTMLComprobantePago(dataPago,'cabecera');
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
       console.log(error)
        return new Response(
          JSON.stringify({
            data: "hello andando men",
          })
        );
      }

}