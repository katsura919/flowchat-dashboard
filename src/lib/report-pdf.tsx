import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const C = {
  primary: "#4f46e5",
  white: "#ffffff",
  black: "#111111",
  muted: "#6b7280",
  border: "#e5e7eb",
  sectionBg: "#f3f4f6",
  healthy: "#059669",
  warning: "#d97706",
  blocked: "#dc2626",
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
  // ── Header ────────────────────────────────────────────────────────────────
  docTitle: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: C.primary,
    marginBottom: 2,
  },
  docSubtitle: {
    fontSize: 9,
    color: C.muted,
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 20,
  },
  metaBox: {
    flex: 1,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    padding: 8,
  },
  metaLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  metaValue: {
    fontSize: 10,
    color: C.black,
    fontFamily: "Helvetica-Bold",
  },
  metaValueEmpty: {
    fontSize: 10,
    color: "#d1d5db",
    fontStyle: "italic",
  },
  // ── Section ───────────────────────────────────────────────────────────────
  section: {
    marginBottom: 14,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    overflow: "hidden",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: C.sectionBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    gap: 8,
  },
  badge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: C.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: C.white,
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.black,
  },
  // ── Metric rows ───────────────────────────────────────────────────────────
  metricRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  metricLabel: {
    flex: 1,
    fontSize: 9,
    color: C.black,
  },
  metricValue: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.primary,
    minWidth: 60,
    textAlign: "right",
  },
  metricEmpty: {
    fontSize: 9,
    color: "#d1d5db",
    minWidth: 60,
    textAlign: "right",
  },
  // ── Text fields ───────────────────────────────────────────────────────────
  fieldContainer: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  fieldLabel: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 3,
  },
  fieldValue: {
    fontSize: 10,
    color: C.black,
    lineHeight: 1.5,
  },
  fieldEmpty: {
    fontSize: 10,
    color: "#d1d5db",
    fontStyle: "italic",
  },
  // ── Health status pill ────────────────────────────────────────────────────
  healthPill: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
    alignSelf: "flex-start",
    marginTop: 4,
  },
  healthText: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
  },
  // ── Two-column insights grid ──────────────────────────────────────────────
  insightsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 12,
    gap: 10,
  },
  insightCell: {
    width: "47%",
  },
  insightCellFull: {
    width: "100%",
    marginTop: 4,
  },
  // ── Page number footer ────────────────────────────────────────────────────
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

interface ReportData {
  vaName: string;
  date: string;
  imported: string;
  requestsSent: string;
  conversationsStarted: string;
  nurtureReplies: string;
  callsBooked: string;
  newReplies: string;
  pendingBookings: string;
  qualifiedAdded: string;
  healthStatus: "healthy" | "warning" | "blocked";
  warnings: string;
  actionTaken: string;
  topGroup: string;
  commonObjection: string;
  winningHook: string;
  recommendations: string;
  blockers: string;
}

const val = (v: string, fallback = "—") => (v.trim() ? v.trim() : fallback);
const emptyStyle = (v: string) => (v.trim() ? s.fieldValue : s.fieldEmpty);
const emptyMetric = (v: string) => (v.trim() ? s.metricValue : s.metricEmpty);

const healthConfig = {
  healthy: { label: "Healthy", bg: "#d1fae5", color: C.healthy },
  warning: { label: "Warning", bg: "#fef3c7", color: C.warning },
  blocked: { label: "Blocked", bg: "#fee2e2", color: C.blocked },
};

