import type { ReceiptConfig } from '@/services/types/receipt';
import type { StatusBadgeProps } from '@/utils/types';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { formatDate } from 'date-fns';

Font.register({
    family: 'Montserrat',
    src: '/fonts/montserrat/Montserrat-Regular.ttf'
},);

Font.register({
    family: 'Coolvetica',
    src: '/fonts/coolvetica/Coolvetica-bold.ttf',
    fontWeight: 'bold'
})

const styles = StyleSheet.create({
    page: {
        paddingLeft: 33,
        paddingRight: 33,
        paddingTop: 24,
        paddingBottom: 64,
        backgroundColor: "#fff",
    },
    headerSection: {
        display: "flex",
        flexDirection: "column",
        gap: 12
    },
    header: {
        display: "flex",
        flexDirection: "column",
        gap: 24,
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontSize: 24,
        // lineHeight: 1.25,
        fontFamily: 'Coolvetica',
        color: "#313131"
    },
    date: {
        fontFamily: 'Montserrat',
        // lineHeight: 20,
        color: "#3E3E3E",
        textAlign: 'center'
    },
    p: {
        fontFamily: 'Montserrat',
        // lineHeight: 1,
        color: "#3E3E3E"
    },
    amount: {
        display: "flex",
        flexDirection: "column",
        gap: 16
    },
    logo: {
        width: 57,
        height: 57
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 16,
    },
    statusDot: {
        width: 6,
        height: 6,
        borderRadius: 3,
        marginRight: 6,
    },
    statusText: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    table: {
        borderWidth: 1,
        borderColor: '#C9C9C9',
    },
    tableHeader: {
        flexDirection: 'row',
        backgroundColor: '#EEEEEE',
        borderBottomWidth: 1,
        borderBottomColor: '#C9C9C9',
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#C9C9C9',
    },
    tableCellTitle: {
        width: '40%',
        padding: 15,
        fontSize: 14,
        color: '#737373',
        backgroundColor: '#EEEEEE',
        borderRightWidth: 1,
        borderRightColor: '#C9C9C9',
    },
    tableCellDesc: {
        width: '60%',
        padding: 15,
        fontSize: 14,
        color: '#737373',
        backgroundColor: '#FCFCFC',
        // lineHeight: 1.4,
    },
    tableHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#313131',
    },
})


const PDFStatusBadge = ({ label, bgColor, labelColor, dotColor }: StatusBadgeProps) => (
    <View style={[styles.statusBadge, { backgroundColor: bgColor }]}>
        <View style={[styles.statusDot, { backgroundColor: dotColor }]} />
        <Text style={[styles.statusText, { color: labelColor }]}>{label}</Text>
    </View>
);

const ReceiptTableRow = ({ label, content }: { label: string; content: any }) => (
    <View style={styles.tableRow}>
        <View style={styles.tableCellTitle}>
            <Text>{label}</Text>
        </View>
        <View style={styles.tableCellDesc}>
            {typeof content === 'string' || typeof content === 'number' ? (
                <Text>{content}</Text>
            ) : content?.label ? (
                <PDFStatusBadge {...content} />
            ) : (
                <Text>{String(content)}</Text>
            )}
        </View>
    </View>
);


export default function ReceiptTemplate({
    config,
    data
}: { config: ReceiptConfig, data: any}) {
    if (!data) {
        return null;
    }

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.headerSection}>
                    <View style={styles.header}>
                        <Image style={styles.logo} src="/images/receipt-logo.png" />
                        <Text style={styles.headerText}>{config.title}</Text>
                    </View>
                    <Text style={styles.date}>{formatDate(new Date().toISOString(), "dd MM yyyy h:mm  aaaaa'm'")}</Text>
                </View>
                <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <View style={styles.tableCellTitle}>
                            <Text style={styles.tableHeaderText}>Title</Text>
                        </View>
                        <View style={styles.tableCellDesc}>
                            <Text style={styles.tableHeaderText}>Description</Text>
                        </View>
                    </View>
                    {data && config.fields.map((field, index) => {
                        const rawValue = data[field.key];

                        if (field.hideIfEmpty && !rawValue) return null;

                        const formattedValue = field.format
                            ? field.format(rawValue)
                            : rawValue;
                        
                        
                        return (
                            <ReceiptTableRow
                                key={index}
                                label={field.label}
                                content={formattedValue}
                            />
                        )
                    })}
                </View>
            </Page>
        </Document>
    )
}