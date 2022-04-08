import moment from 'moment';

function ddate(a: any, b: any): 1 | -1 | 0 {
  if (moment(a.date).isBefore(b.date)) return -1;
  if (moment(b.date).isBefore(a.date)) return 1;
  return 0;
}

function adate(a: any, b: any): 1 | -1 | 0 {
  if (moment(a.date).isAfter(b.date)) return -1;
  if (moment(b.date).isAfter(a.date)) return 1;
  return 0;
}

function aamount(a: any, b: any) {
  const intA = parseInt(a.amount);
  const intB = parseInt(b.amount);
  if (intA > intB) return -1;
  if (intA < intB) return 1;
  return 0;
}

function damount(a: any, b: any) {
  const intA = parseInt(a.amount);
  const intB = parseInt(b.amount);
  if (intA > intB) return 1;
  if (intA < intB) return -1;
  return 0;
}

function aname(a: any, b: any) {
  if (a.name > b.name) return 1;
  if (a.name < b.name) return -1;
  return 0;
}

function dname(a: any, b: any) {
  if (a.name > b.name) return -1;
  if (a.name < b.name) return 1;
  return 0;
}

export const compare = {
  adate,
  ddate,
  aamount,
  damount,
  aname,
  dname,
};
