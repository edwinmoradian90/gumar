export interface Selected {
  name: string;
  id: string;
}

export interface InitialState {
  selected: {[index: string]: string} | null;
  currency: string | null;
  isUsingPassword: boolean;
  password: string;
}
