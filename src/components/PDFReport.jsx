import Button3 from './atomos/Button3';

export default function DescargarPDF() {
    const handleDownload = async () => {
        try {
            const response = await fetch('/api/report/prestamosReport');
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'reporte.pdf';
            document.body.appendChild(a);
            a.click();
            a.remove();
        } catch (error) {
            console.error('Error al descargar el PDF:', error);
        }
    };

    return (
        <Button3 onClick={handleDownload}>



            Descargar Reporte PDF
        </Button3>
    );
}
