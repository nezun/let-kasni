export function allowsOptionalTracking(pathname: string | null | undefined) {
  return (
    typeof pathname === "string" &&
    pathname.length > 0 &&
    pathname !== "/admin" &&
    !pathname.startsWith("/admin/")
  );
}
