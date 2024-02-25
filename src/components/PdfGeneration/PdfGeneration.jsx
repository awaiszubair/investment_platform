import ReactPDF, { pdf, Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    section: {
        marginBottom: 10,
    },
    heading: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#374151',
    },
    text: {
        fontSize: 12,
        marginBottom: 5,
        color: '#4B5563',
    },
    link: {
        color: '#3B82F6',
    },
    signatureBox: {
        height: 100,
        backgroundColor: '#E2E8F0',
        position: 'relative',
    },
    signatureText: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        textAlign: 'center',
        padding: 4,
        fontSize: 10,
        color: '#4B5563',
    },
});


const PdfGeneration = ({ data, inputValues }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.heading}>Informace o F E D S s.r.o.</Text>
                    <Text style={styles.text}><strong>IČ:</strong> 25411969</Text>
                    <Text style={styles.text}><strong>Sídlo:</strong> Sokolovská 270/201, 190 00, Praha</Text>
                    <Text style={styles.text}><strong>Web:</strong> <a href="http://www.feds.cz" style={styles.link}>www.feds.cz</a></Text>
                </View>
                {/* <View style={styles.section}>
                    <Text style={styles.heading}>Informace o Zprostředkovateli</Text>
                    <Text style={styles.text}><strong>[RepresentativeName]</strong></Text>
                    <Text style={styles.text}><strong>E-mail:</strong> awaiszubair512@gmail.com</Text>
                    <Text style={styles.text}><strong>Telefonní číslo:</strong> [PhoneNumber]</Text>
                    <View>
                        <Text style={styles.text}><strong>Ev. Číslo:</strong> [EvNumber]</Text>
                        <Text style={styles.text}><strong>RČ:</strong> [PersonalID]</Text>
                        <Text style={styles.text}><strong>Forma zastoupení:</strong> [FormOfRepresentation]</Text>
                    </View>
                    <Text style={styles.text}><strong>Trvalé bydliště:</strong> [PermanentResidence]</Text>
                    <Text style={styles.text}><strong>Korespondenční Adresa:</strong> [CorrespondenceAddress]</Text>
                    <Text style={styles.text}><strong>Doklad totožnosti:</strong> [IdentityDocument]</Text>
                </View> */}
                <View style={styles.section}>
                    <Text style={styles.heading}>Basic Information</Text>
                    <view>
                        Investment Type:
                        <Text style={styles.text}><strong>Invvestment Type:</strong>{inputValues?.name1}</Text>
                    </view>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name2}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name3}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name4}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name5}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name6}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name7}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name8}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name9}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Knowldege</Text>
                    <Text style={styles.text}><strong>Invvestment Type:</strong>{inputValues?.name10}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name11}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name12}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name13}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Investor Profile</Text>
                    <Text style={styles.text}><strong>Invvestment Type:</strong>{inputValues?.name14}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name15}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name16}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name17}</Text>
                    <Text style={styles.text}><strong>Time Duration:</strong>{inputValues?.name18}</Text>
                </View>
                <View style={styles.section}>
                    <Text style={styles.heading}>Investor Experience</Text>
                    <Text style={styles.text}><strong>Invvestment Type:</strong>{inputValues?.name19}</Text>
                </View>
                {/* <View style={styles.section}>
                    <View style={styles.signatureBox}>
                        <Text style={styles.signatureText}>[Jméno Klienta]</Text>
                    </View>
                    <Text style={styles.text}>Podpis Klienta</Text>
                </View>
                <View style={styles.section}>
                    <View style={styles.signatureBox}>
                        <Text style={styles.signatureText}>[Jméno Zprostředkovatele]</Text>
                    </View>
                    <Text style={styles.text}>Podpis Zprostředkovatele</Text>
                </View> */}
                <Text style={styles.text}>Praha, [Datum]</Text>
            </Page>
        </Document>
    );
};

export default PdfGeneration
