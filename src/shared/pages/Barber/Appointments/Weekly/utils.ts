import moment from 'moment'

export const getWeekDays = () => {
  const dateNow = moment()

  const formatoData = new Intl.DateTimeFormat('pt-BR', { weekday: 'long' })

  const weeklyDays = []

  for (let i = 0; i < 7; i++) {
    const day = dateNow.clone().day(i)
    const nameDay = formatoData.format(day.toDate())
    const date = day.format('YYYY-MM-DD')
    weeklyDays.push({ name: nameDay, date: date })
  }

  return weeklyDays
}
