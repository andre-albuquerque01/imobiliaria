export function formatPhoneNumber(numero: string): string {
  const str = numero.toString()

  const ddd = str.slice(0, 2)
  const parteMeio = str.slice(2, 7)
  const parteFinal = str.slice(7)

  return `${ddd} ${parteMeio}-${parteFinal}`
}
