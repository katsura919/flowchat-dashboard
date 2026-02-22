import React from "react";
import { Document, Page, Text, View, StyleSheet, Image, Canvas } from "@react-pdf/renderer";

const C = {
    primary: "#4f46e5",
    gold: "#d97706",
    white: "#ffffff",
    black: "#111111",
    muted: "#6b7280",
    border: "#e5e7eb",
    bg: "#fafafa",
};

const s = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: C.white,
        fontFamily: "Helvetica",
    },
    container: {
        flex: 1,
        borderWidth: 1.5,
        borderColor: C.gold,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        padding: 40,
    },
    outerBorder: {
        position: "absolute",
        top: -20,
        left: -20,
        right: -20,
        bottom: -20,
        borderWidth: 12,
        borderColor: C.primary,
    },
    cornerTL: {
        position: "absolute",
        top: -20,
        left: -20,
        width: 60,
        height: 60,
        borderTopWidth: 4,
        borderLeftWidth: 4,
        borderColor: C.gold,
    },
    cornerBR: {
        position: "absolute",
        bottom: -20,
        right: -20,
        width: 60,
        height: 60,
        borderBottomWidth: 4,
        borderRightWidth: 4,
        borderColor: C.gold,
    },
    logo: {
        fontSize: 22,
        fontFamily: "Helvetica-Bold",
        color: C.primary,
        marginBottom: 35,
        textTransform: "uppercase",
        letterSpacing: 4,
    },
    headerLabel: {
        fontSize: 12,
        color: C.gold,
        textTransform: "uppercase",
        letterSpacing: 3,
        marginBottom: 8,
        fontFamily: "Helvetica-Bold",
    },
    title: {
        fontSize: 44,
        fontFamily: "Helvetica-Bold",
        color: C.black,
        marginBottom: 20,
        textAlign: "center",
        letterSpacing: 2,
    },
    presentLabel: {
        fontSize: 14,
        fontStyle: "italic",
        color: C.muted,
        marginBottom: 15,
    },
    nameContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 25,
        paddingBottom: 5,
        borderBottomWidth: 2,
        borderBottomColor: C.primary,
        minWidth: 400,
    },
    candidateName: {
        fontSize: 40,
        fontFamily: "Helvetica-Bold",
        color: C.primary,
        textAlign: "center",
        paddingHorizontal: 20,
    },
    description: {
        fontSize: 11,
        color: C.muted,
        textAlign: "center",
        lineHeight: 1.8,
        paddingHorizontal: 80,
        marginBottom: 45,
    },
    footer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 60,
        marginTop: 10,
    },
    signatureBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 180,
    },
    signatureLine: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: C.black,
        marginBottom: 8,
    },
    trainerName: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        color: C.black,
        marginBottom: 2,
    },
    signatureLabel: {
        fontSize: 8,
        color: C.muted,
        textTransform: "uppercase",
        letterSpacing: 1,
    },
    dateBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 180,
    },
    dateValueContainer: {
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: C.black,
        marginBottom: 8,
        paddingBottom: 4,
    },
    dateValue: {
        fontSize: 14,
        fontFamily: "Helvetica-Bold",
        color: C.black,
        textAlign: "center",
    },
});

export interface CertificateData {
    candidateName: string;
    trainerName: string;
    date: string;
}

export function CertificatePdf({ candidateName, trainerName, date }: CertificateData) {
    const formattedDate = date ? new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    }) : new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    return (
        <Document title="VA Certification" author="FlowChat">
            <Page size="A4" orientation="landscape" style={s.page}>
                <View style={s.container}>
                    <View style={s.outerBorder} />
                    <View style={s.cornerTL} />
                    <View style={s.cornerBR} />

                    <Text style={s.logo}>FlowChat</Text>

                    <Text style={s.headerLabel}>Performance Excellence</Text>
                    <Text style={s.title}>VA CERTIFICATION</Text>

                    <Text style={s.presentLabel}>This highly distinguished honor is presented to</Text>

                    <View style={s.nameContainer}>
                        <Text style={s.candidateName}>{candidateName.toUpperCase() || "CANDIDATE NAME"}</Text>
                    </View>

                    <Text style={s.description}>
                        Who has successfully demonstrated exceptional proficiency in all requirements of the FlowChat Virtual Assistant Training Program. This certification recognizes mastery of lead targeting, technical pipeline management, and advanced account safety protocols essential for client success.
                    </Text>

                    <View style={s.footer}>
                        <View style={s.signatureBox}>
                            <Text style={s.trainerName}>{trainerName || "Program Director"}</Text>
                            <View style={s.signatureLine} />
                            <Text style={s.signatureLabel}>Authorized Signature</Text>
                        </View>

                        <View style={s.dateBox}>
                            <View style={s.dateValueContainer}>
                                <Text style={s.dateValue}>{formattedDate}</Text>
                            </View>
                            <Text style={s.signatureLabel}>Date of Certification</Text>
                        </View>
                    </View>

                </View>
            </Page>
        </Document>
    );
}
