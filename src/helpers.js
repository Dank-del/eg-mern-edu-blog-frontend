export const parseText = function (text, limit) {
  if (text.length > limit) {
    for (let i = limit; i > 0; i--) {
      if (
        text.charAt(i) === ' ' &&
        (text.charAt(i - 1) != ',' ||
          text.charAt(i - 1) != '.' ||
          text.charAt(i - 1) != ';')
      ) {
        return text.substring(0, i) + '...';
      }
    }
    return text.substring(0, limit) + '...';
  } else return text;
};
