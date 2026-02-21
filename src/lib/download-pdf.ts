import { pdf } from "@react-pdf/renderer";
import type { DocumentProps } from "@react-pdf/renderer";
import type { ReactElement } from "react";

/**
 * Renders a @react-pdf/renderer Document element to a Blob and
 * triggers a browser file download.
 */
export async function downloadPdf(
  document: ReactElement<DocumentProps>,
  filename: string,
): Promise<void> {
  const blob = await pdf(document).toBlob();
  const url = URL.createObjectURL(blob);
  const anchor = window.document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}
