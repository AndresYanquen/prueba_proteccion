export function isValidTimeFormat(time) {
  const [hours, minutes, seconds] = time.split(':');
  const isValidNumber = (value, min, max) => {
    const num = parseInt(value, 10);
    return !isNaN(num) && num >= min && num <= max;
  };

  return (
    time.length === 8 &&
    isValidNumber(hours, 0, 23) &&
    isValidNumber(minutes, 0, 59) &&
    isValidNumber(seconds, 0, 59)
  );
}