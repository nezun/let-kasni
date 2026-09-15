export function allowsOptionalTracking(pathname: string | null | undefined) {
  return pathname !== "/admin" && !pathname?.startsWith("/admin/");
}
