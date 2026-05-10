type FormatCurrencyOptions = {
  locale?: string;
  currency?: string;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

type FormatDateOptions = Intl.DateTimeFormatOptions & {
  locale?: string;
};

export function formatCurrency(value: number | string, options: FormatCurrencyOptions = {}) {
  const {
    locale = "en-US",
    currency = "USD",
    minimumFractionDigits = 2,
    maximumFractionDigits = 2,
  } = options;

  const amount = typeof value === "number" ? value : Number(value);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(Number.isFinite(amount) ? amount : 0);
}

export function formatDate(value: Date | string | number, options: FormatDateOptions = {}) {
  const { locale = "en-US", ...dateOptions } = options;
  const date = value instanceof Date ? value : new Date(value);

  return new Intl.DateTimeFormat(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    ...dateOptions,
  }).format(date);
}

export function formatNumber(value: number, locale = "en-US") {
  return new Intl.NumberFormat(locale).format(value);
}
