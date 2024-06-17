import PDFDocument from 'pdfkit-table'

export const buildPDF = async ({headers, rows}) => {


    const pdfBuffer = await new Promise(resolve => {

        const doc = new PDFDocument({ margin: 30, size: 'A4', bufferPages: true, })
        let pageNumber = 0;



        doc.text('hola meeen')

        const tableArray = {
            title: "Title",
            subtitle: "Subtitle",
      
            headers: headers,
            rows: rows,
        };
        doc.table(tableArray, { width: doc.page.width - 100, }); // A4 595.28 x 841.89 (portrait) (about width sizes)
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