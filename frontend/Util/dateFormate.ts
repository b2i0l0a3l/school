export function DateFormate(date: string) {
  const d = new Date(date);
  return d.toLocaleDateString("en-US");
}
