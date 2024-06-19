import { Document, Page, View } from '@react-pdf/renderer'
import React from 'react'
import { createTw } from 'react-pdf-tailwind';
import Cabecera from './Cabecera';




const tw = createTw({
    theme: {
        fontFamily: {
            
        },
        extend: {
            colors: {
                custom: "#bada55",
            },
        },
    },
});
export default function PDFRealizado() {
    return (
        <Document

        >
            <Page
                style={{

                    height: "90vh",
                    fontSize: "10",
                }}
                orientation=""
                size={"A4"}
                fixed
            >


                <Cabecera />
                <View
                    style={tw(
                        "flex flex-col items-center justify-center flex-grow w-11/12 mx-auto rounded-lg overflow-hidden"
                    )} >
</View>
            </Page>
        </Document>
    )
}
