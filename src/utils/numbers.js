export const formatNumber = (n) =>
  Intl.NumberFormat("en-US").format(n);

export const shortenNumber = (n) =>
  n >= 1_000_000
    ? (n / 1_000_000).toFixed(1) + "M"
    : n >= 1_000
    ? (n / 1_000).toFixed(1) + "K"
    : n;