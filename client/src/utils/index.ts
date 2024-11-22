export * from './validation';

const padTo2Digits = (num: number) => num.toString().padStart(2, '0');

export const formatDateShort = (date: Date) => {
   const day = padTo2Digits(date.getDate());
   const month = padTo2Digits(date.getMonth() + 1);
   const year = date.getFullYear();

   return `${day}.${month}.${year}`;
};

export const formatDate = (date: Date) => {
   const hours = padTo2Digits(date.getHours());
   const minutes = padTo2Digits(date.getMinutes());
   const seconds = padTo2Digits(date.getSeconds());

   return `${formatDateShort(date)} ${hours}:${minutes}:${seconds}`;
};
