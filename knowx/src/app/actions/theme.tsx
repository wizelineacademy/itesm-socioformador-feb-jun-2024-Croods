import { useTheme } from "next-themes";

export default function CheckTheme() {
  const { resolvedTheme } = useTheme();
  return resolvedTheme;
}