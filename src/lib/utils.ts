/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export function sanitizeCode(code: string): string {
  // Only remove characters that are invalid in Firestore document IDs
  // Keep letters, numbers, and hyphens — do NOT strip everything
  return code.replace(/[^a-zA-Z0-9\-_]/g, '');
}

export function escapeDisplay(text: string): string {
  if (!text) return '';
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}