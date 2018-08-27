
/* Create URL Default APIs */
const URL_DEFAULT_API = 'localhost:1080';


const PROTOCOL_HTTPS = false;
// const PORT_DEFAULT_API = PROTOCOL_HTTPS ? '8243' : '8280';
const HTTP_API = PROTOCOL_HTTPS ? 'https://' : 'http://';
const URL_API = HTTP_API + URL_DEFAULT_API;
/*Services Endpoint control names */

const USER = '/user';
const CREDIARIO = '/crediario';
const PERSON = '/person';
const SALE = '/sale';
export const environment = {
  production: false,
  envName: 'dev',
  version: '0.0.1',

  USER: URL_API + USER,
  CREDIARIO: URL_API + CREDIARIO,
  PERSON: URL_API + PERSON,
  SALE: URL_API + SALE
};
