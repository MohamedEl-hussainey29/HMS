/** Resize Cloudinary delivery URLs so cards don't download full-resolution originals. */
export function optimizeImageUrl(url?: string | null, width = 800): string {
  if (!url) return "";

  try {
    const parsed = new URL(url);
    if (!parsed.hostname.includes("res.cloudinary.com")) return url;

    const marker = "/image/upload/";
    const index = parsed.pathname.indexOf(marker);
    if (index === -1) return url;

    const rest = parsed.pathname.slice(index + marker.length);
    const firstSegment = rest.split("/")[0] ?? "";
    if (!/^v\d+$/.test(firstSegment)) return url;

    const transform = `f_auto,q_auto,c_fill,g_auto,w_${width}`;
    parsed.pathname = `${parsed.pathname.slice(0, index + marker.length)}${transform}/${rest}`;
    parsed.protocol = "https:";
    return parsed.toString();
  } catch {
    return url;
  }
}
