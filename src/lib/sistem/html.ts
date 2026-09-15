/** HTML verzija mejla iz teksta šablona — Gmail tako prikazuje prave liste, podebljano i linkove. */
const escHtml = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const redHtml = (s: string) =>
  escHtml(s)
    .replace(/\*([^*\n]+)\*/g, "<strong>$1</strong>")
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1">$1</a>');

/** Tekst šablona → HTML: numerisane stavke u <ol>, crtice u <ul>, *podebljano*, linkovi; ostalo pasusi. */
export function tekstUHtml(tekst: string) {
  const blokovi = tekst.replace(/\r/g, "").split(/\n{2,}/);
  const html = blokovi.map((b) => {
    const redovi = b.split("\n").filter((r) => r.trim());
    if (redovi.length && redovi.every((r) => /^\s*\d+\.\s+/.test(r))) return `<ol style="margin:0 0 14px;padding-left:22px">${redovi.map((r) => `<li style="margin:0 0 4px">${redHtml(r.replace(/^\s*\d+\.\s+/, ""))}</li>`).join("")}</ol>`;
    if (redovi.length && redovi.every((r) => /^\s*[-•]\s+/.test(r))) return `<ul style="margin:0 0 14px;padding-left:22px">${redovi.map((r) => `<li style="margin:0 0 4px">${redHtml(r.replace(/^\s*[-•]\s+/, ""))}</li>`).join("")}</ul>`;
    return `<p style="margin:0 0 14px">${redovi.map(redHtml).join("<br>")}</p>`;
  });
  return `<div style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;color:#1f2937">${html.join("")}</div>`;
}
