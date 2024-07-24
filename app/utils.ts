interface IGenerateHelthReserveURL {
  date: string;
  time: string;
  managerCode: string;
  userId: string;
}
const generateHelthReserveURL = ({ date, time, managerCode, userId }: IGenerateHelthReserveURL) =>
  `https://talk.tmaxsoft.com/front/health/insertHealth.do?helMngerCd=${managerCode}&useDate=${date}&useStTime=${time}00&useEdTime=${time}50&userDiv=0001&reqEmpNo=${userId}`;
export { generateHelthReserveURL };
