import type { ReceiptConfig } from '@/services/types/receipt';
import type { StatusBadgeProps } from '@/utils/types';
import { Document, Page, Text, View, StyleSheet, Image, Font } from '@react-pdf/renderer';
import { formatDate } from 'date-fns';

Font.register({
    family: 'Montserrat',
    fonts: [
        { src: '/public/fonts/montserrat/Montserrat-Regular.ttf', fontWeight: 400 },
        { src: '/public/fonts/montserrat/Montserrat-Semibold.ttf', fontWeight: 600 },
        { src: '/public/fonts/montserrat/Montserrat-Bold.ttf', fontWeight: 700 }
    ]
});

Font.register({
    family: 'Coolvetica',
    src: '/public/fonts/coolvetica/Coolvetica-bold.ttf',
    fontWeight: 'bold'
})

const styles = StyleSheet.create({
    page: {
        backgroundColor: "#fff",
    },
    main: {
        paddingLeft: 33,
        paddingRight: 33,
        paddingTop: 49,
        paddingBottom: 24,
        display: 'flex',
        flexDirection: 'column',
        gap: 41
    },
    headerSection: {
        display: "flex",
        flexDirection: "column",
        gap: 14
    },
    header: {
        display: "flex",
        flexDirection: "column",
        gap: 18,
        justifyContent: "center",
        alignItems: "center"
    },
    headerText: {
        fontSize: 24,
        lineHeight: 1.25,
        fontFamily: 'Coolvetica',
        color: "#313131"
    },
    date: {
        fontFamily: 'Montserrat',
        lineHeight: 1.25,
        color: "#3E3E3E",
        fontSize: 12,
        textAlign: 'center',
    },
    p: {
        fontFamily: 'Montserrat',
        lineHeight: 1,
        color: "#3E3E3E",
        fontSize: 12
    },
    amount: {
        display: "flex",
        flexDirection: "column",
        gap: 12,
        fontFamily: 'Montserrat',
        alignItems: 'center'
    },
    amountLabel: {
       fontSize: 14,
       lineHeight: 1,
       color: '#3E3E3E'
    },
    amountContent: {
        fontWeight: 600,
        fontSize: 24,
        lineHeight: 1.25
    },
    logo: {
        width: 57,
        height: 57,
        objectFit: 'contain'
    },
    statusBadge: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 16,
    },
    statusDot: {
        width: 6,
        height: 6.25,
        borderRadius: 3,
    },
    statusText: {
        fontSize: 10,
        fontWeight: 'normal',
        lineHeight: 1.25
    },
    table: {
        borderWidth: 1,
        borderColor: '#C9C9C9',
        fontFamily: 'Montserrat'
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
        fontSize: 12,
        color: '#3E3E3E',
        backgroundColor: '#EEEEEE',
        borderRightWidth: 1,
        borderRightColor: '#C9C9C9',
    },
    tableCellDesc: {
        width: '60%',
        padding: 15,
        fontSize: 12,
        color: '#3E3E3E',
        backgroundColor: '#FCFCFC',
        lineHeight: 1.4,
        verticalAlign: 'sub',
        flexWrap: 'wrap'
    },
    tableHeaderText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#3E3E3E',
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
                <View style={styles.main}>
                    <View style={styles.headerSection}>
                        <View style={styles.header}>
                            <Image style={styles.logo} src="https://res.cloudinary.com/dgafp4dx4/image/upload/f_png/v1769946075/receipt-logo_q4eoxr.png" />
                            <Text style={styles.headerText}>Payment Successful</Text>
                            <View style={styles.amount}>
                                <Text style={styles.amountLabel}>
                                    Amount
                                </Text>
                                <Text style={styles.amountContent}>
                                    {`₦${Math.round(data["amount"]).toLocaleString()}`}
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.date}>
                            {formatDate(data["date"], "dd MMM yyyy h:mm aaaaa'm'")}
                        </Text>
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
                </View>
            </Page>
        </Document>
    )
}