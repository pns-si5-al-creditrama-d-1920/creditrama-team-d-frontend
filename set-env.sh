#!/bin/sh
> ./src/environments/environment.ts
echo "
export const environment = {
  production: false,
  AUTHORIZATION_SERVICE_URL: '${AUTHORIZATION_SERVICE_URL}',
  CLIENT_SERVICE_URL: '${CLIENT_SERVICE_URL}',
  TRANSACTION_SERVICE_URL: '${TRANSACTION_SERVICE_URL}',
  NOTIFICATION_SERVICE_URL: '${NOTIFICATION_SERVICE_URL}',
  BANKACCOUNT_SERVICE_URL: '${BANKACCOUNT_SERVICE_URL}',
  BASIC_USER: 'mobile',
  BASIC_PASS: 'pin',
};
" >> ./src/environments/environment.ts
