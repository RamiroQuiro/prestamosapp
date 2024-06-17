import {
    View,
    Text,
} from "@react-pdf/renderer";

export default function ItemHeadTablePDF({ head, style }) {
    return (
        <View style={style} >
            <Text>{head.name}</Text>
        </View>
    )
}