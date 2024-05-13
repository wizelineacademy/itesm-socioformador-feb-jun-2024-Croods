import { useTheme } from "next-themes";

export default function checkTheme() {
  const { resolvedTheme } = useTheme();
  return resolvedTheme;
}
