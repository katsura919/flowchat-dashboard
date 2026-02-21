import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const C = {
  primary: "#4f46e5",
  white: "#ffffff",
  black: "#111111",
  muted: "#6b7280",
  border: "#e5e7eb",
  sectionBg: "#f3f4f6",
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
    marginBottom: 16,
  },
  metaRow: {
    flexDirection: "row",
    gap: 16,
    marginBottom: 16,
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
    fontFamily: "Helvetica-Bold",
    color: C.black,
  },
  metaEmpty: {
    fontSize: 10,
    color: "#d1d5db",
    fontStyle: "italic",
  },
  section: {
    marginBottom: 12,
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
  },
  sectionHeader: {
    backgroundColor: C.sectionBg,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    color: C.black,
  },
  sectionMeta: {
    fontSize: 8,
    color: C.muted,
  },
  // Metric rows (3-col: label / target / value)
  metricRow3: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  metricLabel3: { flex: 2, fontSize: 9, color: C.black },
  metricTarget: { flex: 1, fontSize: 8, color: C.muted },
  metricValue3: {
    flex: 1,
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.primary,
    textAlign: "right",
  },
  metricEmpty3: { flex: 1, fontSize: 9, color: "#d1d5db", textAlign: "right" },
  // Metric rows (2-col: label / value)
  metricRow2: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  metricLabel2: { flex: 1, fontSize: 9, color: C.black },
  metricValue2: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.primary,
    minWidth: 64,
    textAlign: "right",
  },
  metricEmpty2: {
    fontSize: 9,
    color: "#d1d5db",
    minWidth: 64,
    textAlign: "right",
  },
  // Stage selector
  stageGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },
  stagePill: {
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 9,
  },
  stagePillSelected: {
    borderColor: C.primary,
    backgroundColor: "#eef2ff",
    color: C.primary,
    fontFamily: "Helvetica-Bold",
  },
  stagePillUnsel: { borderColor: C.border, color: C.muted },
  // Check items
  checkRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
    gap: 8,
  },
  checkBox: {
    width: 12,
    height: 12,
    borderWidth: 1.5,
    borderRadius: 2,
    marginTop: 1,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  checkBoxChecked: { borderColor: C.primary, backgroundColor: C.primary },
  checkBoxUnchecked: { borderColor: "#9ca3af", backgroundColor: C.white },
  checkMark: { color: C.white, fontSize: 7, fontFamily: "Helvetica-Bold" },
  checkLabel: { fontSize: 9, fontFamily: "Helvetica-Bold", color: C.black },
  checkLabelDone: { fontSize: 9, color: C.muted },
  checkDesc: { fontSize: 8, color: C.muted, marginTop: 1 },
  // Long text fields
  textAreaBox: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  fieldLabel: {
    fontSize: 7,
    fontFamily: "Helvetica-Bold",
    color: C.muted,
    textTransform: "uppercase",
    letterSpacing: 0.7,
    marginBottom: 3,
  },
  fieldValue: { fontSize: 10, color: C.black, lineHeight: 1.5 },
  fieldEmpty: { fontSize: 10, color: "#d1d5db", fontStyle: "italic" },
  // Focus options (radio)
  focusGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },
  focusPillSelected: {
    borderWidth: 1,
    borderColor: C.primary,
    backgroundColor: "#eef2ff",
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 9,
    color: C.primary,
    fontFamily: "Helvetica-Bold",
  },
  focusPillUnsel: {
    borderWidth: 1,
    borderColor: C.border,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 9,
    color: C.muted,
  },
  callout: {
    backgroundColor: "#eff6ff",
    borderLeftWidth: 3,
    borderLeftColor: C.primary,
    padding: 10,
    marginTop: 4,
    borderRadius: 2,
  },
  calloutTitle: {
    fontSize: 9,
    fontFamily: "Helvetica-Bold",
    color: C.primary,
    marginBottom: 3,
  },
  calloutText: { fontSize: 9, color: "#1e40af", lineHeight: 1.5 },
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

const stages = [
  "Stage 1 — Build",
  "Stage 2 — Scale",
  "Stage 3 — Invite",
  "Stage 4 — Optimize",
];
const focusOptions = [
  "Improve targeting",
  "Improve opener message",
  "Improve call invite script",
  "Increase outreach volume",
  "Reduce volume for account safety",
];
const qualityItems = [
  {
    id: "audience",
    label: "Audience Integrity",
    desc: "Imported leads match the Ideal Client criteria defined in Stage 1.",
  },
  {
    id: "sequence",
    label: "Messaging Sequence",
    desc: "Sequence has been updated or rotated in the Builder this week.",
  },
  {
    id: "doubletap",
    label: "The Double-Tap",
    desc: "VA is capturing email/phone numbers immediately after sending every booking link.",
  },
  {
    id: "followups",
    label: "Follow-ups",
    desc: "Leads are receiving at least 5+ follow-up touches before archiving.",
  },
];

const v = (s: string, fallback = "—") => (s.trim() ? s.trim() : fallback);
const vs = (val: string) => (val.trim() ? s.fieldValue : s.fieldEmpty);

export interface AuditData {
  vaName: string;
  weekEnding: string;
  selectedStage: string;
  imports: string;
  requests: string;
  acceptanceRate: string;
  replyRate: string;
  messagesHit: string;
  manualReplies: string;
  bookingLinks: string;
  callsBooked: string;
  noShowRate: string;
  quality: Record<string, boolean>;
  bottleneck: string;
  adjustment: string;
  nextWeekGoal: string;
  nextFocus: string;
}

