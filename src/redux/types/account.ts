export interface AccountInitialState {
  id: string;
  givenName: string;
  email: string;
  idToken: string;
  accessToken: string;
  photo: string;
  error: Error | null;
  isLoggedIn: boolean;
  status: string;
}
