// Russian plural forms: one (1, 21, 101), few (2–4, 22–24), many (0, 5–20, 25…).
// Example: pluralRu(5, ['голос', 'голоса', 'голосов']) → 'голосов'.
export const pluralRu = (count: number, [one, few, many]: [string, string, string]) => {
  const mod10 = count % 10
  const mod100 = count % 100

  if (mod10 === 1 && mod100 !== 11) return one
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few

  return many
}