export function ReportPdf(data: ReportData) {
  const h = healthConfig[data.healthStatus];
  const formattedDate = data.date
    ? new Date(data.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";

  return (
    <Document
      title="Daily Operations Report"
      author={data.vaName || "FlowChat VA"}
    >
      <Page size="A4" style={s.page}>
        {/* Doc title */}
        <Text style={s.docTitle}>Daily Operations Report</Text>
        <Text style={s.docSubtitle}>
          FlowChat SOP · Complete and submit at the end of every working day
        </Text>

        {/* VA Name + Date */}
        <View style={s.metaRow}>
          <View style={s.metaBox}>
            <Text style={s.metaLabel}>VA Name</Text>
            <Text style={data.vaName ? s.metaValue : s.metaValueEmpty}>
              {val(data.vaName, "Not provided")}
            </Text>
          </View>
          <View style={s.metaBox}>
            <Text style={s.metaLabel}>Date</Text>
            <Text style={data.date ? s.metaValue : s.metaValueEmpty}>
              {formattedDate}
            </Text>
          </View>
        </View>

        {/* Section 1 — Daily Numbers */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <View style={s.badge}>
              <Text style={s.badgeText}>1</Text>
            </View>
            <Text style={s.sectionTitle}>Daily Numbers</Text>
          </View>
          {[
            { label: "New Leads Imported", value: data.imported },
            { label: "Friend Requests Sent", value: data.requestsSent },
            {
              label: "New Conversations Started",
              value: data.conversationsStarted,
            },
            { label: "Nurture Responses Sent", value: data.nurtureReplies },
            { label: "Calls Booked", value: data.callsBooked },
          ].map((row) => (
            <View key={row.label} style={s.metricRow}>
              <Text style={s.metricLabel}>{row.label}</Text>
              <Text style={emptyMetric(row.value)}>{val(row.value)}</Text>
            </View>
          ))}
        </View>

        {/* Section 2 — Pipeline Movement */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <View style={s.badge}>
              <Text style={s.badgeText}>2</Text>
            </View>
            <Text style={s.sectionTitle}>Pipeline Movement</Text>
          </View>
          {[
            { label: "New Replies (Stage 07)", value: data.newReplies },
            { label: "Pending Bookings", value: data.pendingBookings },
            {
              label: "Qualified Leads Added to Pipeline",
              value: data.qualifiedAdded,
            },
          ].map((row) => (
            <View key={row.label} style={s.metricRow}>
              <Text style={s.metricLabel}>{row.label}</Text>
              <Text style={emptyMetric(row.value)}>{val(row.value)}</Text>
            </View>
          ))}
        </View>

        {/* Section 3 — Account Health */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <View style={s.badge}>
              <Text style={s.badgeText}>3</Text>
            </View>
            <Text style={s.sectionTitle}>Account Health</Text>
          </View>
          <View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
            <Text style={s.metaLabel}>Status</Text>
            <View style={[s.healthPill, { backgroundColor: h.bg }]}>
              <Text style={[s.healthText, { color: h.color }]}>{h.label}</Text>
            </View>
            {data.healthStatus !== "healthy" && (
              <>
                <View style={{ marginTop: 10 }}>
                  <Text style={s.fieldLabel}>Warnings Received</Text>
                  <Text style={emptyStyle(data.warnings)}>
                    {val(data.warnings)}
                  </Text>
                </View>
                <View style={{ marginTop: 8 }}>
                  <Text style={s.fieldLabel}>Action Taken</Text>
                  <Text style={emptyStyle(data.actionTaken)}>
                    {val(data.actionTaken)}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Section 4 — Insights */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <View style={s.badge}>
              <Text style={s.badgeText}>4</Text>
            </View>
            <Text style={s.sectionTitle}>Insights</Text>
          </View>
          <View style={s.insightsGrid}>
            {[
              { label: "Top Performing Group", value: data.topGroup },
              { label: "Most Common Objection", value: data.commonObjection },
              { label: "Winning Hook / Message", value: data.winningHook },
            ].map((f) => (
              <View key={f.label} style={s.insightCell}>
                <Text style={s.fieldLabel}>{f.label}</Text>
                <Text style={emptyStyle(f.value)}>{val(f.value)}</Text>
              </View>
            ))}
            <View style={s.insightCellFull}>
              <Text style={s.fieldLabel}>Recommendations</Text>
              <Text style={emptyStyle(data.recommendations)}>
                {val(data.recommendations)}
              </Text>
            </View>
          </View>
        </View>

        {/* Section 5 — Blockers */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <View style={s.badge}>
              <Text style={s.badgeText}>5</Text>
            </View>
            <Text style={s.sectionTitle}>Blockers</Text>
          </View>
          <View style={{ paddingHorizontal: 12, paddingVertical: 10 }}>
            <Text style={emptyStyle(data.blockers)}>{val(data.blockers)}</Text>
          </View>
        </View>

        {/* Page number */}
        <Text
          style={s.pageNumber}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
}
