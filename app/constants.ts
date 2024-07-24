import { generateHelthReserveURL } from './utils';
const COOKIE =
  'JSESSIONID=42Oi6LcVAwKixEcL2zNKblEbEmjJoXNaJ6DDaFfKj6DPcvc6zXXY9iR3tYiAGShb.dGFsa19kb21haW4vdGFsay0wMQ==';
const COOKIE_SEO =
  'JSESSIONID=NEGEx0TiGa0i5FzIlwllsHe1jwQ8ZHgXJNaskNkuODv14P6UzEWHUcenIdPJ8GdP.dGFsa19kb21haW4vdGFsay0wMQ==';

const REQUEST_LIST_DATA = [
  { date: '20240805', time: '12', managerCode: 'HEL20240423001', userId: '2023602' },
  { date: '20240812', time: '12', managerCode: 'HEL20240423001', userId: '2023602' },
  { date: '20240819', time: '12', managerCode: 'HEL20240423001', userId: '2023602' },
  { date: '20240826', time: '12', managerCode: 'HEL20240423001', userId: '2023602' },
  { date: '20240816', time: '12', managerCode: 'HEL20240423001', userId: '2023602' },
  { date: '20240830', time: '12', managerCode: 'HEL20240423001', userId: '2023602' },
];
const REQUEST_LIST_DATA_SEO = [
  { date: '20240809', time: '13', managerCode: 'HEL20240423001', userId: '2023530' },
  { date: '20240816', time: '15', managerCode: 'HEL20240423001', userId: '2023530' },
  { date: '20240823', time: '16', managerCode: 'HEL20240423001', userId: '2023530' },
  { date: '20240830', time: '15', managerCode: 'HEL20240423001', userId: '2023530' },
];
const REQUEST_URL_LIST = REQUEST_LIST_DATA.map((data) => generateHelthReserveURL(data));
export { REQUEST_URL_LIST, REQUEST_LIST_DATA, COOKIE, COOKIE_SEO, REQUEST_LIST_DATA_SEO };
