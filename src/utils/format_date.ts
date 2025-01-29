interface FormatDateParameters {
  date: Date
  twenty_four_hour_time?: boolean
}

export function format_date({
  date,
  twenty_four_hour_time = false,
}: FormatDateParameters): string {
  let date_string: string = ''

  const hours: number = date.getHours()
  let minutes: string = `${date.getMinutes()}`

  if (minutes.length === 1) {
    minutes = `0${minutes}`
  }

  if (twenty_four_hour_time) {
    date_string += `${hours}:${minutes}`
  } else {
    const is_pm: boolean = hours > 11

    date_string += hours % 13
    date_string += `:${minutes} `
    date_string += is_pm ? 'PM' : 'AM'
  }

  let month: string = `${date.getMonth() + 1}`
  if (month.length === 1) {
    month = `0${month}`
  }
  date_string += ` ${month}/${date.getDate()}/${date.getFullYear()}`

  return date_string
}
