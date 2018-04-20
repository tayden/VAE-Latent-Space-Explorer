export function rounder(number, numDecimals) {
  const b = Math.pow(10, numDecimals);
  return Math.round(number * b) / b;
}
