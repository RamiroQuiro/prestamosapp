import { PDFViewer } from '@react-pdf/renderer'
import React from 'react'
import PreCargaPdf from '../../../../components/pdfComponent/PreCargaPdf'
import PDFRealizado from '../../../../components/pdfComponent/PDFRealizado'

export default function PreCargaPdfListado() {
  return (
  <PDFViewer>

    <PDFRealizado/>
  </PDFViewer>
  )
}
