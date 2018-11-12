/*
 * @Author: qiuz
 * @Date: 2018-08-14 13:42:49
 * */

export const MPDate = (time: string | Date) => {
  if (typeof time === 'string' && isNaN(Date.parse(time))) {
    // '2000-01-01 00:00:00' => '2000/01/01 00:00:00'
    time = time.replace(/-/g, '/');
  }
  return new Date(time);
};

const zore = (number: number): string => {
  return number < 10 ? ('0' + number) : number + '';
};

export const dateFormat = (date: Date) => {
  const
    Y = date.getFullYear() + '-',
    M = zore(date.getMonth() + 1) + '-',
    D = zore(date.getDate()) + ' ',
    h = zore(date.getHours()) + ':',
    m = zore(date.getMinutes()) + ':',
    s = zore(date.getSeconds());

  return Y + M + D + h + m + s;
};
