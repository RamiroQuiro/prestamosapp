import PDFDocument from 'pdfkit-table'

export const buildPDF = async ({ headers, rows,title, subtitle}  ) => {


    const pdfBuffer = await new Promise(resolve => {

        const doc = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true, })
        let pageNumber = 0;
        doc.text('RamaCode')
        // datos de la tabla
        const tableArray = {
            title,
            subtitle,
            headers: headers,
            rows: rows,
        };

        // opciones y estilos de la talba
        const tableOptions = {
            width: doc.page.width - 100,
            padding: 5,
            borderWidth: 1,
            borderColor: 'black',
            backgroundColor: 'gray',
            textOptions: {
                font: 'Helvetica',
                size: 10,
                color: 'blue',
                align: 'center',
                valign: 'center'
            },
            headerOptions: {
                font: 'Helvetica-Bold',
                size: 12,
                color: 'red',
                align: 'center',
                valign: 'center'
            }
        };


        //   constructor de la tabla
        doc.table(tableArray, tableOptions);
        doc.moveDown()

        doc.text('andano pdf')



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