import { buildPDF } from "../../../lib/pdfkit-table";


export async function POST({ request, params }) {

const dataPDF=await request.json()

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
