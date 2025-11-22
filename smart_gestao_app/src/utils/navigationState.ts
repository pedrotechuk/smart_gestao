export function saveLastRoute(name: string, params: any = {}) {
  if (typeof window !== "undefined") {
    localStorage.setItem("lastRoute", JSON.stringify({ name, params }));
  }
}

export function getLastRoute() {
  if (typeof window !== "undefined") {
    const data = localStorage.getItem("lastRoute");
    return data ? JSON.parse(data) : null;
  }
  return null;
}
