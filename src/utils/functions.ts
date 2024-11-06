export const getDate = (date: string) => {
  const messageDate = new Date(date);

  const now = new Date();
  const nowDay = now.getDate();

  let year = messageDate.getFullYear();
  let yearNow = now.getFullYear();

  let monthNow = now.getMonth();
  let messageMonthNumber = messageDate.getMonth();
  let month = messageDate.toLocaleString('default', { month: 'short' });
  let monthMod = month[0].toUpperCase() + month.slice(1, month.length - 1)

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

  if (nowDay - messageDay < 7 && messageMonthNumber === monthNow && year === yearNow && nowDay - messageDay !== 0) {
    return `${weekDayMod}`;
  }

  else if (nowDay - messageDay === 0 && messageMonthNumber === monthNow && year === yearNow) {
    return `${hour}:${min}`
  } else {
    return `${messageDay} ${monthMod} ${year}`;
  }
}

