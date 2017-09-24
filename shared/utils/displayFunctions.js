const smartNumber = (num) => {
  if (num < 1000) {
    return num;
  } else if (num < 1000000) {
    return `${parseFloat(Math.round(num * 100) / 100).toFixed(2)}k`;
  }
  return `${parseFloat(Math.round(num * 100) / 100).toFixed(2)}m`;
};

export { smartNumber };
