export default function putComma(amount: string) {
  const newStringArr = amount.split("");
  if (newStringArr.length > 3) {
    newStringArr.splice(newStringArr.length - 3, 0, ",");
    if (newStringArr.length > 7) {
      newStringArr.splice(1, 0, ",");
    } else {
      newStringArr.splice(1, 0, "");
    }
  }

  return newStringArr.join("");
}
