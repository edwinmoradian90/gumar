export enum CurrencySymbol {
  'AMD' = '֏',
  'EUR' = '€',
  'GBP' = '£',
  'USD' = '$',
}

export enum CurrencyName {
  'AMD' = 'Armenian Dram',
  'EUR' = 'European Dollar',
  'GBP' = 'Great Britain Pound',
  'USD' = 'United States Dollar',
}

export interface Currency {
  id: string;
  name: string;
  fullName: string;
  symbol: string;
}
