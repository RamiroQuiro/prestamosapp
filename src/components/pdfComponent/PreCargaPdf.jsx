import { PDFViewer } from '@react-pdf/renderer';
import React from 'react'

export default function PreCargaPdf() {
    return (
        <PDFViewer
            className='w-full rounded-lg  h-[90vh] '

            width={"90%"}
        >
          <div>mi componente</div>
        </PDFViewer>
    )
}

