import React from 'react';

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
    <div className="flex items-center justify-center p-5">
      <button
        onClick={handleDownload}
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded"
      >
        Descargar Reporte PDF
      </button>
    </div>
  );
}
