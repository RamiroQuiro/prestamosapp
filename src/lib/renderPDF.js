import { createElement } from 'react';
import  MyDocument from '../components/pdfComponent/MyDocument';
import { pdf, renderToBuffer } from '@react-pdf/renderer';

export const renderPDF = async (props) => {
  return renderToBuffer(<MyDocument/>);
};