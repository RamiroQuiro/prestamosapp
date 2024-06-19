import { renderPDF } from "../../../lib/renderPDF";
import PDFRealizado from "../../../components/pdfComponent/PDFRealizado";

export async function GET({ request, params }) {
  try {
    // Genera el blob del PDF
    const pdfBlob = await renderPDF();
    console.log(pdfBlob);
    // Configura los headers para indicar que se está enviando un PDF
    const headers = new Headers();
    headers.append("Content-Type", "application/pdf");
    headers.append("Content-Disposition", 'attachment; filename="report.pdf"');

    // Crea la respuesta con el blob del PDF y los headers
    return new Response(pdfBlob, { headers });
  } catch (error) {
    console.log(error);

    return new Response(
      JSON.stringify({
        msg: "error consola",
        status: 400,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 400,
      }
    );
  }
}
