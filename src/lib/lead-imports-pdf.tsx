import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const C = {
    primary: "#4f46e5",
    white: "#ffffff",
    black: "#111111",
    muted: "#6b7280",
    border: "#e5e7eb",
    sectionBg: "#f3f4f6",
    success: "#059669",
    danger: "#dc2626",
};

const s = StyleSheet.create({
    page: {
        paddingTop: 36,
        paddingBottom: 56,
        paddingHorizontal: 36,
        backgroundColor: C.white,
        fontFamily: "Helvetica",
        fontSize: 10,
        color: C.black,
    },
    docTitle: {
        fontSize: 18,
        fontFamily: "Helvetica-Bold",
        color: C.primary,
        marginBottom: 2,
    },
    docSubtitle: {
        fontSize: 9,
        color: C.muted,
        marginBottom: 24,
    },
    section: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: C.border,
        borderRadius: 4,
        overflow: "hidden",
    },
    sectionHeader: {
        backgroundColor: C.sectionBg,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: C.border,
    },
    sectionTitle: {
        fontSize: 10,
        fontFamily: "Helvetica-Bold",
        color: C.black,
    },
    row: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: C.border,
        paddingHorizontal: 12,
        paddingVertical: 8,
        alignItems: "center",
    },
    label: {
        flex: 1,
        fontSize: 9,
        color: C.black,
    },
    value: {
        fontSize: 9,
        fontFamily: "Helvetica-Bold",
        color: C.primary,
    },
    statusBadge: {
        paddingHorizontal: 6,
        paddingVertical: 2,
        borderRadius: 4,
        fontSize: 8,
        fontFamily: "Helvetica-Bold",
        color: C.white,
    },
    pageNumber: {
        position: "absolute",
        fontSize: 8,
        bottom: 24,
        left: 0,
        right: 0,
        textAlign: "center",
        color: C.muted,
    },
});

interface Group {
    id: string;
    name: string;
    joined: boolean;
}

interface LeadImportsData {
    name: string;
    status: string;
    groups: Group[];
}

export function LeadImportsPdf({ name, status, groups }: LeadImportsData) {
    return (
        <Document title="Lead Imports Data">
            <Page size="A4" style={s.page}>
                <Text style={s.docTitle}>Lead Imports</Text>
                <Text style={s.docSubtitle}>Generated lead data report</Text>

                <View style={s.section}>
                    <View style={s.sectionHeader}>
                        <Text style={s.sectionTitle}>General Information</Text>
                    </View>
                    <View style={s.row}>
                        <Text style={s.label}>Full Name</Text>
                        <Text style={s.value}>{name || "—"}</Text>
                    </View>
                    <View style={s.row}>
                        <Text style={s.label}>Overall Status</Text>
                        <Text style={[
                            s.statusBadge,
                            { backgroundColor: status === "Joined" ? C.success : C.danger }
                        ]}>
                            {status}
                        </Text>
                    </View>
                </View>

                <View style={s.section}>
                    <View style={s.sectionHeader}>
                        <Text style={s.sectionTitle}>Groups Status</Text>
                    </View>
                    {groups.map((group) => (
                        <View key={group.id} style={s.row}>
                            <Text style={s.label}>{group.name}</Text>
                            <Text style={[
                                s.statusBadge,
                                { backgroundColor: group.joined ? C.success : C.danger }
                            ]}>
                                {group.joined ? "Joined" : "Not Joined"}
                            </Text>
                        </View>
                    ))}
                </View>

                <Text
                    style={s.pageNumber}
                    render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
                    fixed
                />
            </Page>
        </Document>
    );
}
