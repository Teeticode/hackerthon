export default function capitalizeString(
  inputString: string | undefined,
  specifier: "all" | "first"
): string {
  if (inputString === undefined) {
    return "";
  }

  if (specifier === "all") {
    return inputString.toUpperCase();
  } else if (specifier === "first") {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  } else {
    return inputString;
  }
}
