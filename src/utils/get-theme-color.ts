import { Colors } from "@/types/theme";

export function getThemeColor(
  colors: Colors,
  colorName: keyof Colors | (string & {})
) {
  return colorName in colors ? colors[colorName as keyof Colors] : colorName;
}
