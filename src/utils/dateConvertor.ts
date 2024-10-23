export function formatDateTimeParts(
  date: string,
  locale: string
): { date: Record<string, string>; time: Record<string, string>; weekday: string } {
  const isoDate = date ? new Date(date).toISOString() : new Date().toISOString();
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  if (locale === 'ar-SA') {
    // Set the Islamic calendar (Hijri) for Arabic locale
    options.calendar = 'islamic-umalqura';
  }

  const formatter = new Intl.DateTimeFormat(locale, options);
  const parts = formatter.formatToParts(new Date(isoDate));

  const dateParts: Record<string, string> = {};
  const timeParts: Record<string, string> = {};
  let weekday = '';

  parts.forEach((part) => {
    const { type, value } = part;

    switch (type) {
      case 'year':
        dateParts.year = value;
        break;
      case 'month':
        dateParts.month = value;
        break;
      case 'day':
        dateParts.day = value;
        break;
      case 'weekday':
        weekday = value;
        break;
      case 'hour':
        timeParts.hour = value;
        break;
      case 'minute':
        timeParts.minute = value;
        break;
      case 'dayPeriod':
        timeParts.period = value;
        break;
    }
  });

  return { date: dateParts, time: timeParts, weekday };
}
/**
 * @example
 * const { date, time } = formatDateTimeParts('2021-01-01T00:00:00.000Z', 'en-US');
 * console.log(date); // { year: '2021', month: 'January', day: '1' }
 * console.log(time); // { hour: '12', minute: '00', period: 'AM' }
 */
