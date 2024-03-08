type FontWeight =
  | "extralight"
  | "extralightItalic"
  | "light"
  | "lightItalic"
  | "regular"
  | "regularItalic"
  | "semibold"
  | "semiboldItalic"
  | "bold"
  | "boldItalic"
  | "extrabold"
  | "black"
  | "blackItalic";

function mapFontWeightToFontFamily(weight: FontWeight, fontPrefix = "Roboto_") {
  switch (weight) {
    case "extralight":
      return `${fontPrefix}100Thin`;
    case "extralightItalic":
      return `${fontPrefix}100Thin_Italic`;
    case "light":
      return `${fontPrefix}300Light`;
    case "lightItalic":
      return `${fontPrefix}300Light_Italic`;
    case "regular":
      return `${fontPrefix}400Regular`;
    case "regularItalic":
      return `${fontPrefix}400Regular_Italic`;
    case "semibold":
      return `${fontPrefix}500Medium`;
    case "semiboldItalic":
      return `${fontPrefix}500Medium_Italic`;
    case "bold":
      return `${fontPrefix}700Bold`;
    case "boldItalic":
      return `${fontPrefix}700Bold_Italic`;
    case "extrabold":
      return `${fontPrefix}800Extrabold`; // Corrected the font weight value
    case "black":
      return `${fontPrefix}900Black`;
    case "blackItalic":
      return `${fontPrefix}900Black_Italic`;
    default:
      return `${fontPrefix}`;
  }
}

// Add a type for FontFamily
type FontFamily = ReturnType<typeof mapFontWeightToFontFamily>;

export { mapFontWeightToFontFamily, FontFamily };
