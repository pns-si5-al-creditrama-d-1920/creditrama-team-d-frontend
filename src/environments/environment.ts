// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  AUTHORIZATION_SERVICE_URL: 'http://localhost:9191/',
  CLIENT_SERVICE_URL: 'http://localhost:8080/',
  TRANSACTION_SERVICE_URL: 'http://localhost:8084/',
  NOTIFICATION_SERVICE_URL: 'http://localhost:8081/',
  BANKACCOUNT_SERVICE_URL: 'http://localhost:8083/',
  BASIC_USER: 'mobile',
  BASIC_PASS: 'pin',
};
