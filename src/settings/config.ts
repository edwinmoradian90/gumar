const webClientId =
  '1099353146056-ga3fhnb3pn4rsu5dgvg3ojs5eichucm2.apps.googleusercontent.com';

export default {
  googleSigninConfig: {
    webClientId,
    offlineAccess: false,
    scopes: [
      'https://www.googleapis.com/auth/drive',
      'https://www.googleapis.com/auth/spreadsheets',
    ],
  },
  google: {
    webClientId,
  },
  sheets: {
    url: 'https://sheets.googleapis.com/v4/spreadsheets',
  },
};
