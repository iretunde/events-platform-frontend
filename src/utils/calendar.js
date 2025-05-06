// utils/calendar.js

// Format: 20250501T180000Z
const formatDateTime = (dateStr, timeStr) => {
  if (!dateStr || !timeStr) {
    throw new Error('Missing date or time');
  }

  // Convert full ISO string to just date (YYYY-MM-DD)
  const pureDate = new Date(dateStr).toISOString().split('T')[0];
  const dateTimeString = `${pureDate}T${timeStr}`;

  const parsed = new Date(dateTimeString);
  if (isNaN(parsed)) {
    throw new Error(`Invalid datetime: ${dateTimeString}`);
  }

  return parsed.toISOString().replace(/[-:]|\.\d{3}/g, '');
};

export const generateGoogleCalendarLink = (event) => {
  const { name, date, start_time, end_time, about } = event;

  const start = formatDateTime(date, start_time);
  const end = formatDateTime(date, end_time);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: name,
    details: about || '',
    dates: `${start}/${end}`,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};
