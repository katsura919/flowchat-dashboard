import * as XLSX from "xlsx";

/**
 * Common utility to trigger a browser file download for a Blob.
 */
export function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const anchor = window.document.createElement("a");
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
}

/**
 * Generates an Excel file from an array of objects and triggers download.
 */
export function downloadExcel(data: any[], filename: string, sheetName: string = "Sheet1") {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });

    downloadBlob(blob, filename);
}

/**
 * Specifically formats Audit data for Excel export.
 */
export function exportAuditToExcel(data: any) {
    const row = {
        "VA Name": data.vaName,
        "Week Ending": data.weekEnding,
        "Selected Stage": data.selectedStage,
        "New Leads Imported": data.imports,
        "Daily Connection Requests": data.requests,
        "Acceptance Rate": data.acceptanceRate,
        "Reply Rate": data.replyRate,
        "Initial Messages Sent": data.messagesHit,
        "Manual Replies": data.manualReplies,
        "Booking Links Sent": data.bookingLinks,
        "Calls Booked": data.callsBooked,
        "No-Show Rate": data.noShowRate,
        ...Object.fromEntries(
            Object.entries(data.quality).map(([id, val]) => [
                `Quality Control: ${id}`,
                val ? "Confirmed" : "Pending"
            ])
        ),
        "Bottleneck": data.bottleneck,
        "Required Adjustment": data.adjustment,
        "Goal for Next Week": data.nextWeekGoal,
        "Next Focus": data.nextFocus,
    };

    downloadExcel([row], "weekly-growth-audit.xlsx", "Audit");
}

/**
 * Specifically formats Report data for Excel export.
 */
export function exportReportToExcel(data: any) {
    const row = {
        "VA Name": data.vaName,
        "Date": data.date,
        "New Leads Imported": data.imported,
        "Friend Requests Sent": data.requestsSent,
        "New Conversations Started": data.conversationsStarted,
        "Nurture Responses Sent": data.nurtureReplies,
        "Calls Booked": data.callsBooked,
        "New Replies (Stage 07)": data.newReplies,
        "Pending Bookings": data.pendingBookings,
        "Qualified Leads Added": data.qualifiedAdded,
        "Status": data.healthStatus,
        "Warnings": data.warnings,
        "Action Taken": data.actionTaken,
        "Top Performing Group": data.topGroup,
        "Most Common Objection": data.commonObjection,
        "Winning Hook / Message": data.winningHook,
        "Recommendations": data.recommendations,
        "Blockers": data.blockers,
    };

    downloadExcel([row], "daily-operations-report.xlsx", "Report");
}
