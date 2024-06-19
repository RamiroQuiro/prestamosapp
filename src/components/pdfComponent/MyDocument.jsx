import { Document, Page, Text, View } from '@react-pdf/renderer'
import React from 'react'

export default function MyDocument() {
    return (
        <Document>
            <Page>
                <View>
                    <Text>React-pdf</Text></View>
            </Page>
        </Document>
    )
}
