import { useStore } from "@nanostores/react";
import { pdfPrint } from "../../context/store";

export default function ButtonPdf({ handleClick, title, subtitle, children, id }) {

    const $dataTable = useStore(pdfPrint)

    const handlePdfGenerate = async () => {
        try {
            const res = await fetch('/api/report/prestamosReport', {
                method: 'POST',
                body: JSON.stringify({
                    dataPDF: $dataTable,
                })
            })
                .then(response => response.blob())
                .then(blob => {
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = 'document.pdf';
                    a.click();
                });
        } catch (error) {
            console.log(error)
        }
    }

    return (


        <button
            id={id}
            onClick={handlePdfGenerate}

            className={`${' '} px-3 py-1 rounded-lg font-semibold capitalize border-primary-100 duration-300 text-xs border-dashed border bg-transparent hover:bg-primary-100/80 hover:text-white hover:border-primary-resaltado`}>

            {children}
        </button>


    )
}
