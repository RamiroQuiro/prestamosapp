import PDFDocument from "pdfkit-table";

export const buildPDF = async ({
  headers,
  rows,
  fontSize,
  fontSizeTable,
  lorem,
  subtitle,
}) => {
  const pdfBuffer = await new Promise((resolve) => {
    const doc = new PDFDocument({ margin: 30, size: "A4", bufferPages: true });
    doc.fontSize(fontSize);
    let pageNumber = 0;
    // Agregar los datos del cliente al principio del documento
    doc.text(lorem, {
      lineGap:3
    });

    // doc.rect(doc.x, 10, doc.page.width - 100, doc.y).stroke();
    // datos de la tabla
    const tableArray = {
      // title,
      subtitle,
      headers: headers,
      rows: rows,
    };

    doc.moveDown(2);
    // opciones y estilos de la talba
    const tableOptions = {
      width: doc.page.width - 100,
      padding: 10,
      margin: { top: 20, left: 20, right: 20, bottom: 20 },
      columnSpacing: 5,
      borderWidth: 1,
      borderColor: "#cccccc",
      fillColor: "#f2f2f2",
      lineWidth: 0.5,
      font: "Times-Roman",
      fontSize: 10,
      color: "#333333",
      align: "left",
      valign: "middle",
      headerOptions: {
        fillColor: "#444444",
        textColor: "#ffffff",
        fontSize: 12,
        bold: true,
        align: "center",
      },
      prepareRow: (row, indexColumn, indexRow, rectRow) => {
        doc.font("Helvetica").fontSize(fontSizeTable);
        indexColumn === 0 &&
          doc.addBackground(rectRow, indexRow % 2 ? "" : "#E9E9F1", 0.5);
      },
    };

    //   constructor de la tabla
    doc.moveDown();
    doc.table(tableArray, tableOptions);

    const buffer = [];

    doc.on("data", buffer.push.bind(buffer));
    doc.on("end", () => {
      const data = Buffer.concat(buffer);
      resolve(data);
    });

    doc.end();
  });

  return pdfBuffer;
};
