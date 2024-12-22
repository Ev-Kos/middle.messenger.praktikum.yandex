const MonthNameArr = [
    'Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня',
    'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря',
  ]

export const getDate = (date: string, isChatCard: boolean, isOnlyTime: boolean) => {
  const messageDate = new Date(date);

  const now = new Date();
  const nowDay = now.getDate();

  let year = messageDate.getFullYear();
  let yearNow = now.getFullYear();

  let monthNow = now.getMonth();
  let messageMonthNumber = messageDate.getMonth();
  let month = messageDate.toLocaleString('default', { month: 'short' });
  let monthNum = messageDate.getMonth();
  let monthMod = month[0].toUpperCase() + month.slice(1, month.length - 1)
  let monthModFull = MonthNameArr.find((item, index) => index === monthNum)
  let weekDay = messageDate.toLocaleString('default', { weekday: 'short' });
  let weekDayMod = weekDay[0].toUpperCase() + weekDay.slice(1)

  let messageDay = messageDate.getUTCDate();

  let hour = messageDate.getHours();
  let min = messageDate.getMinutes();

  if (min < 10) {
    min = Number('0' + min)
  };
  if (messageDay < 10) {
    messageDay = Number('0' + messageDay)
  };

  if(isChatCard && !isOnlyTime) {
    if (nowDay - messageDay < 7 && messageMonthNumber === monthNow && year === yearNow && nowDay - messageDay !== 0) {
      return `${weekDayMod}`;
    }
    else if (nowDay - messageDay === 0 && messageMonthNumber === monthNow && year === yearNow) {
      return `${hour}:${min}`
    } else {
      return `${messageDay} ${monthMod} ${year}`;
    }
  }

  if(!isChatCard && !isOnlyTime) {
    if(yearNow === year) {
      return `${messageDay} ${monthModFull}`;
    }
    return `${messageDay} ${monthModFull} ${year}`;
  }

  if(!isChatCard && isOnlyTime) {
    return `${hour}:${min}`
  }
}
