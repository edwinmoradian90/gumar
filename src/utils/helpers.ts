import moment from 'moment';

export function highlightColor(col: string, amt: number) {
  let usePound = false;

  if (col[0] == '#') {
    col = col.slice(1);
    usePound = true;
  }

  let num = parseInt(col, 16);
  let r = (num >> 16) + amt;

  if (r > 255) r = 255;
  else if (r < 0) r = 0;

  let b = ((num >> 8) & 0x00ff) + amt;

  if (b > 255) b = 255;
  else if (b < 0) b = 0;

  let g = (num & 0x0000ff) + amt;

  if (g > 255) g = 255;
  else if (g < 0) g = 0;

  return (usePound ? '#' : '') + (g | (b << 8) | (r << 16)).toString(16);
}

export function capitalize(string: string) {
  const letter = String.fromCharCode(string.charCodeAt(0));
  return string.replace(letter, letter.toUpperCase());
}

export function humanReadableDate(date: Date) {
  return moment(date).format('MMM Do YYYY, h:mm');
}

export function splitDate(date: Date) {
  const hrDate = moment(date, 'DD/MM/YYYY');
  const year = hrDate.format('Y');
  const month = hrDate.format('MMMM');
  const week = hrDate.format('W');
  const day = hrDate.format('D');
  const time = hrDate.format('h:m');

  return {
    year,
    month,
    week,
    day,
    time,
  };
}

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
