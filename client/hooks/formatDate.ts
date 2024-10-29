export const getNth = (n: number) => {
  if (n > 3 && n < 21) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
};

export const formatDate = (date: Date) => {
  let day = getNth(date.getDate());
  let formatString = `${day} ${date.toLocaleString('default', {
    month: 'short',
    year: 'numeric',
  })}`;
  return formatString;
};