export function AuditPdf(data: AuditData) {
  const formattedDate = data.weekEnding
    ? new Date(data.weekEnding).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "—";
  const qualityCount = Object.values(data.quality).filter(Boolean).length;

  return (
    <Document title="Weekly Growth Audit" author={data.vaName || "FlowChat VA"}>
      <Page size="A4" style={s.page}>
        <Text style={s.docTitle}>Weekly Growth Audit</Text>
        <Text style={s.docSubtitle}>
          FlowChat SOP · Complete every Friday for a full picture of pipeline
          health
        </Text>

        {/* Meta */}
        <View style={s.metaRow}>
          <View style={s.metaBox}>
            <Text style={s.metaLabel}>VA Name</Text>
            <Text style={data.vaName ? s.metaValue : s.metaEmpty}>
              {v(data.vaName, "Not provided")}
            </Text>
          </View>
          <View style={s.metaBox}>
            <Text style={s.metaLabel}>Week Ending</Text>
            <Text style={data.weekEnding ? s.metaValue : s.metaEmpty}>
              {formattedDate}
            </Text>
          </View>
        </View>

        {/* Phase */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>
              Phase Identifier — Stage this week
            </Text>
          </View>
          <View style={s.stageGrid}>
            {stages.map((st) => (
              <Text
                key={st}
                style={
                  data.selectedStage === st
                    ? s.stagePillSelected
                    : s.stagePillUnsel
                }
              >
                {data.selectedStage === st ? "● " : "○ "}
                {st}
              </Text>
            ))}
          </View>
        </View>

        {/* Pipeline Health Inputs */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>
              Stage 1 & 2 — Pipeline Health (Inputs)
            </Text>
          </View>
          {[
            {
              label: "New Leads Imported",
              target: "100–500",
              value: data.imports,
            },
            {
              label: "Daily Connection Requests",
              target: "10–20+",
              value: data.requests,
            },
            {
              label: "Acceptance Rate",
              target: "≥ 30%",
              value: data.acceptanceRate,
            },
            { label: "Reply Rate", target: "≥ 10%", value: data.replyRate },
          ].map((row) => (
            <View key={row.label} style={s.metricRow3}>
              <Text style={s.metricLabel3}>{row.label}</Text>
              <Text style={s.metricTarget}>Target: {row.target}</Text>
              <Text style={row.value.trim() ? s.metricValue3 : s.metricEmpty3}>
                {v(row.value)}
              </Text>
            </View>
          ))}
        </View>

        {/* Conversion Health Outputs */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>
              Stage 3 & 4 — Conversion Health (Outputs)
            </Text>
          </View>
          {[
            {
              label: "Initial Messages Sent (10+ daily target?)",
              value: data.messagesHit,
            },
            {
              label: "Manual Replies (100% inbound handled?)",
              value: data.manualReplies,
            },
            { label: "Booking Links Sent", value: data.bookingLinks },
            { label: "Calls Booked (confirmed)", value: data.callsBooked },
            { label: "No-Show Rate", value: data.noShowRate },
          ].map((row) => (
            <View key={row.label} style={s.metricRow2}>
              <Text style={s.metricLabel2}>{row.label}</Text>
              <Text style={row.value.trim() ? s.metricValue2 : s.metricEmpty2}>
                {v(row.value)}
              </Text>
            </View>
          ))}
        </View>

        {/* Quality checklist */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <View style={s.sectionHeaderRow}>
              <Text style={s.sectionTitle}>Quality Control Checklist</Text>
              <Text style={s.sectionMeta}>
                {qualityCount} / {qualityItems.length} confirmed
              </Text>
            </View>
          </View>
          {qualityItems.map((item) => {
            const checked = !!data.quality[item.id];
            return (
              <View key={item.id} style={s.checkRow}>
                <View
                  style={[
                    s.checkBox,
                    checked ? s.checkBoxChecked : s.checkBoxUnchecked,
                  ]}
                >
                  {checked && <Text style={s.checkMark}>✓</Text>}
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={checked ? s.checkLabelDone : s.checkLabel}>
                    {item.label}
                  </Text>
                  <Text style={s.checkDesc}>{item.desc}</Text>
                </View>
              </View>
            );
          })}
        </View>

        {/* Bottleneck / Adjustment / Goal */}
        <View style={s.section}>
          {[
            { label: "Bottleneck Identified", value: data.bottleneck },
            { label: "Required Adjustment", value: data.adjustment },
            { label: "Goal for Next Week", value: data.nextWeekGoal },
          ].map((f) => (
            <View key={f.label} style={s.textAreaBox}>
              <Text style={s.fieldLabel}>{f.label}</Text>
              <Text style={vs(f.value)}>{v(f.value)}</Text>
            </View>
          ))}
        </View>

        {/* Next week focus */}
        <View style={s.section}>
          <View style={s.sectionHeader}>
            <Text style={s.sectionTitle}>Next Week Focus — Priority</Text>
          </View>
          <View style={s.focusGrid}>
            {focusOptions.map((opt) => (
              <Text
                key={opt}
                style={
                  data.nextFocus === opt
                    ? s.focusPillSelected
                    : s.focusPillUnsel
                }
              >
                {data.nextFocus === opt ? "● " : "○ "}
                {opt}
              </Text>
            ))}
          </View>
        </View>

        {/* Manager note */}
        <View style={s.callout}>
          <Text style={s.calloutTitle}>Manager Note</Text>
          <Text style={s.calloutText}>
            If the VA is consistently hitting Stage 2 numbers but Stage 3 calls
            are not materializing, the issue is almost always messaging tone or
            lead quality — not volume.
          </Text>
        </View>

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
