import moment from 'moment';
import {transactionTypes} from '../types';

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
  return moment(date).format('MMM Do YYYY, h:mm A');
}

export function isObjectAny(obj: {[index: string]: any}): boolean {
  if (obj === null || obj === undefined) return false;
  if (Object.keys(obj).length === 0) return false;
  return true;
}

export function hasValueObject(
  value: any,
  obj: {[index: string]: any},
): boolean {
  if (obj === null || obj === undefined) return false;
  if (Object.keys(obj).length === 0) return false;
  return Object.values(obj).indexOf(value) > -1;
}

export function isObjectEmpty(obj: {[index: string]: any}): boolean {
  if (obj === null || obj === undefined) return true;
  if (Object.keys(obj).length === 0) return true;
  return false;
}

export function isArrayAny(arr: unknown[]) {
  return Array.isArray(arr) && arr.length > 0;
}

export function isArrayEmpty(arr: unknown[]) {
  return Array.isArray(arr) && arr.length === 0;
}

export function arrayToMap(arr: unknown[], key: string, defaultValue: any) {
  const obj: {[index: string]: any} = {};
  arr.forEach((item: any) => (obj[item[key]] = defaultValue));
  return obj;
}

export function keyFilter(obj: {[index: string]: any}, value: any) {
  if (!obj) return [];
  return Object.keys(obj).filter((key: string) => obj[key] === value);
}

export function findMinMax(
  array: any[],
  key?: string,
): {min: string; max: string} {
  let data = array;

  if (key) {
    data = array.map((item: any) => parseInt(item[key]));
  }

  let min = data[0] || 0;
  let max = 0;

  data.forEach((value: number) => {
    if (value >= max) max = value;
    if (value <= min) min = value;
  });

  return {min: min.toString(), max: max.toString()};
}

export function isEmpty(data: any) {
  if (Array.isArray(data) && data.length === 0) return true;
  if (data.constructor === Object && Object.keys(data).length === 0)
    return true;
  return false;
}

// comparisons
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
