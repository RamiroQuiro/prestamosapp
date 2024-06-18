import PDFDocument from 'pdfkit-table'

export const buildPDF = async ({ headers, rows, title, subtitle }) => {


    const pdfBuffer = await new Promise(resolve => {

        const doc = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true, })
        doc.fontSize(10);
        let pageNumber = 0;
        doc.text(`Cliente : ${'ramiroQuiroga'}`).fontSize(10)
        doc.text(`Dni : ${'ramiroQuiroga'}`)
        doc.text(`Fecha de Inicio : ${'ramiroQuiroga'}`)
        doc.text(`Capital : ${'ramiroQuiroga'}`)
        doc.text(`Monto Total : ${'ramiroQuiroga'}`)
        doc.text(`Modalidad : ${'ramiroQuiroga'}`)
        doc.text(`ID del Prestamo : ${'ramiroQuiroga'}`)

        // doc.rect(doc.x, 10, doc.page.width - 100, doc.y).stroke();
        // datos de la tabla
        const tableArray = {
            // title,
            // subtitle,
            headers: headers,
            rows: rows,
        };

    doc.moveDown(2)
        // opciones y estilos de la talba
        const tableOptions = {
            width: doc.page.width - 100,
            padding: 10,
            borderWidth: 1,
            borderColor: 'black',
            // y: 100,

            textOptions: {
                font: 'Helvetica',
                size: 12,
                color: 'blue',
                align: 'center',
                valign: 'center'
            },
            headerOptions: {
                background: '#5B2CE4',
                font: 'Helvetica-Bold',
                size: 10,
                color: 'red',
                align: 'center',
                valign: 'center'
            },
            prepareRow: (row, indexColumn, indexRow, rectRow) => {
                doc.font("Helvetica").fontSize(10);
                indexColumn === 0 && doc.addBackground(rectRow, (indexRow % 2 ? 'gray' : '#E9E9F1'), 0.5);
            },
        };


        //   constructor de la tabla
        doc.moveDown()
        doc.table(tableArray, tableOptions);
        doc.moveDown(5);
        doc.text('andano pdf')

        doc.moveDown()




        const buffer = []

        doc.on('data', buffer.push.bind(buffer))
        doc.on('end', () => {
            const data = Buffer.concat(buffer)
            resolve(data)
        })

        doc.end()
    })

    return pdfBuffer
}