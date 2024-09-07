import { useStore } from "@nanostores/react";
import { pdfPrint } from "../../context/store";
import { generateHTMLTable } from "@/templatesPdf/templates";

export default function ButtonPdf({ children, id, infoData, clienteId }) {
  const $dataTable = useStore(pdfPrint);

  const handlePdfGenerate = async () => {
    try {


      console.log(infoData)
      // Genera una tabla con los datos de los préstamos

      // Generar contenido HTML con los datos obtenidos
      const content = generateHTMLTable(infoData, infoData.cliente.nombre);


      // Enviar el contenido al backend para generar el PDF
      const res = await fetch('/api/report/prestamosReport', {
        method: 'POST',
        body: JSON.stringify({
          dataPDF: content,
        })
      });


      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'prestamos_report.pdf';
      a.click();

    } catch (error) {
      console.log("Error al generar PDF:", error);
    }
  };

  return (
    <button
      id={id}
      onClick={handlePdfGenerate}
      className="px-3 py-1 rounded-lg font-semibold capitalize border-primary-100 duration-300 text-xs border-dashed border bg-transparent hover:bg-primary-100/80 hover:text-white hover:border-primary-resaltado"
    >
      {children}
    </button>
  );
}
