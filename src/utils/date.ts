export function getLogDatetime() {
  const currentDatetime = new Date()
  return currentDatetime.toLocaleTimeString('pt-br')
}
