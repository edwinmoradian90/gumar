export interface Selected {
  name: string;
  id: string;
}

export interface State {
  selected: {[index: string]: string} | null;
  currencySymbol: string;
  currencyFullName: string;
  currencyId: string;
  isUsingPassword: boolean;
  password: string;
}
